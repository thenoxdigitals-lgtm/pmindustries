import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>;
}
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={`button ${secondary ? "button-outline" : ""}`}>
      {children}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function Photo({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 760px) 100vw, 50vw"
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const data = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {data.map((x, i) => (
            <li key={i}>
              {x.href ? (
                <Link href={x.href}>{x.label}</Link>
              ) : (
                <span aria-current="page">{x.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.map((x, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: x.label,
            ...(x.href ? { item: company.url + x.href } : {}),
          })),
        }}
      />
    </>
  );
}
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function CallToAction() {
  return (
    <section className="cta">
      <div className="shell cta-inner">
        <div>
          <Eyebrow>LET’S DISCUSS YOUR REQUIREMENT</Eyebrow>
          <h2>
            The right connection
            <br />
            <em>starts with a conversation.</em>
          </h2>
        </div>
        <div>
          <Button href="/request-quote">Request a quote</Button>
          <a className="cta-phone" href={company.phoneHref}>
            {company.phone} <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
