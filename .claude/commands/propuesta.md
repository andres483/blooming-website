# /propuesta — Blooming Proposal Builder

Converts a PPTX (or raw description) into a polished Blooming-style HTML proposal, then publishes a shareable link.

## How to invoke

```
/propuesta path/to/file.pptx
/propuesta path/to/file.pptx ClientName
```

If no file is provided, ask the user to describe the proposal content and build from that.

---

## Step 1 — Extract content from PPTX

Run this Python script to extract all slide text:

```python
import zipfile, re
from xml.etree import ElementTree as ET

pptx = "$ARGUMENTS"  # replace with actual path
with zipfile.ZipFile(pptx) as z:
    slides = sorted([f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')])
    for slide_path in slides:
        slide_num = re.search(r'slide(\d+)', slide_path).group(1)
        with z.open(slide_path) as f:
            tree = ET.parse(f)
            ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
            texts = [t.text.strip() for t in tree.findall('.//a:t', ns) if t.text and t.text.strip()]
            if texts:
                print(f'--- SLIDE {slide_num} ---')
                print(' | '.join(texts))
```

Then extract and **visually read** any embedded images (screenshots with tables, charts, etc.):

```python
import zipfile, os
with zipfile.ZipFile(pptx) as z:
    media = [f for f in z.namelist() if f.startswith('ppt/media/')]
    os.makedirs('/tmp/proposal_media', exist_ok=True)
    for m in media:
        with z.open(m) as src, open(f'/tmp/proposal_media/{os.path.basename(m)}', 'wb') as dst:
            dst.write(src.read())
```

Use the Read tool to visually inspect each image and extract tables, numbers, and any data.

---

## Step 2 — Identify client name and output paths

From the filename or `$ARGUMENTS`, derive:
- `CLIENT_SLUG` — lowercase, hyphenated (e.g. `bond-ai`, `plaud`, `moots`)
- `CLIENT_NAME` — display name (e.g. `Bond.ai`, `Plaud.AI`, `Moots`)

Output paths:
- `proposals/clients/{CLIENT_SLUG}/proposal.html`
- `public/{CLIENT_SLUG}-proposal.html`

---

## Step 3 — Build the HTML in Blooming style

Use the structure and CSS below as the base. Adapt content, slide count, and layout to fit the actual proposal — don't force content into a fixed number of slides.

### Design system (never change these)

```css
/* Fonts */
Cormorant Garamond — display, headlines, italic accents (weight 300/400)
Space Grotesk — body, labels, UI (weight 300/400/500)

/* Colors */
--negro: #1A1A1A
--blanco: #FFFFFF
--bosque: #5C6B5A      /* primary accent — headings, labels, totals */
--tierra: #C4B8A8      /* secondary accent — borders, italic quotes */
--screen-bg: #E8E6E2   /* page background in browser */
--border: rgba(26,26,26,0.12)

/* Slide dimensions */
width: 11in; height: 8.5in; padding: 1in 1.2in;

/* Footer */
position: absolute; bottom: 0.6in; left/right: 1.2in
left: "Blooming × ClientName" | right: slide number or "Confidential"
```

### Mandatory structural elements

Every proposal must include:

1. **Cover slide** — Blooming isotipo SVG + wordmark, title with `<em>` italic accent, subtitle (event/service + date), "Prepared by Alison Granger, Co-Founder", "Blooming × ClientName" logos bottom right, "Confidential" badge
2. **Content slides** — section label (uppercase, bosque color), display headline with italic accent, body content
3. **Close slide** — centered, isotipo SVG, headline `<em>`, short italic body quote, next steps bullet list, `alison@weareblooming.co`, `weareblooming.co`

### Blooming isotipo SVG (use on cover and close)

```svg
<svg width="48" height="48" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="24" cy="14" rx="5" ry="12" fill="#1A1A1A" fill-opacity="0.7"/>
  <ellipse cx="24" cy="46" rx="5" ry="12" fill="#1A1A1A" fill-opacity="0.7"/>
  <ellipse cx="12" cy="30" rx="12" ry="5" fill="#5C6B5A" fill-opacity="0.6"/>
  <ellipse cx="36" cy="30" rx="12" ry="5" fill="#5C6B5A" fill-opacity="0.6"/>
  <circle cx="24" cy="30" r="4" fill="#1A1A1A"/>
</svg>
```

### Typography patterns

