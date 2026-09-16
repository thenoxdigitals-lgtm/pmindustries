import { ContactPage } from "@/components/forms/contact-page";
import { getProduct } from "@/data/products";
import { metadata as seo } from "@/lib/seo";
export const metadata = seo(
  "Request a Quote",
  "Send your voltage class, cable construction and product requirement to PM Industries for a quotation.",
  "/request-quote",
);
export default async function Quote({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const q = await searchParams;
  return (
    <ContactPage
      quote
      initialProduct={q.product ? getProduct(q.product)?.name || "" : ""}
    />
  );
}
