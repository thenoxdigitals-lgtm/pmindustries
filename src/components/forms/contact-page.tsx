import { Breadcrumbs, Eyebrow } from "@/components/ui";
import { company, address } from "@/data/company";
import { EnquiryForm } from "./enquiry-form";
export function ContactPage({
  quote = false,
  initialProduct = "",
}: {
  quote?: boolean;
  initialProduct?: string;
}) {
  return (
    <div className="shell">
      <Breadcrumbs items={[{ label: quote ? "Request a quote" : "Contact" }]} />
      <div className="contact-grid">
        <section>
          <Eyebrow>
            {quote ? "REQUEST A QUOTE" : "CONTACT PM INDUSTRIES"}
          </Eyebrow>
          <h1>
            Let’s make
            <br />
            the right
            <br />
            <em>connection.</em>
          </h1>
          <p className="lead">
            {quote
              ? "Share your requirement. We’ll help identify the product, configuration and information you need."
              : "Speak with the team about products, technical requirements or jointer training."}
          </p>
          <div className="contact-details">
            <div>
              <span className="mono">CALL OUR TEAM</span>
              <a className="contact-phone" href={company.phoneHref}>
                {company.phone} ↗
              </a>
            </div>
            <div>
              <span className="mono">EMAIL</span>
              {company.emails.map((e) => (
                <a key={e} href={"mailto:" + e}>
                  {e} ↗
                </a>
              ))}
            </div>
            <div>
              <span className="mono">FIND US IN SOLAPUR</span>
              <address>{address}</address>
              <a
                href={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURIComponent(address)
                }
                target="_blank"
                rel="noreferrer"
              >
                Open directions ↗
              </a>
            </div>
            <a className="text-link" href={company.whatsapp}>
              Enquire on WhatsApp ↗
            </a>
          </div>
        </section>
        <EnquiryForm quote={quote} initialProduct={initialProduct} />
      </div>
    </div>
  );
}
