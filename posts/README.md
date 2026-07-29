# Posts

One directory per article, each holding a `post.md`. The directory name is the
slug, so `posts/my-article/post.md` is served at `/blog/my-article`. Keep slugs
lowercase and hyphenated — the name goes into a URL verbatim, and a space in it
produces a `%20` that has to be escaped everywhere the link appears.

Nothing needs registering. `lib/posts.js` reads this directory at build time,
and the blog section, the sitemap, the per-article share cards and the JSON-LD
all follow from what it finds. While the directory holds no posts, the blog
section shows its "coming soon" placeholder and the subscribe box instead.

## Format

```markdown
---
title: "Installing and Configuring Nginx on Ubuntu 22.04"
description: "A short summary used for the card, the meta description and the share card."
date: 2025-02-17
tags: [nginx, ubuntu, devops]
---

Body starts here.
```

Front matter is optional, and each key has a fallback: the title comes from the
slug, the description from the opening sentences, the tags from nothing at all.
`date` must be `YYYY-MM-DD` — anything else is ignored rather than guessed at,
because it feeds `lastModified` in the sitemap.

## Supported markdown

Headings, paragraphs, `>` blockquotes, `-`/`*` and `1.` lists, `---` rules,
fenced code blocks, inline `` `code` ``, `**bold**`, `*italic*` and
`[links](https://example.com)`. That is the whole of it — the renderer in
`lib/posts.js` is deliberately small, and anything it does not recognise is
escaped rather than passed through as HTML.

Code fences are highlighted at build time. The languages registered in
`lib/posts.js` are bash, css, javascript, json, nginx, typescript and xml, plus
the aliases js, jsx, ts, tsx, html, sh and shell. A fence naming anything else
renders as plain text; add the grammar to that list to highlight it, which costs
visitors nothing because none of highlight.js reaches the browser.
