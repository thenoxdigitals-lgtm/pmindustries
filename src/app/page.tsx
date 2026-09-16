import Link from "next/link";
import { Button, Eyebrow, Photo, CallToAction } from "@/components/ui";
import { products, getProduct } from "@/data/products";
import { metadata as seo } from "@/lib/seo";
export const metadata = seo(
  "Heat Shrinkable Cable Accessories",
  "Heat shrinkable cable terminations, straight-through joints, molded components and polymer insulators. Manufacturing in Solapur since 2011.",
  "/",
);
export default function Home() {
  const featured = [
    "heat-shrinkable-termination-kit",
    "heat-shrinkable-straight-joint",
    "polymer-insulator",
  ].map((s) => getProduct(s)!);
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <Eyebrow>PM INDUSTRIES · SOLAPUR, INDIA</Eyebrow>
          <h1>
            Precision at
            <br />
            every <em>connection.</em>
          </h1>
          <p className="hero-description">
            Heat shrinkable cable accessories.
            <br />
            Engineered around the details that matter.
          </p>
          <div className="actions">
            <Button href="/products">Explore our products</Button>
            <Link className="text-link" href="/company">
              Meet PM Industries <span>↗</span>
            </Link>
          </div>
          <div className="hero-foot">
            <span className="mono">01 / CABLE SYSTEMS</span>
            <span>Manufacturing since 2011</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="drawing-corner" aria-hidden="true" />
          <Photo
            src="/images/products/termination.webp"
            alt="Three-core heat shrinkable termination with red rain sheds and metal cable lugs"
            priority
          />
          <div className="visual-caption">
            <span className="mono">HEAT SHRINKABLE TERMINATION</span>
            <Link
              href="/products/heat-shrinkable-termination-kit"
              aria-label="View termination kit"
            >
              ↗
            </Link>
          </div>
          <span className="vertical-note mono">
            POWER CABLE ACCESSORIES / PM-SEAL
          </span>
        </div>
      </section>
      <div className="range-strip">
        <div className="shell">
          <span>TERMINATE.</span>
          <span>CONNECT.</span>
          <span>INSULATE.</span>
          <span>PROTECT.</span>
        </div>
      </div>
      <section className="section shell">
        <div className="section-heading">
          <div>
            <Eyebrow>01 / THE PRODUCT RANGE</Eyebrow>
            <h2>
              Built around
              <br />
              <em>your cable system.</em>
            </h2>
          </div>
          <div>
            <p>
              From the cable end to the smallest molded component, find the
              right starting point for your specification.
            </p>
            <Link className="text-link" href="/products">
              View all {products.length} product families <span>↗</span>
            </Link>
          </div>
        </div>
        <div className="featured-products">
          {featured.map((p, i) => (
            <Link
              className="product-card"
              href={"/products/" + p.slug}
              key={p.slug}
            >
              <div className="card-image">
                <span className="card-no mono">0{i + 1}</span>
                <Photo src={p.image} alt={p.name} />
                <span className="card-arrow">↗</span>
              </div>
              <p className="mono">{p.category}</p>
              <h3>{p.shortName}</h3>
              <p>{p.summary}</p>
            </Link>
          ))}
        </div>
        <div className="component-links">
          <span className="mono">MOLDED & INSULATION COMPONENTS</span>
          <div>
            {products
              .filter((p) => !featured.includes(p))
              .map((p) => (
                <Link href={"/products/" + p.slug} key={p.slug}>
                  {p.shortName} ↗
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className="expertise dark">
        <div className="shell expertise-grid">
          <div className="expertise-intro">
            <Eyebrow>02 / MATERIAL KNOWLEDGE</Eyebrow>
            <h2>
              Small details.
              <br />
              <em>Essential protection.</em>
            </h2>
            <p>
              Heat shrink technology brings material science to the cable
              connection. PM Industries develops heat shrink compounds and
              manufactures molded cable accessories in Solapur.
            </p>
            <Button href="/technology/heat-shrink" secondary>
              Explore the technology
            </Button>
            <span className="technical-mark mono">
              COMPOUND → FORM → RECOVER
            </span>
          </div>
          <div className="expertise-image">
            <Photo
              src="/images/products/rain-shed.webp"
              alt="Red-brown molded rain sheds for cable terminations"
            />
            <div className="expertise-caption">
              <span>Designed around the application.</span>
              <Link href="/company/manufacturing">
                Engineering & manufacturing ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <div>
            <Eyebrow>03 / FROM SPECIFICATION TO SITE</Eyebrow>
            <h2>
              More than
              <br />
              <em>a component.</em>
            </h2>
          </div>
          <p>
            A clear requirement, a suitable product and a carefully prepared
            installation belong together.
          </p>
        </div>
        <div className="service-rows">
          {[
            [
              "01",
              "Define the requirement",
              "Match the voltage class, cable construction, core count and installation conditions.",
              "Ordering information",
              "/resources/ordering-information",
            ],
            [
              "02",
              "Discuss technical requirements",
              "Talk through product selection, published data and the documentation needed for your project.",
              "Quality & technical support",
              "/company/quality",
            ],
            [
              "03",
              "Prepare for installation",
              "Explore technical seminars and practical cable jointing sessions for engineers and jointers.",
              "Jointer training",
              "/company/jointer-training",
            ],
          ].map(([n, title, text, label, href]) => (
            <Link href={href} className="service-row" key={n}>
              <span className="mono">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="service-link">{label} ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
