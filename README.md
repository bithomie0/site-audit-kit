# Site Audit Kit — a Claude Code plugin

Give Claude Code eyes for your web side-hustle. Hand it a URL; it screenshots
the site (desktop + mobile), audits it like a designer pitching the work, and
helps you build before/after proof once you win the job. No manual screenshots.

---

## For users — install in 2 lines

In Claude Code:

```
/plugin marketplace add bithomie0/site-audit-kit
/plugin install site-audit-kit@site-audit-kit
```

(This repo is hosted at `github.com/bithomie0/site-audit-kit`.)

Then just use the commands:

```
/site-audit-kit:audit joesplumbing.com riversidedental.com
/site-audit-kit:video shots/joesplumbing_com/desktop.png public/new-build.png "My Studio"
/site-audit-kit:before-after shots/joesplumbing_com/desktop.png public/new-build.png
```

**Requirements:** Claude Code, Node.js, and a paid Anthropic subscription.
The first audit asks permission to install Playwright + Chromium; the first
video asks to install the Remotion deps. Approve once and Claude handles the
rest. `@remotion/renderer` bundles its own ffmpeg, so there's no separate
video tooling to install.

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
