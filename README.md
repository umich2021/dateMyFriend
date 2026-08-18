# Date My Friend — Victor Ng Edition

A "date me" site for Victor Ng, in **three** formats, all pulling from one
shared data file. **`personal/` is the primary site — it's built as a
"date me doc"** (see *Why a doc, not an app clone* below), **`card/` is a
lighter, secondary Tinder-style version, and `gallery/` is a standalone
art-exhibition-style walkthrough.**

## Structure

Served at `projects.jimsonyang.com/datemyfriend/victor/` — everything below
lives under `datemyfriend/victor/` in this repo so the URL path matches.

```
CNAME                    ← GitHub Pages custom domain: projects.jimsonyang.com
questionnaire.md          ← send this to Victor to get his real answers
TODO.md
README.md
datemyfriend/victor/      ← everything below is served at /datemyfriend/victor/
  data/
    victor-data.js         ← the "database" — all content + section visibility flags
  card/                    ← secondary: Tinder/Hinge/Bumble-style version (swipe card)
    index.html             ← home: profile card, like/nope/star buttons
    prompts.html, flags.html, ideal-type.html, friends.html, contact.html
    assets/style.css, assets/app.js   ← includes a palette switcher (5 color/font stories)
  personal/                ← primary: "date me doc" style (editorial one-pager per section)
    index.html             ← home: hero, long-form About essay, friend-quote teaser, photo gallery, interests, contact CTA
    flags.html, ideal-type.html, values.html, friends.html, faq.html, contact.html
    assets/style.css, assets/app.js   ← includes a style switcher (5 full style directions) + kawaii mascot
  gallery/                 ← standalone: single-page art-exhibition walkthrough
    index.html             ← one page, six full-viewport "rooms" you scroll or click through
    assets/style.css, assets/app.js
  admin/
    index.html             ← toggle panel — turn any section on/off for every site at once (not linked from any public site — open it directly)
```

Every section is its own real page on `card/`/`personal/`, not an anchor
scrolled to within one long page — linked via the nav bar on every page.
Green and red flags are merged into a single `flags.html`/Flags page (or,
on `gallery/`, "Studies in Contrast") — shown mixed together rather than
split into two lists.

## Why a doc, not an app clone

