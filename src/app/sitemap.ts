import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { editorial } from "@/data/editorial";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/products",
    "/contact",
    "/request-quote",
    ...Object.keys(editorial).map((p) => "/" + p),
    ...products.map((p) => "/products/" + p.slug),
  ].map((path) => ({
    url: company.url + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
  }));
}
