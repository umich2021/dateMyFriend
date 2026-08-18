# TODO

## Now
- [ ] **Don't share the site link with anyone yet** — every visible
      "placeholder/draft" banner has been removed from the page, which
      means there's no on-page warning anymore that the content is fake.
      It still is, until this section is done.
- [ ] Send `questionnaire.md` to Victor
- [ ] **Get real photos from Victor — this is the single highest-impact
      item, above any copy.** Drop them into `photos/` and point to them
      from `data/victor-data.js` (`portrait` + each `gallery` entry's
      `photo` field — see `photos/README.md`). See the photo checklist at
      the top of `questionnaire.md`.
- [ ] Swap placeholder content in `data/victor-data.js` for Victor's real
      answers once questionnaire comes back
- [ ] Get Victor's real email/phone (or confirm he wants message-only, no
      phone) for `data/victor-data.js`'s `contact` object — currently
      fake-formatted placeholders (`555` number, `@example.com`)

## Content
- [x] **Decided: gallery/exhibition format is the site.** The Tinder-card
      and "date me doc" formats that were built alongside it for
      comparison are gone — see git history if needed.
- [ ] Replace placeholder basics (name/age/location/job/school/height)
- [ ] Replace placeholder bio + `aboutEssay`
- [ ] Replace placeholder interest tags
- [ ] Replace placeholder `flags` list (green + red, mixed together as
      one list)
- [ ] Replace placeholder ideal-type summary, tags, dealbreakers,
      relationship type, and love language
- [ ] Replace placeholder Values entries (direction, family, how he shows
      up, strengths)
- [ ] Replace placeholder FAQ questions/answers
- [ ] Replace placeholder friend reviews with real ones from real friends
      (need their okay to quote them)
- [ ] Add real photos (need at least 1, ideally 3-5) — see the "Now"
      item above
- [ ] Double check nothing overly private goes on a page that might get
      shared/screenshotted
- [ ] Ask Victor whether he wants `schedulingEnabled` turned on (a direct
      "book a time" link) — defaults to off; see the reasoning in
      `data/victor-data.js` and `questionnaire.md` section 11

## Admin panel
- [ ] Current admin panel (`admin/index.html`) only stores toggles in this
      browser's `localStorage` — fine for Victor previewing on his own
      machine, but won't persist across browsers/devices or survive
      clearing site data.
- [ ] If Victor wants his toggle choices to be permanent defaults, use the
      "Export settings as JSON" button and send the result back so it can
      be baked into `data/victor-data.js`'s `visibility` object directly.
- [ ] Longer term, if this needs to be editable by Victor without going
      through me: would need a small backend (or something like a Google
      Form → sheet → static rebuild) since static local files can't persist
      writes on their own.

## Polish (later)
- [ ] Multi-photo carousel if we get more than one photo
- [ ] Dark mode toggle
- [ ] Consider publishing as a private Artifact link vs. hosting somewhere
      (Netlify/Vercel/GitHub Pages) once content is finalized — note: Google
      Fonts CDN links won't load inside a sandboxed Artifact preview, so
      that would need adjusting first

## Done
- [x] Project scaffold: README, TODO, questionnaire, baseline page
- [x] Restructured into `card/` and `personal/` site folders with real
      separate pages per section (not anchors) + shared `data/victor-data.js`
- [x] Added Green Flags, Red Flags (later merged into one Flags section),
      Ideal Type, and Friends Say sections to both site versions
- [x] Added `admin/` toggle panel to show/hide sections on both sites
- [x] Researched dating-profile best practices and, after a course
      correction, "date me doc" / friend-vouched matchmaking research —
      repositioned `personal/` as the primary site, `card/` as secondary
- [x] Added Values, FAQ, and Contact pages; expanded Ideal Type with
      dealbreakers, relationship type, and love language; surfaced a friend
      quote on the `personal/` homepage
- [x] Added `schedulingEnabled` (default off) so self-serve booking doesn't
      bypass Victor being able to screen people first
- [x] Removed the Prompts page from `personal/` (kept on `card/`) and
      folded that content into a longer-form `aboutEssay` instead
- [x] Added a live style switcher: 5 full styles on `personal/`
      (incl. an animated kawaii mascot), 3 color palettes on `card/`
- [x] Merged Green Flags + Red Flags into one mixed `flags.html`/Flags
      page on both sites
- [x] Added a "Swipe Right" style to `personal/`'s switcher — Pacifico
      script font, floating hearts, emoji flourishes, i.e. card/'s actual
      DNA ported into the long-form layout
- [x] Removed all visible "placeholder/draft" banners, the `questionnaire.md`
      mentions, and the public admin-panel links from both sites — see the
      "Now" warning above, since this also removed the on-page disclosure
      that the content is fake
- [x] Added a Photos section to `personal/`'s homepage — 6 labeled
      placeholder tiles instead of just the one avatar circle
- [x] Added "Window Mode" to `personal/`'s style switcher — technical
      product-site feel (PostHog-esque): bordered "window" panels with
      traffic-light dots, hard offset shadows, dot-grid background,
      scanline overlay, chunky press-down buttons
- [x] Gave Kawaii more going on — added a bunny character (bottom-left)
      and a floating sticker cluster (🌸⭐️🐾✨) alongside the original
      waving mascot, so it doesn't feel empty
- [x] **Bug fix:** `card/` and `personal/` were saving style choice to two
      separate `localStorage` keys — unified to one shared key/vocabulary
      (6 styles on both sites) so the choice now carries across formats
- [x] Rebuilt Window Mode as an actual layout/interaction change, not a
      color-and-font re-skin: `personal/`'s homepage sections become
      separate clickable/collapsible windows you can bring to front; every
      other page (both sites) wraps its content in one matching window
- [x] Gave Ideal Type and Values real photo tiles (both sites for Ideal
      Type; `personal/` for Values, one icon-tile per entry) — they were
      pure text blocks before
- [x] Made Kawaii much more extreme: bigger/bouncier mascot and bunny, 7
      stickers instead of 4, and restored + upgraded the floating
      background emoji layer (`kawaii-rain` — 8 emoji types, faster spawn,
      bigger, spin+scale as they rise) so it's an actual background effect
      again, not just corner decoration
- [x] Replaced Minimal Mono with a "Gallery" style in `personal/`'s
      switcher — turned out to still just be a reskin (CSS counters +
      colors on the same page skeleton), which wasn't the ask
- [x] Reverted that — pulled the Gallery/museum theme entirely back out of
      the `card/`/`personal/` switcher (now 5 styles again)
- [x] Built `gallery/` instead: a genuinely separate third site, not a
      switcher option — one page, six full-viewport `scroll-snap` "rooms"
      (Self-Portrait, The Collection, Studies in Contrast, The Sitter's
      Brief, Correspondence, Visitor's Book) with a roman-numeral floor
      directory, a horizontal photo filmstrip, and curator/exhibition
      language throughout. Reads the same `data/victor-data.js` and
      respects the same admin-panel visibility toggles as the other two
- [x] Locked `personal/index.html` to Window Mode permanently (first of
      the style decisions) — `initChrome()` now takes an optional
      `{ lockedTheme }` so a page can hard-set its style without writing
      to the shared `localStorage` key or showing the switcher
- [x] Added a "Character Select" placeholder to the Ideal Type pages on
      both `card/` and `personal/` — a video-game-style "?" silhouette
      with a "PLAYER 2 — Not yet unlocked" tag (`personal/` also shows the
      ideal-type tags as a little stat readout), replacing the old
      emoji/photo tile. This is intentionally permanent, not a stand-in —
      see the note in Content above