The site isn't visited the way a dating app is — someone gets sent one
specific link, by a friend, with context already. That's the "date me
doc" genre (public profile pages/documents that got popular starting
~2022, e.g. the pattern described in ["Anatomy of a Dating
Document"](https://www.lesswrong.com/posts/6yiayg5QWtWme4JN8/anatomy-of-a-dating-document)),
not the swipe-through-strangers genre a Tinder clone is built for. It also
overlaps with friend-vouched matchmaking (sites like MySingleFriend exist
specifically because a friend's testimonial is what makes a profile
credible) — which is why `friendReviews` gets surfaced prominently, not
just buried on a subpage. `personal/` leans into both: more substance per
section (Values, FAQ, a fuller Ideal Type with dealbreakers/love language)
than an app bio would ever fit. `card/` stays as the fun, lighter version
without trying to force all of that into a swipe card. `gallery/` is a
third, more experimental take — see below.

## `gallery/` — a genuinely different site, not a reskin

An earlier pass tried an art-museum "style" inside `personal/`'s switcher
— same page skeleton, just recolored and refonted. That's not what was
asked for, so it's gone. `gallery/` is a completely separate,
purpose-built site instead: **one page**, structured as six full-viewport
"rooms" (`scroll-snap`), that you walk through by scrolling or by clicking
a floor-directory of roman numerals fixed on the right edge:

- **Entrance** — an exhibition title wall (name, "A Retrospective, In Six
  Rooms," basics as small tracked metadata)
- **Room I — Self-Portrait** — About, laid out as an asymmetric magazine
  spread: a squared portrait plate beside wall text with a drop cap, and
  the usual stats reframed as object metadata (Medium, Origin, Dimensions)
- **Room II — The Collection** — the photo placeholders as a horizontal
  filmstrip you scroll past, each plate numbered ("Plate III")
- **Room III — Studies in Contrast** — the merged flags list, in two
  columns, each item with a thin green/red left border instead of a full
  color block
- **Room IV — The Sitter's Brief** — Ideal Type reframed as a curator's
  statement (a large pull-quote), with dealbreakers/relationship
  type/love language as "Terms of Acquisition" and Values as a "Condition
  Report"
- **Room V — Correspondence** — friend reviews as postcards in a grid,
  FAQ as an exhibition guide pamphlet below
- **Room VI — Visitor's Book** — Contact, as ledger lines to "sign"

It reads the same `data/victor-data.js` and respects the same admin-panel
visibility toggles as the other two sites (a room is skipped entirely if
its content is turned off) — but has its own CSS/JS
(`gallery/assets/`) and doesn't share any layout code with `card/` or
`personal/`. No style switcher here; the whole site *is* the style.

## How to preview

Open `card/index.html`, `personal/index.html`, or `gallery/index.html`
directly in a browser — no build step, no server needed.

Open `admin/index.html` directly (bookmark it — it's intentionally not
linked from any public site) to turn sections on/off. It controls all
three sites at once, since they read the same data file and the same
`localStorage` visibility settings.

## Style switcher (for trying different visual directions)

Every page on `card/` and `personal/` has a small 🎨 button, bottom-right
— click it to try a different visual style live, without touching any
code. (`gallery/` doesn't have this — it's a single fixed design.)

**First decision made: `personal/index.html` is locked to Window Mode.**
It hard-codes `data-theme="desktop"` and has no switcher — it doesn't pull
from or write to the shared `localStorage` style choice, so picking a
different style elsewhere doesn't affect it and locking it in didn't
affect anything else either. `initChrome()` in `personal/assets/app.js`
now takes an optional `{ lockedTheme: "..." }` for exactly this — any
other page can be locked the same way once its style is decided. Every
other page on `card/`/`personal/` still has the live switcher for now.

**One shared style, both sites.** The choice is saved under a single
`localStorage` key (`victorSiteTheme`) that `card/` and `personal/` both
read — pick a style on either site and it's still selected when you switch
to the other one. There are 5 styles, and both sites implement all 5 (at
whatever fidelity makes sense for their format — `personal/` gets full
layout changes for some, `card/` gets a matching palette/font at minimum):

- **Editorial** (default) — cream/terracotta, Fraunces serif, the "date me
  doc" look
- **Swipe Right** — coral/pink, "Pacifico" script headlines, floating heart
  particles drifting up the page, small emoji flourishes on headings
- **Kawaii** — pastel pink, Fredoka, and a full cast of characters: a
  waving blob mascot, a bunny peeking up from the corner, a cluster of 7
  floating stickers (🌸⭐️🐾✨🎀🧸💕), and a continuous background "rain" of
  cute emoji drifting up the whole page — not just corner decoration
- **Dark Academia** — dark warm palette, antique gold accent, Cormorant/EB
  Garamond serif, moody and literary
- **Window Mode** — an actual layout change, not just recolored text
  (inspired by technical/product sites like PostHog): on `personal/`'s
  homepage, About/Photos/Interests/Contact become separate overlapping
  "windows" with title bars (macOS-style traffic-light dots + a minimize
  button) that you can click to bring to the front or collapse — a real
  desktop metaphor, not a re-skin. Every other page (on both sites) wraps
  its content in one matching window. Plus a dot-grid background and a
  subtle scanline overlay.

None of this is a final decision — it's there so you can click through and
get a feel before settling on one direction (including whether `gallery/`
itself becomes the primary site, stays a fun alternate, or gets cut).
Once a direction's picked, I can hard-code it and remove the switcher.

## The "database"

`data/victor-data.js` is a plain JS file (not JSON) that sets
`window.VictorDB` — a `.js` file was used instead of a `.json` file fetched
over `fetch()` because browsers block `fetch()` of local files opened via
`file://`, but a `<script src>` tag works fine with no server. Every page
on all three sites loads this file first.

It holds:
- **Content:** basics, bio, a longer `aboutEssay` (used by `personal/` and
  `gallery/`), `prompts` (used by `card/` only), interests, `gallery`
  (labeled photo-tile placeholders — swap each with a real image once
  photos exist), `flags` (green + red, mixed in one list), ideal type
  (dealbreakers, relationship type, love language — deliberately no photo
  field; the Ideal Type pages show a "Character Select" video-game-style
  "?" placeholder instead, since this is someone Victor hasn't met yet —
  see `card/ideal-type.html`/`personal/ideal-type.html`), values (each
  entry carries an `emoji`), FAQ, friend reviews, contact info — all
  placeholder for now, and none of it flagged as such on the pages
  themselves (see *Current status* below).
- **Default visibility:** which sections are shown by default, including
  `schedulingEnabled` which defaults to **off** — see the comment in
  `data/victor-data.js` for why (a self-serve booking link would let
  someone lock in a date before Victor's had any chance to screen them).

The admin panel's toggles don't edit this file — they write *overrides* to
`localStorage` (key `victorSiteVisibility`) that sit on top of the defaults.
That's why the admin panel note says it's per-browser: it never touches
`victor-data.js` on disk, so if you want a toggle change to become the
permanent default, use the "Export settings as JSON" button in the admin
panel and hand me the result to bake into `data/victor-data.js`.

## Current status

Everything is still placeholder content — but the pages themselves don't
say so anywhere. Earlier drafts had visible "🚧 placeholder" banners and
references to `questionnaire.md`; those were dev/internal notes and have
been removed from every public-facing page, since a page meant to be shown
to someone shouldn't announce that it's a draft. The fake contact info
(`(555) 010-1234`, `victor.ng@example.com`) is still deliberately
non-functional — reserved formats, not real destinations — just without a
banner calling that out on-page.

That means: **don't share any of the three links with anyone yet.** The
data is still made up. Swap `data/victor-data.js` for Victor's real
answers once `questionnaire.md` comes back — see `TODO.md`.

## Design notes

**Card version** (`card/`) — Tinder/Bumble/Hinge language: warm coral →
pink → orange gradient, "Pacifico" script logo, "Poppins" headings, "Inter"
body, floating heart particles, animated background blobs, card tilt on
hover, like/nope/super-like buttons with burst animations.

**Personal version** (`personal/`) — editorial one-pager-per-section
language: cream background, single terracotta accent, "Fraunces" serif
display type, "Space Grotesk" nav/labels, "Inter" body, custom lagging
cursor, scroll progress bar, scroll-triggered reveal animations,
auto-scrolling interests marquee, magnetic contact button. No dedicated
Prompts page — Hinge-style Q&A cards read as app-shaped, and someone
spends real time on a site (not a two-second swipe), so the same personal
details live in `aboutEssay` as actual prose instead.

**Gallery version** (`gallery/`) — see the dedicated section above; gallery
white walls, one museum-red accent, "Bodoni Moda" display italic, "Space
Grotesk" wall labels, roman numerals throughout, `scroll-snap` rooms with
a floor-directory nav, a horizontal filmstrip for photos, and everything
reframed in curator/exhibition language (plaques, plates, provenance).
