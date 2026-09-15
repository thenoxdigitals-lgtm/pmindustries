# PM Industries

Complete Next.js App Router website for PM Industries, Solapur. Signature Industrial design: graphite, porcelain and copper, wide layouts, editorial type, restrained motion and product-led photography.

## Run locally

Requires Node.js 20.9 or newer (Node 22 LTS recommended).

```bash
npm install
cp .env.example .env.local
npm run dev
```

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm ci` uses the committed lockfile for reproducible installations. Do not commit `.env.local` or real webhook credentials.

## Owner setup before launch

1. Add the **actual supplied company logo** to `public/logo.png`. The artwork must include the existing company name. No replacement logo is generated. Until it exists, the server omits the image so there is no broken image request. Add the file and rebuild.
2. Configure the Google Sheet and Apps Script below, then add the two private environment variables to the hosting project and redeploy.
3. Review the product imagery against the supplied products and resolve the technical items in `docs/content-audit.md`. Recreated product images are presentation assets, not installation diagrams.
4. Verify a real enquiry reaches the private spreadsheet before directing customers to the form. Without configuration, the form reports an honest error and provides phone/email alternatives.
5. Import this existing repository into Vercel, select Next.js, use the repository root and the default `npm run build` command. Add the production domain. This task commits code; it does not change DNS or publish the site.

### Logo sizing

`src/components/layout/logo.tsx` uses Next Image and `/logo.png`, with `object-fit: contain`, automatic width/height and maximum dimensions of 260 × 56 px on desktop and 195 × 43 px on small screens. The full image is visible; no artwork is cropped or recolored. Footer placement uses a light panel for readability. If the supplied logo has transparent padding, trim only that padding in the original asset or adjust the limits after inspecting it. Final optical sizing needs the actual file; none was present at implementation time.

## Google Sheets Contact Form Setup

The browser submits to `POST /api/contact`. The server validates and forwards a JSON request to Google Apps Script, which appends a row to your private Sheet. A normal spreadsheet sharing link **will not work** as the webhook URL.

### 1. Create the Google Sheet

Create a blank spreadsheet. Rename the worksheet tab to **Enquiries**. In row 1, add these headings exactly, from A to J:

```text
Timestamp | Name | Company | Phone | Email | Product | Voltage Class | Requirement | Source Page | Status
```

Each heading belongs in a separate cell. New rows use **New** as their Status. The script adds an internal **Request ID** in column K and hides that column to prevent duplicate entries on retries. Keep column K reserved; do not delete or reuse it.

Keep the spreadsheet private. Share it only with the people who should handle enquiries.

### 2. Add the Apps Script

Open **Extensions → Apps Script**. Replace the contents of `Code.gs` with the complete code in [`docs/google-apps-script.gs`](docs/google-apps-script.gs).

In **Project Settings → Script properties**, add:

| Property         | Value                                                                              |
| ---------------- | ---------------------------------------------------------------------------------- |
| `SPREADSHEET_ID` | The ID between `/d/` and `/edit` in your spreadsheet URL                           |
| `WEBHOOK_SECRET` | A long random secret; use the same value in the website environment variable below |
| `SHEET_NAME`     | `Enquiries` (optional when using this tab name)                                    |

Generate a secret locally with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep this secret private. The implementation requires it to protect the public Apps Script endpoint from unauthorized writes.

### 3. Deploy the Web App

Click **Deploy → New deployment**, select **Web app**, choose **Execute as: Me** and **Who has access: Anyone**. Authorize the script with the account that owns the Sheet. If your Workspace organization does not allow anonymous web apps, ask its administrator to enable an appropriate deployment or use a different permitted backend; do not make the Sheet public.

Copy the deployed Web App URL ending in **`/exec`**. Do not use the `/dev` testing URL, editor link or Sheet sharing link.

Official references: [Web apps](https://developers.google.com/apps-script/guides/web), [Content Service](https://developers.google.com/apps-script/guides/content). Content Service uses a redirect; the server follows that redirect.

### 4. Set the website variables

In `.env.local` for local use, or **Vercel → Project → Settings → Environment Variables** for hosting:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=YOUR_PRIVATE_RANDOM_SECRET
```

