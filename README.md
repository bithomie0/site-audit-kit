# Site Audit Kit — a Claude Code plugin

Give Claude Code eyes for your web side-hustle. Hand it a URL; it screenshots
the site (desktop + mobile), audits it like a designer pitching the work, and
helps you build before/after proof once you win the job. No manual screenshots.

---

## How to install & use

You don't clone this repo or run anything in a terminal. Everything happens
**inside Claude Code** — the GitHub repo is just where Claude Code downloads
the plugin from.

### Before you start, you need

- **Claude Code** installed ([install guide](https://docs.claude.com/en/docs/claude-code/overview)) and signed in with a **paid Anthropic plan**
- **Node.js** installed ([nodejs.org](https://nodejs.org))

### Step 1 — install the plugin (one time)

Open Claude Code and type these two commands, one at a time:

```
/plugin marketplace add bithomie0/site-audit-kit
/plugin install site-audit-kit@site-audit-kit
```

> These start with a slash and are **typed directly into Claude Code** — they
> are Claude Code's own commands, not something you ask in plain English, and
> not something you run in a normal terminal. The first command points Claude
> Code at this repo; the second installs the plugin from it.

The first time you run an audit, Claude asks permission to install Playwright +
Chromium; the first video asks to install the Remotion deps. Approve once and
Claude handles the rest. (`@remotion/renderer` bundles its own ffmpeg, so
there's nothing else to install.)

### Step 2 — use it

Just type any of these in Claude Code:

```
# Screenshot one or more sites and write a sales-ready audit for each
/site-audit-kit:audit joesplumbing.com riversidedental.com

# Render a before/after reveal video (landscape + vertical) from two images
/site-audit-kit:video shots/joesplumbing_com/desktop.png public/new-build.png "My Studio"

# Build a drag-to-compare HTML showcase from two images
/site-audit-kit:before-after shots/joesplumbing_com/desktop.png public/new-build.png
```

Claude does the work behind each command — screenshotting, writing the audit,
rendering the video. You just trigger it with the slash command.

### Updating later

If a new version ships, refresh it in Claude Code with:

```
/plugin marketplace update site-audit-kit
```

---

## What's in the box

| Component | What it does |
|-----------|--------------|
| `/site-audit-kit:audit` | Screenshots each URL and writes a sales-ready audit per site |
| `/site-audit-kit:video` | Renders a before/after reveal MP4 (landscape + vertical) from two images |
| `/site-audit-kit:before-after` | Builds a drag-to-compare HTML showcase from two images |
| `site-audit` skill | The audit rubric + workflow Claude follows automatically |
| `scripts/screenshot.mjs` | The Playwright capturer (desktop + mobile, full page) |
| `templates/remotion/` | A finished Remotion composition — swap two images, render |
| `templates/before-after-showcase.html` | The client-ready comparison template |

---

## For you — publish it so others can install

A Claude Code marketplace is just a public Git repo. To ship:

```bash
cd site-audit-kit
git init
git add .
git commit -m "Site Audit Kit v1"
# create an empty public repo named site-audit-kit on GitHub, then:
git remote add origin https://github.com/bithomie0/site-audit-kit.git
git push -u origin main
```

Before pushing, edit two files with your details: `.claude-plugin/plugin.json`
and `.claude-plugin/marketplace.json` (your name, GitHub URL). That's it —
anyone can now run the two install lines above.

To ship an update later, push your changes; users refresh with
`/plugin marketplace update site-audit-kit`.

Want it discoverable in Anthropic's official directory? You can submit it at
claude.ai/settings/plugins/submit.

---

## Notes & limits

- Plugins are copied to a cache on install, so the commands copy the screenshot
  script into your working folder before running it — that keeps Playwright's
  module resolution happy.
- Cookie/consent banners can cover a shot; tell Claude to dismiss them first.
- You only ever screenshot public pages you'd visit in a browser anyway.