```html
<!-- Section label -->
<p class="uppercase section-label">Label text</p>

<!-- Display headline with italic accent -->
<h2 class="display section-headline">Main text<br><em>italic accent.</em></h2>

<!-- Italic quote (Cormorant, bordered left) -->
<p class="overview-intro">Personal voice quote...</p>

<!-- Stat numbers -->
<span class="stat-number">150+</span>
<span class="stat-label">Events executed</span>

<!-- Investment row -->
<div class="invest-row">
  <span class="item">Line item description</span>
  <span class="price">$X,XXX</span>
</div>
<div class="invest-row total">
  <span class="item">Total</span>
  <span class="price">$X,XXX</span>
</div>
```

### Required CSS (include full block, always)

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --negro: #1A1A1A; --blanco: #FFFFFF; --bosque: #5C6B5A;
  --tierra: #C4B8A8; --screen-bg: #E8E6E2; --border: rgba(26,26,26,0.12);
}
@page { size: 11in 8.5in; margin: 0; }
body { font-family: 'Space Grotesk', sans-serif; color: var(--negro); background: var(--screen-bg); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.slide { width: 11in; height: 8.5in; padding: 1in 1.2in; display: flex; flex-direction: column; justify-content: center; position: relative; page-break-after: always; background: var(--blanco); overflow: hidden; }
.slide:last-child { page-break-after: auto; }
.display { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 300; letter-spacing: -0.02em; }
.uppercase { text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.7rem; font-weight: 400; }
.line { width: 40px; height: 1px; background: var(--negro); opacity: 0.15; }
.slide-footer { position: absolute; bottom: 0.6in; left: 1.2in; right: 1.2in; display: flex; justify-content: space-between; }
.slide-footer span { font-size: 0.6rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: var(--negro); opacity: 0.45; }
.section-label { color: var(--bosque); opacity: 0.8; }
.section-headline { font-size: 2.4rem; line-height: 1.15; max-width: 8.5in; color: var(--negro); }
.section-headline em { font-style: italic; color: var(--bosque); }
.section-body { font-size: 0.88rem; line-height: 1.75; max-width: 7in; color: var(--negro); opacity: 0.7; }

/* Cover */
.slide-cover { justify-content: space-between; padding-top: 1.2in; padding-bottom: 1in; }
.cover-top { display: flex; align-items: center; gap: 16px; }
.cover-wordmark { font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; color: var(--negro); }
.cover-main { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 20px; }
.cover-tagline { font-size: 3.6rem; line-height: 1.08; color: var(--negro); }
.cover-tagline em { font-style: italic; color: var(--bosque); }
.cover-sub { font-size: 0.78rem; font-weight: 300; letter-spacing: 0.1em; color: var(--negro); opacity: 0.65; }
.cover-badge { display: inline-flex; padding: 8px 16px; border: 1px solid var(--border); border-radius: 2px; align-self: flex-start; margin-top: 16px; }
.cover-badge span { font-size: 0.6rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--negro); opacity: 0.55; }
.cover-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
.cover-from { font-size: 0.7rem; font-weight: 300; color: var(--negro); opacity: 0.6; }

/* Grids */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
.grid-item { display: flex; flex-direction: column; gap: 12px; }
.grid-item h3 { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; font-style: italic; font-size: 1.25rem; color: var(--bosque); }
.grid-item p { font-size: 0.8rem; line-height: 1.6; font-weight: 300; color: var(--negro); opacity: 0.65; }
.grid-num { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.85rem; font-weight: 300; color: var(--bosque); opacity: 0.7; }

/* Lists */
.bullet-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
.bullet-list li { font-size: 0.8rem; font-weight: 300; line-height: 1.55; color: var(--negro); opacity: 0.7; padding-left: 14px; position: relative; }
.bullet-list li::before { content: '–'; position: absolute; left: 0; opacity: 0.4; }

/* Stats */
.stats-row { display: flex; gap: 56px; }
.stat-item { display: flex; flex-direction: column; gap: 4px; }
.stat-number { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.2rem; font-weight: 300; color: var(--negro); line-height: 1; }
.stat-label { font-size: 0.62rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; color: var(--bosque); opacity: 0.75; }

/* Quote block */
.overview-intro { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.1rem; line-height: 1.65; font-style: italic; color: var(--negro); opacity: 0.7; max-width: 7in; border-left: 2px solid var(--tierra); padding-left: 24px; }