Enable the appropriate Production/Preview environments and redeploy. Use a separate test Sheet for Preview deployments if you do not want test enquiries in your production Sheet. Never prefix these values with `NEXT_PUBLIC_`.

### 5. Verify delivery

Submit a clearly labeled test enquiry through Contact or Request a Quote. Confirm a new row with timestamp and **New** status. The UI only shows success when Apps Script returns `{ "ok": true }` after appending the row. Check the product field is preselected when entering from a product page.

If receipt cannot be confirmed, check the script properties, exact worksheet name/headings, deployment permissions and `/exec` URL. Visitors see a short useful message, not private service errors. After modifying Apps Script code, use **Deploy → Manage deployments → Edit → New version → Deploy** to update the existing URL.

### Spam and data protection

- Client and server field validation, body size limit, honeypot, same-origin checks, timeout and five requests per IP per ten minutes per running server instance.
- The local rate limit resets on cold starts and is not shared across Vercel instances. Add an edge/WAF rate-limit rule for `/api/contact` on the host for stronger distributed protection. Forwarded IP headers are trusted only behind a host that overwrites them.
- Apps Script authenticates the secret, validates again and applies a shared cap of 100 accepted enquiries per ten minutes. Tune only for actual traffic needs.
- Apps Script uses a lock and persistent request IDs to prevent duplicate rows on retries. It writes visitor data as literal text, protecting against spreadsheet formula injection. Keep the hidden Request ID column intact.
- The timestamp comes from the web server. Raw webhook responses, secrets and enquiry bodies are not logged by this code.
- The contact page includes email, phone, directions and a restrained WhatsApp link. No WhatsApp messages are sent automatically.

## Pages and content

- `/` — company positioning, primary products, heat shrink expertise and technical support pathways.
- `/products` — searchable, filterable directory of eleven product families.
- `/products/heat-shrinkable-termination-kit`
- `/products/heat-shrinkable-straight-joint`
- `/products/polymer-insulator`
- `/products/anti-tracking-cable-breakout`
- `/products/lv-cable-breakout`
- `/products/busbar-insulation-tubing`
- `/products/creepage-extension-shed`
- `/products/right-angle-boot`
- `/products/straight-boot`
- `/products/heat-shrinkable-end-cap`
- `/products/busbar-insulation-tape`
- `/company`, `/company/manufacturing`, `/company/quality`, `/company/team`, `/company/jointer-training`
- `/technology/heat-shrink`
- `/resources`, `/resources/ordering-information`, `/resources/downloads`
- `/contact`, `/request-quote`, `/privacy`

Unique page metadata, canonical URLs, Open Graph/Twitter images, organization/product/breadcrumb structured data, `/sitemap.xml`, `/robots.txt`, a custom 404 and permanent legacy redirects are included. No fake reviews, prices, certifications, customer logos or downloadable documents are added.

## Maintain the website

- `src/data/company.ts`: company name, address and contact details, canonical production URL.
- `src/data/products.ts`: catalog descriptions, features and supported specifications.
- `src/data/legacy-tables.json`: published reference schedules, deliberately retaining unverified discrepancies.
- `src/data/editorial.ts`: company, technology, resources and privacy content.
- `src/app/globals.css`: design tokens and responsive layouts. Images and font assets are local; no remote image host is required.
- `public/images/products`: optimized recreated product presentation images.
- `public/images/technical`: original dimensional tables preserved for fidelity.
- `next.config.ts`: permanent legacy URL mappings and response headers.
- `docs/content-audit.md`: source mapping, preservation decisions and owner confirmation items.

Server Components render the public pages. Client code is limited to navigation, catalog controls and the enquiry form. Lightweight CSS handles motion and respects reduced-motion preferences; no animation dependency is needed for these effects. No database, ecommerce checkout or user account system is introduced.
