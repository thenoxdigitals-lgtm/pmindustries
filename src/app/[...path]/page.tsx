import Link from "next/link";
import { notFound } from "next/navigation";
import { editorial } from "@/data/editorial";
import { metadata as seo } from "@/lib/seo";
import { Breadcrumbs, Eyebrow, Photo, CallToAction } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(editorial).map((x) => ({ path: x.split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const path = (await params).path.join("/");
  const p = editorial[path];
  return p ? seo(p.eyebrow, p.description, "/" + path, p.image) : {};
}
export default async function Editorial({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const path = (await params).path.join("/");
  const p = editorial[path];
  if (!p) notFound();
  const root = path.split("/")[0];
  return (
    <>
      <div className="shell">
        <Breadcrumbs
          items={[
            ...(path.includes("/") && editorial[root]
              ? [
                  {
                    label: root === "company" ? "Company" : "Resources",
                    href: "/" + root,
                  },
                ]
              : []),
            { label: p.eyebrow.toLowerCase() },
          ]}
        />
        <section
          className="editorial-hero"
          id={path === "company" ? "history" : undefined}
        >
          <div>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h1>
              {p.title.split("\n").map((line, i) => (
                <span key={line}>
                  {i === 0 ? line : <em>{line}</em>}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className="lead">{p.description}</p>
          </div>
          <Photo src={p.image} alt={p.imageAlt} priority />
        </section>
        <div className="editorial-body">
          <aside>
            <span className="mono">IN THIS SECTION</span>
            {p.sections.map((s, i) => (
              <a href={"#section-" + i} key={s.title}>
                {s.title}
              </a>
            ))}
          </aside>
          <div>
            {p.sections.map((s, i) => (
              <section id={"section-" + i} key={s.title}>
                <span className="mono section-number">0{i + 1}</span>
                <h2>{s.title}</h2>
                {s.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
                {s.items && (
                  <ul className="feature-list">
                    {s.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
        {p.links && (
          <section className="editorial-links" aria-label="Related pages">
            {p.links.map((l) => (
              <Link
                href={l.href}
                key={l.href}
                id={
                  path === "company"
                    ? l.href === "/company/quality"
                      ? "mission"
                      : l.href === "/company/jointer-training"
                        ? "vision"
                        : undefined
                    : undefined
                }
              >
                <h2>
                  {l.title}
                  <span>↗</span>
                </h2>
                <p>{l.description}</p>
              </Link>
            ))}
          </section>
        )}
      </div>
      <CallToAction />
    </>
  );
}
