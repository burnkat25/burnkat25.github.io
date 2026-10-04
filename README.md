# Bernard Katada — Portfolio

Static portfolio site. No build step, no dependencies — open `index.html` or serve the folder.

```bash
python -m http.server 8000    # then http://localhost:8000
```

## Design source

The theme is adapted from the Figma community file `897605510384968096` —
[Portfolio](https://www.figma.com/community/file/897605510384968096) by Tomasz Gajda.

What was taken from it:

| Trait | How it's implemented |
|---|---|
| Monochrome palette | `#E4E4E4` light panel, `#000` black panel, `#FFF`, one mid grey `#9A9A9A`. No colour anywhere except the portrait itself |
| Diagonal split hero | The black panel and the portrait are both clipped by `polygon(var(--slant-top) 0, 100% 0, 100% 100%, var(--slant-bot) 100%)` — 49% at the top, 41% at the bottom, so the panel widens downward exactly like the reference |
| Photograph bleeding into the black | The portrait is anchored bottom-right at 62% of the hero width, so its left edge falls *behind* the diagonal and the clip does the cutting. No cut-out image needed |
| Heavy grotesque display type | Inter, weights up to 900, with tight negative tracking (`-.045em` on the name) |
| Square icon tiles | 56px rounded squares with filled brand marks |
| Inverting nav | White text + white pill over the black hero half; flips to black text on a light bar once scrolled |

The reference file is only a hero screen, so the Projects / About / Skills / Footer sections
are original — but they carry the same monochrome palette, diagonal motif, and type scale.

## Files

| File | Purpose |
|---|---|
| `index.html` | All markup. Sections in order: Hero → Portfolio → About → Skills → Contact |
| `styles.css` | Design tokens under `:root` at the top, then one block per section |
| `script.js` | Scroll reveals, nav invert-on-scroll, footer year. Optional — page works without it |
| `assets/bernard-portrait.webp` | Portrait, 1100×1467. Used in both the hero and the About column |
| `assets/og-cover.jpg` | 1200×630 social preview image |
| `assets/bernard-portrait.jpg` | The original upload, kept as the master. Not referenced by the page |

## Things to replace before publishing

1. **Project thumbnails.** Each `.card__thumb` is decorative CSS art — a diagonal band drawn
   from the inline `--band` custom property on each card, plus an outlined index numeral. It is
   not a screenshot and doesn't pretend to be one. To use a real image, drop it in `assets/` and
   set it as the thumb's `background-image` (there's a `TODO` comment in the first card).
2. **Project claims.** Every figure is drawn from your résumé, but the framing is ours — check
   that the CRM card under "Role — Data Manager" and the Permit-to-Work card under Daelim
   reflect what you actually did.
3. **Email.** Primary contact is `burn.katada88@gmail.com`; `bernard.katada@yahoo.com` and
   `+63 967 367 4887` are the secondary lines. Swap the `mailto:` targets to lead with Yahoo
   if you prefer.
4. **Dribbble.** Not included, because there's no profile to link. The reference design has
   three social tiles; this has four (email, GitHub, LinkedIn, personal site). Add a fifth
   `<li>` in the `.tiles` list in the footer once a Dribbble account exists.
5. **Fonts.** Inter is loaded from Google Fonts. Self-host it if you want zero third-party
   requests.

## Deploying

Plain static files, so GitHub Pages works as-is: push to `burnkat25.github.io`, or enable Pages
on any repo with the root as the source. `index.html` must stay at the root.

## Verified

Checked in headless Chrome at 1440px and at 497px (the narrowest window Chrome will render):
no horizontal overflow at any width, the hero split collapses to a stacked layout with the
diagonal preserved as a slanted top edge, and the project grid drops to a single column. Reveal
animations are disabled automatically under `prefers-reduced-motion`, and all content stays
visible with JavaScript off.
