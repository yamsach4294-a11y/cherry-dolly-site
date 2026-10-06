# Cherry Dolly placeholder artwork

These original SVG illustrations are local, transparent, self-contained fallbacks. They use gradients, soft shadows, paper folds, frosting ridges, and retro packaging details; no remote images or font requests are needed.

- Cupcakes: `viewBox="0 0 600 700"` (both whole and bite variants share identical framing).
- Boxes: `viewBox="0 0 1000 760"`.
- Bite variants visibly remove part of the right side and reveal a crumb cross-section.

The application uses the corresponding primary PNG paths in `/public/images/`, falling back to this directory if those images are missing:

| Final PNG | Placeholder |
| --- | --- |
| `hero-box.png` | `placeholders/hero-box.svg` |
| `packaging-box.png` | `placeholders/packaging-box.svg` |
| `cupcake-vanilla.png` | `placeholders/cupcake-vanilla.svg` |
| `cupcake-strawberry.png` | `placeholders/cupcake-strawberry.svg` |
| `cupcake-lemon.png` | `placeholders/cupcake-lemon.svg` |
| `cupcake-chocolate.png` | `placeholders/cupcake-chocolate.svg` |
| `cupcake-bite-vanilla.png` | `placeholders/cupcake-bite-vanilla.svg` |
| `cupcake-bite-strawberry.png` | `placeholders/cupcake-bite-strawberry.svg` |
| `cupcake-bite-lemon.png` | `placeholders/cupcake-bite-lemon.svg` |
| `cupcake-bite-chocolate.png` | `placeholders/cupcake-bite-chocolate.svg` |

Keep replacement product photography on a transparent background, with generous canvas padding. Whole and bitten cupcake variants should have the same aspect ratio, camera angle, scale, and crop so the immediate interaction remains stable. Brand page headings and copy remain HTML; lettering on the box is part of the packaging illustration.
