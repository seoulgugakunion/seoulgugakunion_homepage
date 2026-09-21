# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static website for the 서울 국악 동아리 연합 (Seoul Gugak Union), a coalition of
university Korean traditional-music (국악) clubs in Seoul. It is plain HTML/CSS/JS
with **no build step, no framework, and no package manager** — files are served
as-is. All UI text is Korean.

## Running & testing

There is no build. To develop, serve the repo root over HTTP and open pages
(opening via `file://` breaks the relative `../` asset paths and CDP tests).

```sh
python3 serve.py                   # serve site at http://127.0.0.1:8001/ (Cache-Control: no-store)
python3 -m http.server 8001        # fallback; browsers may serve stale CSS/JS from heuristic cache
```

Prefer `serve.py`: plain `http.server` sends no cache headers, so Chrome reuses
cached `app.js`/`styles.css` without revalidating and edits appear "missing"
until a hard refresh. HTML pages also reference assets with a `?v=N`
cache-buster — bump it if a stale-cache report comes in from a device you
can't hard-refresh.

The tests drive a real Chrome over the DevTools Protocol (no test framework).
Both a static server on port **8001** and Chrome with remote debugging on port
**9222** must already be running:

```sh
# Chrome with remote debugging (macOS example)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222

python3 test_split_site.py   # current end-to-end suite; screenshots -> /private/tmp
python3 test_site_cdp.py     # legacy suite (pre-split single-page layout — stale, uses removed data-nav hooks)
```

`test_split_site.py` is the source of truth for expected behavior; it imports the
`CDP` websocket client and `get_ws_url()` from `test_site_cdp.py`. Screenshots are
written to `SHOT_DIR` (`/private/tmp`).

## Architecture

**Multi-page, shared-script.** The site was split from a single-page app into
separate pages that all load one script:

- `index.html` — landing page (hero + news cards), lives at repo root.
- `pages/about.html`, `pages/clubs.html`, `pages/parts.html`, `pages/part-detail.html`.
- `assets/css/styles.css` — single stylesheet for every page.
- `assets/js/app.js` — single script for every page.
- `assets/img/` — club logos and photos.

**One script, page-detected behavior.** `app.js` runs on all pages and self-selects
what to initialize by probing for DOM anchors (`if ($("#clubList")) …`,
`if ($("#partGrid")) …`, `if ($("#partDetailRoot")) …`). Root vs. `pages/`
location is detected once via `rootPath` (checks whether the path includes
`/pages/`) and used by `imagePath()` so asset URLs resolve from either depth.
Pages also expose their identity via `<body data-page="…">`.

**Data lives in app.js, not in HTML.** The `clubs` and `parts` arrays and the
`news` object at the top of `app.js` are the content source of truth. Club cards,
part cards, and part-detail pages are rendered from these into placeholder
containers (`#clubList`, `#partGrid`, `#partDetailRoot`). To add/edit a club or
part, edit the array — do not hand-write card markup. `part-detail.html` reads
`?part=<name>` from the query string and looks it up in `parts` by `name`.

**Event handling is delegated.** A single document-level `click` listener in
`app.js` dispatches on `data-*` attributes rather than per-element handlers:
`data-open-modal` (contact/privacy/news), `data-news`, `data-link`,
`data-club-contact`, `data-part-contact`. Add interactive behavior by emitting the
matching `data-*` attribute in rendered markup, not by wiring new listeners.

**Modal + contact form.** One modal shell (`#modalBackdrop`) is reused for the
contact form, privacy notice, and news detail. The contact form validates
client-side (Korean phone format `010-0000-0000`, email, min message length) and
persists submissions to `localStorage` under key `sgu-contact` — there is **no
backend**; nothing is sent over the network. Contact triggers can prefill the form
(e.g. club/part contact buttons pass a `topic` and `message`).

**Nav duplication.** Every page hand-writes the same header/footer with a desktop
nav and a mobile panel. The current page is marked with `aria-current="page"`.
When changing navigation, update all pages consistently.

## Design system

`stitch_seoul_gugak_union_web/traditional_contemporary_union/DESIGN.md` is the
canonical brand/design spec ("Breathing Tradition" — Hanji paper texture, Obangsaek
palette, serif headlines). The live CSS variables in `styles.css` (`--paper`,
`--gold`, `--green`, etc.) implement it. `stitch_seoul_gugak_union_web/_1.._4/` hold
original Stitch design mockups (`code.html` + `screen.png`) for reference only —
they are not part of the served site.
