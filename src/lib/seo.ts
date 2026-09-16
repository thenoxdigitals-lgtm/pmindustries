import type { Metadata } from "next";
import { company } from "@/data/company";
export function metadata(
  title: string,
  description: string,
  path: string,
  image = "/images/products/termination.webp",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | PM Industries`,
      description,
      url: path,
      siteName: company.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
