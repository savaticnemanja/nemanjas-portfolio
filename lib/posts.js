import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import { escapeHtml } from '@lib/html'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import nginx from 'highlight.js/lib/languages/nginx'

/* Syntax highlighting runs here, at build time, because this is where the
   markdown is already being turned into HTML. It used to run in the browser on
   mount instead, which meant every reader downloaded highlight.js to redo work
   the build could have finished once.

   Registering a language costs nothing now that none of this reaches the
   client, so the set is as wide as the posts need rather than as narrow as a
   bundle budget wants. */
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('nginx', nginx)
hljs.registerAliases(['js', 'jsx'], { languageName: 'javascript' })
hljs.registerAliases(['ts', 'tsx'], { languageName: 'typescript' })
hljs.registerAliases(['html'], { languageName: 'xml' })
hljs.registerAliases(['shell', 'sh'], { languageName: 'bash' })

const postsDirectory = path.join(process.cwd(), 'posts')

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}/

let _posts = null
let _postsBySlug = null

function loadPosts() {
  if (_posts) return { posts: _posts, postsBySlug: _postsBySlug }

  const posts = []
  const postsBySlug = new Map()

  let slugs = []
  try {
    slugs = fs.readdirSync(postsDirectory).filter((dir) => {
      const postPath = path.join(postsDirectory, dir, 'post.md')
      return fs.existsSync(postPath)
    })
  } catch {
    return { posts, postsBySlug }
  }

  for (const slug of slugs) {
    const filePath = path.join(postsDirectory, slug, 'post.md')
    const raw = fs.readFileSync(filePath, 'utf-8')
    const parsed = parseMarkdownPost(slug, raw)
    if (parsed) {
      posts.push(parsed)
      postsBySlug.set(parsed.slug, parsed)
    }
  }

  posts.sort((a, b) => {
    const dateA = a.date ? Date.parse(a.date) : 0
    const dateB = b.date ? Date.parse(b.date) : 0
    if (dateA && dateB) return dateB - dateA
    if (dateA) return -1
    if (dateB) return 1
    return a.slug.localeCompare(b.slug)
  })

  _posts = posts
  _postsBySlug = postsBySlug
  return { posts, postsBySlug }
}

function parseMarkdownPost(slug, raw) {
  if (typeof raw !== 'string') return null
  if (!slug) return null

  const { data, content } = parseFrontMatter(raw)
  const markdown = content.trim()
  const html = renderMarkdown(markdown)
  const plainText = stripMarkdown(markdown)

  const title = typeof data.title === 'string' ? data.title.trim() : toTitleFromSlug(slug)
  const description = typeof data.description === 'string' ? data.description.trim() : createExcerpt(plainText)
  const date = typeof data.date === 'string' && ISO_DATE_REGEX.test(data.date.trim()) ? data.date.trim() : null
  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : typeof data.tags === 'string'
      ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : []

  const readingTime = calculateReadingTime(plainText)
  const excerpt = createExcerpt(plainText)

  return {
    slug,
    title,
    description,
    date,
    tags,
    readingTime,
    excerpt,
    content: markdown,
    html,
    // No trailing slash: Next serves the route without one and 308s the slashed
    // form to it, so every card link, canonical and sitemap entry was pointing
    // at a redirect.
    url: `/blog/${slug}`,
  }
}

function parseFrontMatter(raw) {
  if (!raw.startsWith('---')) {
    return { data: {}, content: raw }
  }

  const endIndex = raw.indexOf('\n---', 3)
  if (endIndex === -1) {
    return { data: {}, content: raw }
  }

  const frontMatterBlock = raw.slice(3, endIndex).trim()
  const content = raw.slice(endIndex + 4)
  const data = {}

  let currentKey = null
  let accumulator = []

  const lines = frontMatterBlock.split(/\r?\n/)
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue

    if (line.startsWith('- ') && currentKey && Array.isArray(data[currentKey])) {
      data[currentKey].push(line.slice(2).trim())
      continue
    }

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      if (currentKey) accumulator.push(line)
      continue
    }

    if (currentKey && accumulator.length) {
      data[currentKey] = accumulator.join(' ').trim()
      accumulator = []
    }

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if (!value) {
      currentKey = key
      accumulator = []
      data[currentKey] = ''
      continue
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      const items = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
      data[key] = items
      currentKey = key
      accumulator = []
      continue
    }

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    data[key] = value
    currentKey = key
    accumulator = []
  }

  if (currentKey && accumulator.length) {
    data[currentKey] = accumulator.join(' ').trim()
  }

  return { data, content }
}

/**
 * Highlighted HTML for a fenced block, or plain escaped text when the fence
 * names a language nothing is registered for.
 *
 * An unknown language is left alone rather than guessed at: highlight.js can
 * auto-detect, but on a single short block it is as likely to be wrong as
 * right, and mislabelled tokens read worse than none. `hljs.highlight` escapes
 * the source itself, so this must not also run it through `escapeHtml`.
 */
