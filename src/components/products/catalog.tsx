"use client";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { Photo } from "@/components/ui";
export function Catalog() {
  const [category, setCategory] = useState("All products");
  const [query, setQuery] = useState("");
  const visible = products.filter(
    (p) =>
      (category === "All products" || p.category === category) &&
      `${p.name} ${p.summary} ${p.variants.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="catalog-controls">
        <div role="group" aria-label="Filter by product family">
          {[
            "All products",
            "Cable systems",
            "Molded components",
            "Insulation",
          ].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search">
          <span className="sr-only">Search products</span>
          <input
            type="search"
            placeholder="Find a product…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>
      <p className="result-count mono" aria-live="polite">
        {visible.length} PRODUCT {visible.length === 1 ? "FAMILY" : "FAMILIES"}
      </p>
      <div className="catalog-grid">
        {visible.map((p) => (
          <Link
            href={"/products/" + p.slug}
            key={p.slug}
            className="product-card"
          >
            <div className="card-image">
              <Photo src={p.image} alt={p.name} />
              <span className="card-arrow">↗</span>
            </div>
            <p className="mono">{p.category}</p>
            <h2>{p.shortName}</h2>
            <p>{p.summary}</p>
          </Link>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <h2>No matching products</h2>
          <p>Try a different term, or ask our team about your requirement.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All products");
            }}
          >
            Show all products
          </button>
        </div>
      )}
    </>
  );
}
