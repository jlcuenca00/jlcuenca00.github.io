# Jake Cuenca Portfolio

Static HTML, CSS, and JavaScript portfolio, published with GitHub Pages.

The diagonal entry page preserves two destinations:

- **Developer:** selected projects, background, toolkit, education, leadership, credentials, résumé, and contact.
- **Creator:** the existing photography and filmmaking portfolio.

## Developer page

The Taste Skill v2 redesign uses a bold name-led composition, one type family (TikTok Sans), real project screenshots, and a dark palette with a red action accent. Project selection crossfades the desktop preview; phones show an image beside every project. All project descriptions, certificate links, and résumé links are in the HTML. Native details elements hold the longer records.

Active entry files: `index.html`, `landing-style.css`, `landing-script.js`.
Active developer files: `developer/index.html`, `developer/style.css`, `developer/script.js`.

Earlier developer refinement styles/scripts remain in version control for reference but are no longer loaded by the developer page. The creator page and its dependencies are unchanged.

## Accessibility and behavior

- Ordinary links work without JavaScript.
- Content is visible before enhancement; no blocking loader or hidden reveal states.
- Keyboard project selection and visible focus styles.
- Native expandable records and direct credential/résumé anchor support.
- Responsive composition and reduced-motion support.
- No build step or added runtime dependency.

## Local preview

Serve the repository root with a static HTTP server. Open `/index.html` for the selector and `/developer/index.html` for the developer page.

## Verification

See `docs/taste-v2-review.md` for scope, direction, checks, and verification limits.
