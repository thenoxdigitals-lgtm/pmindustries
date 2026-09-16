import Link from "next/link";
import { Logo } from "./logo";
import { company, address } from "@/data/company";
import { products } from "@/data/products";
export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Heat shrink expertise.
              <br />
              Made for the connection.
            </p>
            <small>
              Manufacturing cable accessories
              <br />
              in Solapur since {company.established}.
            </small>
          </div>
          <div>
            <h2>Company</h2>
            {[
              ["About us", "/company"],
              ["Engineering & manufacturing", "/company/manufacturing"],
              ["Quality", "/company/quality"],
              ["Our team", "/company/team"],
              ["Jointer training", "/company/jointer-training"],
            ].map(([n, h]) => (
              <Link key={h} href={h}>
                {n}
              </Link>
            ))}
          </div>
          <div>
            <h2>Products</h2>
            {products
              .filter((x) =>
                [
                  "heat-shrinkable-termination-kit",
                  "heat-shrinkable-straight-joint",
                  "polymer-insulator",
                  "anti-tracking-cable-breakout",
                ].includes(x.slug),
              )
              .map((p) => (
                <Link key={p.slug} href={"/products/" + p.slug}>
                  {p.shortName}
                </Link>
              ))}
            <Link href="/products">All products ↗</Link>
          </div>
          <div>
            <h2>Visit & connect</h2>
            <address>{address}</address>
            <a href={company.phoneHref}>{company.phone}</a>
            {company.emails.map((e) => (
              <a key={e} href={"mailto:" + e}>
                {e}
              </a>
            ))}
            <a href={company.whatsapp}>Enquire on WhatsApp ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PM Industries</span>
          <div>
            <Link href="/resources/ordering-information">
              Ordering information
            </Link>
            <Link href="/resources/downloads">Downloads</Link>
            <Link href="/privacy">Privacy</Link>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
