# Developer portfolio redesign

The split entry is restored byte-for-byte from original main commit `ac0331b`. Its HTML, stylesheet, and script are unchanged in this PR. The redesign applies only to the developer page. The photography page is unchanged.

## Direction

Taste Skill v2 direction: **The name as a monument**, seed **1446725174**. Selected from the three dealt directions because Jake's name can connect the developer identity and the existing creator identity. The original black/red developer and blue creator palette is retained. Dealt family: TikTok Sans. No redraws. No scroll scenes were dealt; the uploaded package lacks the optional scenes library.

Idea: Jake Cuenca's development and photography practice becomes two adjacent views of the same person; his name anchors the developer page while actual project interfaces supply its imagery.

Live interaction: select DAR-LTCMS, Wordspace, or Fourfold with pointer, keyboard focus, or activation to crossfade the preview. On phones, show every screenshot beside its own project; no hidden project descriptions.

Subject inventory: Jake Cuenca; Dumaguete City; DAR Negros Oriental; lead/integrator contribution; parcel records and clearance workflows; Wordspace; Fourfold; WildTrace; photography and filmmaking; ACCLAIMED; BSIT; existing creator portfolio.

Argument: introduce Jake and his development work; show specific projects and contributions; explain his visual and system background with a portrait and toolkit; retain education/leadership/credentials as expandable records; offer email and repository contact.

## Implementation

- One directly linked developer stylesheet and one enhancement script replace the runtime chain of content rewrites and stylesheet injection.
- Main content, project links, all seven certificates, verification links, and résumé links are authored in HTML.
- Retain normal navigation without blocking loaders, custom cursor replacement, or scroll interception.
- Shared page margins, substantial heading weight, solid text, restrained red actions, real screenshots, and an inverted name footer.
- Native `details` records; direct credentials and résumé hashes open the corresponding disclosure.
- Keep legacy refinement files for history, but no longer load them from the developer page.
- Update obsolete fourth-year copy to the graduation information supplied in conversation.

## Checks

| Check | Result |
| --- | --- |
| Taste source lint, original developer HTML/CSS/JS | 78 FAIL, 18 WARN |
| Taste source lint, final six entry/developer files | 0 FAIL, 0 WARN |
| JavaScript syntax, both active scripts | Pass |
| Local links/assets, entry | 9 checked; pass |
| Local links/assets, developer | 50 checked; pass |
| Duplicate IDs, one H1, image alt attributes, local anchors | Pass |
| `git diff --check` | Pass |
| Browser desktop/tablet/phone review | Rendered in 1440/768/390px review frames; no document horizontal overflow in measured developer views |
| Project preview activation | Wordspace click and Fourfold keyboard Enter checked; labels and pressed state updated |
| Entry destinations | Creator click reaches photography page; Developer keyboard Enter reaches developer page |
| Credentials and leadership | Direct certificate hash opens disclosure; leadership disclosure opens with its content |
| Phone selector footer | Overlap discovered and fixed; inspected after fix |

Classic scrollbars reduce the frame's available document width by 15px in this browser. These are responsive layout checks using browser frames, not device emulation.

The bundled `inspect.mjs` was attempted but cannot run: no local Chrome/Edge/Chromium executable. Browser screenshots and DOM measurements were used instead. No claim of a full automated inspector pass, automated motion count, reduced-motion emulation, or complete before/after screenshot comparison is made. Reduced-motion and no-script behavior were checked in source. No new runtime dependencies.

## Assets and limits

All developer screenshots and portraits are existing repository assets. Existing project screenshots and the résumé PDF may need a future content refresh. No stock or generated imagery was added.

The initial entry redesign and its screenshot were removed at the user’s request. The entry HTML, CSS, and JavaScript match the original main commit byte-for-byte. All entry-specific initial review findings are superseded by that restoration; no entry redesign is included.
