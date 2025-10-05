---
title: "Introducing My Portfolio Stack"
description: "Behind the scenes look at the Vite + React setup powering my portfolio."
date: "2025-02-15"
tags: [react, vite, portfolio]
---

# Introducing My Portfolio Stack

Welcome to the first article published with the new markdown-powered blog. This post walks through how the site is stitched together.

## Tooling Highlights

- Vite for rapid iteration and modern bundling.
- React 19 for declarative UI.
- Custom scroll choreography for section transitions.

```js
import { useState } from 'react'

export function Demo() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      Clicked {count} times
    </button>
  )
}
```

> Pro tip: keep components focused and the scroll experience will feel effortless.

## What's Next

Expect deeper dives on accessibility, animation technique, and developer experience.

Thanks for reading!