function highlightCode(code, lang) {
  if (!lang || !hljs.getLanguage(lang)) return escapeHtml(code)
  try {
    return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
  } catch {
    return escapeHtml(code)
  }
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  let html = ''
  let inParagraph = false
  let inList = false
  let listType = 'ul'
  let inCode = false
  let codeLang = ''
  const codeBuffer = []

  const closeParagraph = () => {
    if (inParagraph) { html += '</p>'; inParagraph = false }
  }
  const closeList = () => {
    if (inList) { html += listType === 'ol' ? '</ol>' : '</ul>'; inList = false }
  }
  const closeCodeBlock = () => {
    if (inCode) {
      // `hljs` alongside `language-*` is the class the browser-side pass used
      // to add on mount, kept so the rendered markup is unchanged.
      html += `<pre><code class="hljs language-${escapeHtml(codeLang)}">${highlightCode(codeBuffer.join('\n'), codeLang)}</code></pre>`
      codeBuffer.length = 0
      codeLang = ''
      inCode = false
    }
  }
  const flushBlocks = () => { closeParagraph(); closeList(); closeCodeBlock() }

  for (const rawLine of lines) {
    const line = rawLine

    if (line.startsWith('```')) {
      if (inCode) {
        closeCodeBlock()
      } else {
        closeParagraph()
        closeList()
        inCode = true
        codeLang = line.slice(3).trim()
      }
      continue
    }

    if (inCode) { codeBuffer.push(line); continue }

    const trimmed = line.trim()
    if (!trimmed) { closeParagraph(); closeList(); continue }

    if (/^#{1,6}\s/.test(trimmed)) {
      flushBlocks()
      const level = trimmed.match(/^#{1,6}/)[0].length
      const content = trimmed.slice(level).trim()
      html += `<h${level}>${formatInline(content)}</h${level}>`
      continue
    }

    if (trimmed.startsWith('>')) {
      flushBlocks()
      html += `<blockquote>${formatInline(trimmed.replace(/^>\s?/, ''))}</blockquote>`
      continue
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[-*]\s+/, '')
      if (!inList || listType !== 'ul') {
        closeParagraph()
        if (inList) closeList()
        listType = 'ul'
        html += '<ul>'
        inList = true
      }
      html += `<li>${formatInline(content)}</li>`
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s+/, '')
      if (!inList || listType !== 'ol') {
        closeParagraph()
        if (inList) closeList()
        listType = 'ol'
        html += '<ol>'
        inList = true
      }
      html += `<li>${formatInline(content)}</li>`
      continue
    }

    if (/^---+$/.test(trimmed)) {
      flushBlocks()
      html += '<hr />'
      continue
    }

    if (!inParagraph) {
      closeList()
      html += '<p>'
      inParagraph = true
      html += formatInline(trimmed)
    } else {
      html += ` ${formatInline(trimmed)}`
    }
  }

  closeCodeBlock()
  closeParagraph()
  closeList()

  return html
}

function formatInline(text) {
  const tokens = []
  let working = text

  working = working.replace(/`([^`]+)`/g, (_, code) => {
    const index = tokens.length
    tokens.push({ type: 'code', value: code })
    return `@@TOKEN_${index}@@`
  })

  working = working.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const index = tokens.length
    tokens.push({ type: 'link', label, href })
    return `@@TOKEN_${index}@@`
  })

  working = escapeHtml(working)
  working = working.replace(/\*\*([^*]+)\*\*/g, (_, bold) => `<strong>${formatInline(bold)}</strong>`)
  working = working.replace(/(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)/g, (_, italic) => `<em>${formatInline(italic)}</em>`)

  working = working.replace(/@@TOKEN_(\d+)@@/g, (_, rawIndex) => {
    const index = Number(rawIndex)
    const token = tokens[index]
    if (!token) return ''
    if (token.type === 'code') return `<code>${escapeHtml(token.value)}</code>`
    if (token.type === 'link') {
      return `<a href="${escapeHtml(token.href)}" target="_blank" rel="noreferrer noopener">${formatInline(token.label)}</a>`
    }
    return ''
  })

  return working
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\r?\n/g, ' ')
}

function createExcerpt(text) {
  const trimmed = text.trim().replace(/\s+/g, ' ')
  if (trimmed.length <= 160) return trimmed
  return `${trimmed.slice(0, 157).trim()}...`
}

function toTitleFromSlug(slug) {
  return slug
    .split('/')
    .pop()
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}

function calculateReadingTime(text) {
  if (!text) return 0
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

/* A post carries two copies of its own body: `content`, the raw markdown, and
   `html`, the rendered form. Neither belongs anywhere near a client component —
   whatever is handed to one is serialised into the flight payload embedded in
   the page, so a field nobody renders is still bytes every visitor downloads.
   These projections are what cross that boundary; `getPosts` stays whole for
   the server-only callers (the sitemap, metadata, JSON-LD). */

/** Exactly the fields a blog card renders. */
function toCard(post) {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    date: post.date,
    tags: post.tags,
    readingTime: post.readingTime,
    url: post.url,
  }
}

export function getPosts() {
  return loadPosts().posts
}

export function getPostCards() {
  return loadPosts().posts.map(toCard)
}

/** Exactly the fields the article view renders. */
export function toArticleView(post) {
  return {
    title: post.title,
    date: post.date,
    tags: post.tags,
    readingTime: post.readingTime,
    html: post.html,
  }
}

export function getPostBySlug(slug) {
  return loadPosts().postsBySlug.get(slug) ?? null
}

export function getAllSlugs() {
  return loadPosts().posts.map((post) => post.slug)
}