/* Investment table */
.invest-table { display: flex; flex-direction: column; max-width: 7.5in; }
.invest-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border); }
.invest-row:last-child { border-bottom: none; }
.invest-row .item { font-size: 0.82rem; font-weight: 300; color: var(--negro); opacity: 0.65; }
.invest-row .price { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.05rem; color: var(--negro); }
.invest-row.total .item { font-weight: 400; opacity: 1; }
.invest-row.total .price { font-size: 1.45rem; color: var(--bosque); }
.invest-note { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 0.9rem; font-style: italic; color: var(--negro); opacity: 0.55; line-height: 1.6; margin-top: 16px; }

/* Close */
.slide-close { align-items: center; text-align: center; gap: 32px; }
.close-headline { font-size: 3.2rem; line-height: 1.1; color: var(--negro); }
.close-headline em { font-style: italic; color: var(--bosque); }
.close-body { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.05rem; font-weight: 300; font-style: italic; color: var(--negro); opacity: 0.65; max-width: 5.5in; line-height: 1.7; }
.close-steps { display: flex; flex-direction: column; gap: 8px; text-align: left; max-width: 5in; }
.close-steps p { font-size: 0.82rem; font-weight: 300; color: var(--negro); opacity: 0.65; padding-left: 16px; position: relative; }
.close-steps p::before { content: ''; position: absolute; left: 0; top: 10px; width: 4px; height: 4px; border-radius: 50%; background: var(--bosque); opacity: 0.5; }
.close-email { font-size: 0.95rem; font-weight: 300; color: var(--negro); opacity: 0.65; }
.close-url { font-size: 0.7rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--bosque); opacity: 0.6; }

/* Screen */
@media screen { body { display: flex; flex-direction: column; align-items: center; gap: 32px; padding: 32px; } .slide { box-shadow: 0 2px 30px rgba(0,0,0,0.08); border-radius: 2px; } }
@media print { body { background: white; padding: 0; gap: 0; } .slide { box-shadow: none; } }

/* Mobile */
@media screen and (max-width: 900px) {
  body { padding: 12px; gap: 12px; }
  .slide { width: 100%; height: auto; min-height: auto; padding: 48px 24px 72px; page-break-after: unset; }
  .slide-cover { padding-top: 48px; padding-bottom: 48px; gap: 28px; min-height: 100svh; }
  .cover-tagline { font-size: 2.2rem; }
  .cover-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
  .section-headline { font-size: 1.5rem; max-width: 100%; }
  .grid-2, .grid-3 { grid-template-columns: 1fr; gap: 24px; }
  .stats-row { flex-wrap: wrap; gap: 24px; }
  .overview-intro { font-size: 0.95rem; max-width: 100%; }
  .close-headline { font-size: 2rem; }
  .close-body { max-width: 100%; }
  .slide-footer { position: relative; bottom: auto; left: auto; right: auto; margin-top: 32px; }
}
```

### Google Fonts link (always include in `<head>`)

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## Step 4 — Write and save the files

1. Write the HTML to `proposals/clients/{CLIENT_SLUG}/proposal.html`
2. Copy it to `public/{CLIENT_SLUG}-proposal.html`

---

## Step 5 — Publish

Run these commands in order:

```bash
# Commit and push to Vercel (auto-deploy)
git add proposals/clients/{CLIENT_SLUG}/proposal.html public/{CLIENT_SLUG}-proposal.html
git commit -m "feat: add {CLIENT_NAME} proposal"
git push origin main

# Create shareable gist link
gh gist create public/{CLIENT_SLUG}-proposal.html --public --desc "Blooming x {CLIENT_NAME} — Proposal"
```

Then construct the htmlpreview link:
```
https://htmlpreview.github.io/?https://gist.githubusercontent.com/avillagran7-web/{GIST_ID}/raw/{CLIENT_SLUG}-proposal.html
```

---

## Step 6 — Deliver

Reply with:
1. The shareable htmlpreview link (this is what to send to the client)
2. The Vercel URL: `weareblooming.co/{CLIENT_SLUG}-proposal.html`
3. A one-line summary of what was built

---

## Voice and tone guidelines

- **Alison's personal voice** — warm, direct, confident. Not corporate.
- Proposals from Alison use "I" and "my work" naturally.
- Proposals from Blooming (to a client) use "we" and "Blooming".
- Headlines should have one `<em>` italic word or phrase — the emotional hook.
- Close slide is always hopeful and action-oriented, never salesy.
- Keep body copy tight — one idea per paragraph, max 3 lines.
