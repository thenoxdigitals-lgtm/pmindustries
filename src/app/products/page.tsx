import { Breadcrumbs, Eyebrow, CallToAction } from "@/components/ui";
import { Catalog } from "@/components/products/catalog";
import { metadata as seo } from "@/lib/seo";
export const metadata = seo(
  "Products",
  "Explore cable terminations, straight joints, polymer insulators, molded breakouts, insulating boots, busbar tubing and rain sheds.",
  "/products",
);
export default function Products() {
  return (
    <>
      <div className="shell">
        <Breadcrumbs items={[{ label: "Products" }]} />
        <div className="page-intro">
          <Eyebrow>PRODUCT DIRECTORY</Eyebrow>
          <h1>
            A complete view
            <br />
            of the <em>connection.</em>
          </h1>
          <p>
            Find cable systems and insulating components by application. Every
            enquiry starts with your cable specification.
          </p>
        </div>
        <section className="catalog-section" aria-label="Product catalog">
          <Catalog />
        </section>
      </div>
      <CallToAction />
    </>
  );
}
