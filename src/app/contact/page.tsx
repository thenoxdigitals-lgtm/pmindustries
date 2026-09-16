import { ContactPage } from "@/components/forms/contact-page";
import { metadata as seo } from "@/lib/seo";
export const metadata = seo(
  "Contact",
  "Contact PM Industries in Solapur for cable accessories, technical support and jointer training. Call +91-9890114253.",
  "/contact",
);
export default function Contact() {
  return <ContactPage />;
}
