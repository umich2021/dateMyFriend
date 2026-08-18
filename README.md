# Date My Friend — Victor Ng Edition

A "date me" site for Victor Ng: a museum-exhibition-style walkthrough,
`scroll-snap` "rooms" you scroll or click through via a roman-numeral floor
directory.

(Two other formats — a Tinder-style swipe card and a long-form "date me doc"
— were built and compared side by side before this one was picked. See git
history if you ever want to look at those again.)

## Structure

Served at `projects.jimsonyang.com/datemyfriend/victor/` — everything below
lives under `datemyfriend/victor/` in this repo so the URL path matches.

```
CNAME                     ← GitHub Pages custom domain: projects.jimsonyang.com
questionnaire.md          ← send this to Victor to get his real answers
TODO.md
README.md
datemyfriend/victor/      ← everything below is served at /datemyfriend/victor/
  index.html               ← the site: one page, six full-viewport "rooms"
  assets/style.css, assets/app.js
  data/
    victor-data.js          ← the "database" — all content, photo paths, and section visibility flags
  photos/                  ← drop real image files here (see photos/README.md)
  admin/
    index.html               ← toggle panel — turn any section on/off (not linked from the public site — open it directly)
```

## The rooms

- **Entrance** — an exhibition title wall (name, "A Retrospective, In Six
  Rooms," basics as small tracked metadata)
- **Room I — Self-Portrait** — About, laid out as an asymmetric magazine
  spread: a squared portrait plate beside wall text with a drop cap, and
  the usual stats reframed as object metadata (Medium, Origin, Dimensions)
- **Room II — The Collection** — photos as a horizontal filmstrip you
  scroll past, each plate numbered ("Plate III")
- **Room III — Studies in Contrast** — green/red flags merged into one
  mixed list, each item with a thin green/red left border
- **Room IV — The Sitter's Brief** — Ideal Type reframed as a curator's
  statement (a large pull-quote), with dealbreakers/relationship
  type/love language as "Terms of Acquisition" and Values as a "Condition
  Report"
- **Room V — Correspondence** — friend reviews as postcards in a grid,
  FAQ as an exhibition guide pamphlet below
- **Room VI — Visitor's Book** — Contact, as ledger lines to "sign"

A room is skipped entirely if its content is turned off in the admin panel.

## How to preview

Open `datemyfriend/victor/index.html` directly in a browser — no build
step, no server needed.

Open `datemyfriend/victor/admin/index.html` directly (bookmark it — it's
intentionally not linked from the public site) to turn sections on/off.

## The "database"

`data/victor-data.js` is a plain JS file (not JSON) that sets
`window.VictorDB` — a `.js` file was used instead of a `.json` file fetched
over `fetch()` because browsers block `fetch()` of local files opened via
`file://`, but a `<script src>` tag works fine with no server. `index.html`
and `admin/index.html` both load this file first.

It holds:
- **Content:** basics, bio, `aboutEssay`, interests, `gallery` (filmstrip
  entries — each can carry a `photo` path pointing into `../photos/`, or
  falls back to an emoji placeholder if left empty), `flags` (green + red,
  mixed in one list), ideal type (dealbreakers, relationship type, love
  language), values (each entry carries an `emoji`), FAQ, friend reviews,
  contact info — all placeholder for now, and none of it flagged as such
  on the page itself (see *Current status* below).
- **Photos:** `portrait` (top level, the Self-Portrait plate) and `photo`
  on any `gallery` entry — see `photos/README.md` for the convention.
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

Everything is still placeholder content — but the page itself doesn't say
so anywhere. Earlier drafts had visible "🚧 placeholder" banners; those were
dev/internal notes and have been removed, since a page meant to be shown to
someone shouldn't announce that it's a draft. The fake contact info
(`(555) 010-1234`, `victor.ng@example.com`) is still deliberately
non-functional — reserved formats, not real destinations.

That means: **don't share the link with anyone yet.** The data is still
made up. Swap `data/victor-data.js` for Victor's real answers once
`questionnaire.md` comes back, and drop real photos into `photos/` — see
`TODO.md`.

## Design notes

White walls, one museum-red accent, "Bodoni Moda" display italic, "Space
Grotesk" wall labels, roman numerals throughout, `scroll-snap` rooms with a
floor-directory nav, a horizontal filmstrip for photos, and everything
reframed in curator/exhibition language (plaques, plates, provenance). No
style switcher — the whole site *is* the style.
