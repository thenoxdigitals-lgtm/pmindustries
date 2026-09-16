import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import { company } from "@/data/company";
import {
  Breadcrumbs,
  Eyebrow,
  Button,
  Photo,
  CallToAction,
  JsonLd,
} from "@/components/ui";
import { TechnicalTables } from "@/components/products/technical-tables";
import { metadata as seo } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProduct((await params).slug);
  return p ? seo(p.name, p.summary, "/products/" + p.slug, p.image) : {};
}
const sizeSheets: Record<string, string> = {
  "heat-shrinkable-end-cap": "p6",
  "busbar-insulation-tape": "p7",
  "anti-tracking-cable-breakout": "p1",
  "lv-cable-breakout": "p2",
  "right-angle-boot": "p3",
  "straight-boot": "p4",
  "busbar-insulation-tubing": "p5",
  "creepage-extension-shed": "p8",
};
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const related = products
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, 3);
  return (
    <>
      <div className="shell">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: p.shortName },
          ]}
        />
        <section className="product-hero">
          <div>
            <Eyebrow>{p.category}</Eyebrow>
            <h1>{p.name}</h1>
            <p className="lead">{p.summary}</p>
            <div className="actions">
              <Button href={"/request-quote?product=" + p.slug}>
                Request a quote
              </Button>
              <a className="text-link" href="#product-details">
                Technical details ↓
              </a>
            </div>
            <p className="mono product-origin">PM-SEAL / PM INDUSTRIES</p>
          </div>
          <figure>
            <Photo
              src={p.image}
              alt={p.name + " — studio presentation"}
              priority
            />
            <figcaption>
              Product presentation. Confirm the supplied configuration with your
              quotation.
            </figcaption>
          </figure>
        </section>
        <div className="product-body" id="product-details">
          <aside className="product-sidebar">
            <span className="mono">IN THIS PRODUCT</span>
            <a href="#overview">Overview</a>
            <a href="#applications">Applications & variants</a>
            <a href="#specification">Technical information</a>
            <Link href="/resources/ordering-information">Ordering guide ↗</Link>
            <a href={company.phoneHref}>Technical support ↗</a>
          </aside>
          <div>
            <section id="overview" className="detail-section">
              <Eyebrow>PRODUCT OVERVIEW</Eyebrow>
              <h2>Designed for the connection.</h2>
              <p>{p.description}</p>
              <ul className="feature-list">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
            <section
              id="applications"
              className="detail-section detail-columns"
            >
              <div>
                <h2>Applications</h2>
                <ul>
                  {p.applications.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Available configurations</h2>
                <ul>
                  {p.variants.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </section>
            <section id="specification" className="detail-section">
              <h2>Technical information</h2>
              {Object.keys(p.specifications).length > 0 ? (
                <dl className="spec-list">
                  {Object.entries(p.specifications).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p>
                  Share your cable dimensions and operating conditions so the
                  team can confirm a suitable size and configuration.
                </p>
              )}
              {p.notes?.map((n) => (
                <p key={n} className="small-note">
                  {n}
                </p>
              ))}
              {sizeSheets[p.slug] && (
                <div className="size-reference">
                  <h3>Published dimensional reference</h3>
                  <p>
                    Original catalog dimensions. Confirm availability and the
                    selected size before ordering.
                  </p>
                  <a
                    href={"/images/technical/" + sizeSheets[p.slug] + ".png"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={"/images/technical/" + sizeSheets[p.slug] + ".png"}
                      alt={p.name + " original standard-size table"}
                      width={900}
                      height={400}
                      className="size-sheet"
                    />
                    <span className="text-link">
                      Open full-size reference ↗
                    </span>
                  </a>
                </div>
              )}
              <TechnicalTables source={p.legacy} />
              {p.slug === "heat-shrinkable-straight-joint" && (
                <>
                  <h3>XLPE / PILC connection enquiries</h3>
                  <p>
                    The earlier catalog also includes an XLPE/PILC joint
                    schedule. Its title and several codes are inconsistent;
                    confirm the required joint construction with the team.
                  </p>
                  <TechnicalTables source="joint-sutaible-for-XLPE-PILC-cable.html" />
                </>
              )}
            </section>
          </div>
        </div>
        {related.length > 0 && (
          <section className="section related">
            <Eyebrow>RELATED PRODUCTS</Eyebrow>
            <h2>Part of the same system.</h2>
            <div className="related-grid">
              {related.map((x) => (
                <Link href={"/products/" + x.slug} key={x.slug}>
                  <Photo src={x.image} alt={x.name} />
                  <h3>{x.shortName} ↗</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.summary,
          image: company.url + p.image,
          category: p.category,
          url: company.url + "/products/" + p.slug,
          manufacturer: { "@id": company.url + "/#organization" },
        }}
      />
      <CallToAction />
    </>
  );
}
