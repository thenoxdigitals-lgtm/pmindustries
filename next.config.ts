import type { NextConfig } from "next";
import { products } from "./src/data/products";
const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      ...products.map((p) => ({
        source: "/" + p.legacy,
        destination: "/products/" + p.slug,
        permanent: true,
      })),
      ...Object.entries({
        "/index.html": "/",
        "/about.html": "/company",
        "/team.html": "/company/team",
        "/ourteam.html": "/company/team",
        "/product.html": "/products",
        "/contact.html": "/contact",
        "/3-core-insulated-cable.html":
          "/products/heat-shrinkable-termination-kit",
        "/single-core-insulated-cable.html":
          "/products/heat-shrinkable-termination-kit",
        "/3-core-paper-insulated-lead.html":
          "/products/heat-shrinkable-termination-kit",
        "/low-voltage-termination.html":
          "/products/heat-shrinkable-termination-kit",
        "/join-sutaible-for-PVC-XLPE-EPR-cable.html":
          "/products/heat-shrinkable-straight-joint",
        "/joint-sutaible-for-XLPE-PILC-cable.html":
          "/products/heat-shrinkable-straight-joint",
      }).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
          },
        ],
      },
    ];
  },
};
export default config;
