# Date My Friend — Victor Ng Edition

A "date me" style landing page for Victor Ng, built in the visual language of
modern dating apps (Tinder/Hinge/Bumble): swipe-card layout, warm gradients,
prompt-style bio sections, and a few playful animations.

## What's in here

| File | Purpose |
|---|---|
| `index.html` | The actual profile page. Single self-contained HTML/CSS/JS file — just open it in a browser. |
| `questionnaire.md` | Send this to Victor. He fills in his real info, sends it back, and it gets swapped into `index.html`. |
| `TODO.md` | Running task list for this project. |
| `README.md` | This file. |

## Current status

Everything in `index.html` right now is **placeholder data** (marked clearly
in `questionnaire.md` too) so the page has something real to look at before
Victor's actual answers come back. Swap it out once he returns the filled
questionnaire — see `TODO.md`.

## How to preview

Just open `index.html` in any browser (double-click it, or `open index.html` /
`start index.html` depending on OS). No build step, no dependencies — it's
plain HTML/CSS/JS with Google Fonts loaded from a CDN link.

## Design notes

- **Fonts:** "Pacifico" (script logo/wordmark, like Bumble/Tinder-style
  branding), "Poppins" (headings, prompt labels), "Inter" (body copy).
- **Palette:** warm sunset gradient (coral → pink → orange), inspired by
  Tinder/Bumble/Hinge's general "warm, energetic, approachable" tone.
- **Layout:** single swipeable profile card with Hinge-style prompt sections,
  interest pills, animated background blobs, floating heart particles, and a
  like/nope button row with tap animations.
