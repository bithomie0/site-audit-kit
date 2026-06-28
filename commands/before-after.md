---
description: Build a before/after showcase (and optionally a video) from two screenshots.
argument-hint: <before-image-path> <after-image-path>
---

The user wants a before/after comparison from two images: **$ARGUMENTS** (first = before, second = after).

1. **Showcase.** Copy the template into the current folder if it isn't here yet:
   `cp "${CLAUDE_PLUGIN_ROOT}/templates/before-after-showcase.html" ./before-after-showcase.html`
   Then edit the first project block: set the BEFORE layer to the first image and the AFTER layer to the second (replace each demo `<svg>…</svg>` with `<img src="PATH" alt="Before/After">`). Update the project name, URL, tags, and the results line based on what changed. Keep both images the same dimensions so they align.

2. **Optional video.** If the user wants a video too, check whether the Remotion agent skill is available; if not, tell them to run `npx skills add remotion-dev/skills` once. Then scaffold a Remotion project, drop the two images into its `public/` folder, and build a simple before→after wipe reveal (~6s, labels, their accent colour), preview it, and render to `out/before-after.mp4`. Keep the motion simple — one clean wipe, no overlapping animation.

3. Show the user the finished `before-after-showcase.html` and tell them exactly which lines to edit to swap in future clients.
