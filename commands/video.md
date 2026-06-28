---
description: Render a before/after reveal video (landscape + vertical) from two screenshots.
argument-hint: <before-image-path> <after-image-path> [studio name]
---

The user wants a before/after **video** from two images: **$ARGUMENTS**
(first path = before, second path = after, optional studio name after that).

Use the **bundled Remotion template** — do NOT write Remotion code from scratch.
It's a finished, tested composition; your job is just to feed it the images and render.

1. **Copy the template project** into the working folder if it isn't there yet:
   `cp -r "${CLAUDE_PLUGIN_ROOT}/templates/remotion" ./before-after-video`

2. **Drop in the images** (overwrite the placeholders), keeping the same filenames:
   - `cp "<before path>" ./before-after-video/public/before.png`
   - `cp "<after path>"  ./before-after-video/public/after.png`
   Use two shots of the same aspect ratio. 16:9 fills the landscape cut best;
   the vertical cut center-crops automatically.

3. **Install dependencies** (ask permission first):
   `cd before-after-video && npm install`
   Note: `@remotion/renderer` bundles its own ffmpeg and headless Chromium, so
   there's nothing else to install — it may download a render browser on first run.

4. **Render both orientations** (pass the studio name + accent through as props):
   - `npx remotion render src/index.ts BeforeAfter out/before-after.mp4 --props='{"studio":"<STUDIO>","accent":"#ff8a4c"}'`
   - `npx remotion render src/index.ts BeforeAfterVertical out/before-after-vertical.mp4 --props='{"studio":"<STUDIO>","accent":"#ff8a4c"}'`

5. **Hand back the results**: point the user to `before-after-video/out/`. Tell them
   they can preview live and scrub the timeline with `npm run dev` (opens Remotion
   Studio), and that timing, colours, and labels are editable in
   `src/BeforeAfter.tsx`. Keep any motion tweaks simple.

If the user wants a fundamentally different style than the wipe-reveal, they can
install the Remotion agent skill once (`npx skills add remotion-dev/skills`) and ask
for custom motion — but this bundled template is the reliable default.
