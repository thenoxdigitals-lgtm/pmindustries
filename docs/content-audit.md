# Content migration and owner review

Source: https://www.pmindustriessolapur.com/ — inspected 14 September 2026. Both rendered pages and raw HTML links were examined. Navigation, footer links, previously hidden product navigation, tab content, tables and image resources were followed. Initial snapshots are in `source/`, extracted metadata in `source-inventory.json`; the final recrawl is in `final-crawl.json`.

## Migration map

All `.html` mappings below use permanent HTTP 308 redirects in `next.config.ts`. The homepage root stays `/`.

| Legacy URL                                   | New destination / preservation decision                                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `/`, `/index.html`                           | `/`; company positioning, manufacturing since 2011, heat shrink technology, innovation and enquiry links preserved            |
| `/about.html`                                | `/company`; full content deliberately split into company, manufacturing, quality and jointer-training pages                   |
| `/team.html`                                 | `/company/team`; expertise preserved, no invented employee names or portraits                                                 |
| `/ourteam.html`                              | `/company/team`; broken old footer link repaired (source returned 404)                                                        |
| `/product.html`                              | `/products`; older product overview and deeper product navigation incorporated                                                |
| `/termination-kit.html`                      | `/products/heat-shrinkable-termination-kit`; all 11 tables, variants, tail lengths, accessories and rain-shed notes retained  |
| `/straight-join.html`                        | `/products/heat-shrinkable-straight-joint`; all 11 tables and four cable-construction variants retained                       |
| `/polymer-insulator.html`                    | `/products/polymer-insulator`; material, construction, fitting variants and three original voltage schedules retained         |
| `/anti-tracking-cable.html`                  | `/products/anti-tracking-cable-breakout`; features and original size-reference image retained                                 |
| `/two-three-four-way.html`                   | `/products/lv-cable-breakout`; configurations and original size-reference image retained                                      |
| `/busbar-insulation-tubing.html`             | `/products/busbar-insulation-tubing`; material, colors, application and original size-reference image retained                |
| `/creepage-extension-shed.html`              | `/products/creepage-extension-shed`; purpose and original size-reference image retained                                       |
| `/right-angle-boot.html`                     | `/products/right-angle-boot`; hidden product found through old product navigation; dimensional reference preserved            |
| `/straight-boot.html`                        | `/products/straight-boot`; hidden product found through old product navigation; dimensional reference preserved               |
| `/3-core-insulated-cable.html`               | `/products/heat-shrinkable-termination-kit`; source 404, meaningful replacement variant exists                                |
| `/single-core-insulated-cable.html`          | `/products/heat-shrinkable-termination-kit`; source 404, meaningful replacement variant exists                                |
| `/3-core-paper-insulated-lead.html`          | `/products/heat-shrinkable-termination-kit`; termination schedule merged; corresponding joint schedule on straight-joint page |
| `/low-voltage-termination.html`              | `/products/heat-shrinkable-termination-kit`; low voltage schedule merged                                                      |
| `/join-sutaible-for-PVC-XLPE-EPR-cable.html` | `/products/heat-shrinkable-straight-joint`; low voltage joint schedule merged                                                 |
| `/joint-sutaible-for-XLPE-PILC-cable.html`   | `/products/heat-shrinkable-straight-joint`; all four reference tables retained in an explicitly qualified XLPE/PILC section   |
| `/contact.html`                              | `/contact`; address, phone and both primary emails verified and centralized                                                   |

`end-cap.html` and `busbar-insulation-tape.html` appear inside commented-out homepage markup. The final crawl confirmed both return real content. They are preserved as `/products/heat-shrinkable-end-cap` and `/products/busbar-insulation-tape`, with permanent redirects, source dimensional references and current-availability qualification. Their legacy template text includes unrelated brands and inconsistent product names; unconfirmed ratings are withheld. The old `robots.txt` and `sitemap.xml` are also checked in the final crawl; new versions are generated by Next.js.

The about-page tab fragments `#history`, `#vision` and `#mission` correspond to About, Jointer Training and Quality respectively. The new company page retains these fragment targets as links to the corresponding content; fragments are preserved by browsers through the path redirect.

## New useful pages

- `/company/manufacturing`: consolidates compound development, molded products and polymer insulator manufacture.
- `/company/quality`: consolidates existing quality, assurance and standard references with a route to request evidence.
- `/company/jointer-training`: promotes previously tabbed seminar, practical assessment and installation-support information to its own page.
- `/technology/heat-shrink`: expands the existing technology introduction conservatively; does not invent heating temperatures or an installation procedure.
- `/resources` and `/resources/ordering-information`: organize the real product data and enquiry requirements.
- `/resources/downloads`: honest document-request page, since no verified PDF downloads were found.
- `/request-quote`: product-aware enquiry form.
- `/privacy`: description of this website’s implemented enquiry handling; owner must keep it accurate if the workflow changes.

## Owner confirmation required

