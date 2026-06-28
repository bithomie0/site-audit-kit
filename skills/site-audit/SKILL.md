---
name: site-audit
description: Use when auditing a website's design and UX for a client pitch or cold outreach, when reviewing screenshots of a site, or when producing before/after redesign comparisons and videos. Covers the screenshot workflow, the audit rubric, the deliverable format, and how to assemble before/after showcases.
---

# Website audit & before/after skill

This skill helps turn a URL into a persuasive, sales-ready audit and, after a redesign, into before/after proof. The audience is a freelance web designer trying to win and deliver work.

## Capturing screenshots

A Playwright capturer ships with this plugin at `scripts/screenshot.mjs`. It takes one or more URLs and saves full-page **desktop** (1440px) and **mobile** (390px) PNGs to `shots/<site>/`. Copy it into the working folder, ensure `playwright` + chromium are installed, then run `node screenshot.mjs <url> [url2] ...`. Always look at BOTH the desktop and mobile shot — most prospect sites fail hardest on mobile.

## The audit rubric

Score every finding 🔴 critical / 🟡 worth fixing / 🟢 fine. Group findings into these six areas:

1. **First impression & above-the-fold** — Within 5 seconds, is it clear what the business does and what to do next? Dated visual style, clutter, low-quality images, no clear headline.
2. **Mobile experience** — Does it reflow for phones, or is it a shrunken desktop page? Tap targets, text size, horizontal scrolling, broken menus.
3. **Trust & credibility** — Reviews, real photos, clear contact details, security, recency. Anything that makes a visitor doubt the business is real or active.
4. **Calls-to-action & conversion** — Is there an obvious next step (book, call, quote) above the fold and repeated? Missing or buried CTAs are the most common money-leak.
5. **Visual design & dateness** — Typography, spacing, colour, consistency. Does it look like it was built this decade?
6. **Accessibility & readability basics** — Contrast, font size, alt text, heading structure. Quick wins that also signal professionalism.

## The deliverable

Lead with **the hook**: the 3 most damaging problems, phrased the way a business owner would feel them ("invisible on phones, so you're losing the half of customers who search on their phone"), not in jargon. Then the full grouped findings. Then a **one-line opening pitch** for the cold call or email.

Save it as a clean single-page HTML report (`reports/<site>.html`) with the desktop screenshot embedded at the top. Keep it sendable — a prospect should be able to open it and immediately get it.

## Before / after

Once the redesign ships, two deliverables come from the same pair of screenshots (old = before, new = after; keep them the same aspect ratio):

- **Interactive showcase** — `templates/before-after-showcase.html`, a drag-to-compare page for portfolios and proposals.
- **Video (the main deliverable)** — a finished Remotion composition ships in `templates/remotion/`. It renders a clean wipe-reveal MP4 in both landscape (`BeforeAfter`) and vertical/Reels (`BeforeAfterVertical`) from two images named `before.png` / `after.png` in its `public/` folder. Do NOT hand-write Remotion code — copy this template, swap the two images, run `npm install`, then `npx remotion render`. `@remotion/renderer` bundles ffmpeg, so nothing else is needed. Studio name and accent colour pass through as `--props`. The `/site-audit-kit:video` command automates all of this.

Keep motion simple — the template is one clean wipe on purpose. For radically different styles, the optional Remotion agent skill (`npx skills add remotion-dev/skills`) lets Claude write custom compositions.

## Distinction that matters

For **cold outreach**, the audit alone is the asset (their current site + problems = the hook). The **before/after** only exists after the job is won and rebuilt — that's portfolio and proof for the *next* pitch. Same screenshots feed both.
