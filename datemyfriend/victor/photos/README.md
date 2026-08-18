# photos/

Drop real image files here (`.jpg`/`.png`/`.webp`). Then point to them from
`../data/victor-data.js`:

- `portrait` (top level) — the Self-Portrait room's main plate
- `photo` on any entry in the `gallery` array — The Collection room's filmstrip

Use a path relative to `datemyfriend/victor/`, e.g. `photos/portrait.jpg`.
Leaving a field empty (`""`) keeps the emoji/initials placeholder instead —
nothing breaks if a photo isn't ready yet.

Keep files reasonably sized (compress before adding) — this is a static
site with no image processing, so whatever you drop here is served as-is.