1. **Voltage wording:** source homepage/about/team use `33 KVA`, while the older product overview uses `36 KVA`. Dedicated product schedules explicitly list 11, 22 and 33 **kV**. New technical content uses only those product-specific kV schedules; the broad `33/36 KVA` claims are not silently converted or published.
2. **Termination codes:** the 11 kV single-core 150–300 mm² row repeats `PMXOS-11-120` / `PMXIS-11-120`. The low voltage termination table repeats `PMLT-1.1-*` codes in its 3.3 kV column. The 33 kV three-core 70–95 row uses a `120` suffix. Original tables are preserved as reference; no code is repaired by guessing.
3. **Straight joint codes:** several size ranges do not correspond to code suffixes (e.g. 120–185 paired with `PMXS-11-300`). Confirm the current schedules.
4. **XLPE/PILC schedule:** the page title and body alternate between joint and termination terminology. The 22 kV 120–150 row contains `PMXO-22-150`; the 33 kV 185–300 row has both `PMXO-33-300` and `PMXI-33-300` despite a single-code heading. Preserved with qualification under straight joints, not used to invent a separate specification.
5. **PILC older subpage:** its termination/joint headings appear swapped. Consolidation follows the more specific termination-kit and straight-joint schedules, with original text archived.
6. **Polymer insulator table:** one 33 kV T&C row has a missing column; mechanical strength and test-value column units are not fully specified. Do not infer missing cells or units. The raw published table remains available with a confirmation note.
7. **Standards and certificates:** source claims mention IS 13573 (2011), IEC 60502-4, IEEE 48/404, CENELEC HD 629.1/VDE 0278 and IEC 61109, but no verifiable downloadable report/certificate was found. New Quality page describes these as literature references and invites a product-specific document request; no certification badge, approval or blanket compliance claim is created.
8. **Shelf life:** source claims unlimited shelf life below/up to 50°C and service life at least equal to the cable. These are withheld pending an approved datasheet. No lifetime warranty is implied.
9. **Rain shed wording:** `High conductivity` contradicts the described insulating purpose. Omitted from public feature copy; verify the intended property.
10. **Busbar wording:** universal `corona discharge free` and vague underground-power/interconnectivity claims are not repeated without conditions or supporting documentation. Published material, colors and environmental-protection context are retained.
11. **Boots:** absolute flashover protection, export assertions and generic copied joint/termination performance paragraphs are not presented as boot-specific certification. Meaningful bushing/clearance application information is retained.
12. **Contacts:** primary details agree across homepage/contact/footer. A busbar header also contains legacy `info@pmseal.com (info@industrial.com)` template text; it is excluded in favor of the repeated current emails.
13. **Training:** confirm current availability, charges and manufacturer-authorization process. Pages state that dates and arrangements require direct confirmation.
14. **Imagery:** nine AI-recreated product presentations are based on original references. Owner should confirm visible outlet counts, shed counts, materials and geometry before launch. Cutaway joint images are illustrative presentations, not certified construction drawings. No fabricated factory/team photographs are used.
15. **Logo:** `public/logo.png` was not supplied in the repository or this attachment. The integration expects that exact path and omits the image until it exists. The actual artwork and final optical sizing remain an owner task.

## Image provenance

Images were recreated with the built-in image generation tool. Prompt pattern: technically faithful premium studio photography of the supplied real product, warm porcelain background, controlled lighting and contact shadows, full product visible, no text/logos/seals or extra components. Each prompt explicitly preserved the subject’s construction; boot prompts removed the accompanying drawing. These are presentation assets, not measuring references.

| New local asset                                      | Official reference                     |
| ---------------------------------------------------- | -------------------------------------- |
| `public/images/products/termination.webp`            | `/images/product/terminationkit_1.png` |
| `public/images/products/straight-joint.webp`         | `/images/product/joint1.png`           |
| `public/images/products/polymer-insulator.webp`      | `/images/product/00.png`               |
| `public/images/products/anti-tracking-breakout.webp` | `/images/projects/Heat_cable3.jpg`     |
| `public/images/products/lv-breakout.webp`            | `/images/projects/Heat_cable2.JPG`     |
| `public/images/products/busbar-tubing.webp`          | `/images/projects/heat_brusher.JPG`    |
| `public/images/products/rain-shed.webp`              | `/images/projects/heat_shed.JPG`       |
| `public/images/products/right-angle-boot.webp`       | `/images/projects/Pro1.JPG`            |
| `public/images/products/straight-boot.webp`          | `/images/projects/heatboot.JPG`        |

Eight original dimensional references (`p1` through `p8`) are preserved unchanged in `public/images/technical/`. Technical data is not AI-redrawn. Font files are local DM Sans and Newsreader with license texts in `public/fonts/`.

Two additional representative generated images, `public/images/products/end-cap.webp` and `public/images/products/busbar-tape.webp`, illustrate the families described on the corresponding legacy pages. Those pages use the same generic shop placeholder, so it was not reused as a product reference. Confirm the actual product appearance before launch. End-cap copy includes a third-party IKEBANA reference, 3:1 shrink ratio, 110°C continuous use and 120–135°C shrink temperature; busbar tape copy alternates HVBT/DBIT and claims up to 24 kV. These unverified product-specific claims are archived, not asserted as current PM Industries ratings.
