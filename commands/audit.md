---
description: Screenshot one or more prospect websites and write a sales-ready audit for each.
argument-hint: <url> [url2] [url3] ...
---

The user wants a cold-outreach website audit for these sites: **$ARGUMENTS**

Carry out the workflow below. Ask permission before installing anything or running shell commands (the user expects to approve installs once, then let you work).

1. **Prepare the screenshot tool in the current folder.**
   - Copy the bundled capturer here: `cp "${CLAUDE_PLUGIN_ROOT}/scripts/screenshot.mjs" ./screenshot.mjs`
   - If `playwright` isn't installed in this folder, run `npm install playwright` then `npx playwright install chromium`.

2. **Capture the screenshots.**
   - Run: `node screenshot.mjs $ARGUMENTS`
   - This writes full-page desktop + mobile PNGs to `./shots/<site>/`.

3. **Audit each site.** For every folder created under `shots/`, VIEW both `desktop.png` and `mobile.png`, then write the audit following the rubric in the **site-audit** skill (first impression, mobile, trust, calls-to-action, design, accessibility). Lead with the 3 most damaging problems framed as the prospect would feel them.

4. **Produce the deliverable.** Save each audit as `reports/<site>.html` — a clean, single-page report with the desktop screenshot embedded at the top, the prioritized findings, and a one-line opening pitch the user can use on the call. Match the dark studio styling used in the before/after template at `${CLAUDE_PLUGIN_ROOT}/templates/before-after-showcase.html`.

5. **Summarize** in chat: for each site, the single strongest hook to open outreach with.
