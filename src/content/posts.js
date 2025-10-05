const modules = import.meta.glob('../../posts/**/post.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const posts = []
const postsBySlug = new Map()

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}/

for (const [path, raw] of Object.entries(modules)) {
  const parsed = parseMarkdownPost(path, raw)
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

function parseMarkdownPost(path, raw) {
  if (typeof raw !== 'string') return null
  const slug = extractSlug(path)
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
    url: `/blog/${slug}/`,
  }
}

function extractSlug(path) {
  const normalized = path.replace(/\\/g, '/').replace(/^\.\./, '')
  const match = normalized.match(/\/posts\/(.+?)\/post\.md$/)
  return match ? match[1] : null
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
      if (currentKey) {
        accumulator.push(line)
      }
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
    if (inParagraph) {
      html += '</p>'
      inParagraph = false
    }
  }

  const closeList = () => {
    if (inList) {
      html += listType === 'ol' ? '</ol>' : '</ul>'
      inList = false
    }
  }

  const closeCodeBlock = () => {
    if (inCode) {
      html += `<pre><code class="language-${escapeHtmlAttr(codeLang)}">${escapeHtml(codeBuffer.join('\n'))}</code></pre>`
      codeBuffer.length = 0
      codeLang = ''
      inCode = false
    }
  }

  const flushBlocks = () => {
    closeParagraph()
    closeList()
    closeCodeBlock()
  }

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

    if (inCode) {
      codeBuffer.push(line)
      continue
    }

    const trimmed = line.trim()
    if (!trimmed) {
      closeParagraph()
      closeList()
      continue
    }

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
    if (token.type === 'code') {
      return `<code>${escapeHtml(token.value)}</code>`
    }
    if (token.type === 'link') {
      const safeHref = escapeHtmlAttr(token.href)
      const label = formatInline(token.label)
      return `<a href="${safeHref}" target="_blank" rel="noreferrer noopener">${label}</a>`
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
  if (trimmed.length <= 160) {
    return trimmed
  }
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

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeHtmlAttr(value) {
  return escapeHtml(String(value))
}

export function getPosts() {
  return posts
}

export function getPostBySlug(slug) {
  return postsBySlug.get(slug) ?? null
}

export function isBlogSlug(pathname) {
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/)
  return match ? match[1] : null
}
