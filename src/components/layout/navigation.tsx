"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
const links = [
  ["Company", "/company"],
  ["Products", "/products"],
  ["Technology", "/technology/heat-shrink"],
  ["Resources", "/resources"],
  ["Contact", "/contact"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <button
        ref={button}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <nav
        ref={menu}
        id="primary-navigation"
        className={`navigation ${open ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            aria-current={
              pathname === href || pathname.startsWith(href + "/")
                ? "page"
                : undefined
            }
          >
            {label}
          </Link>
        ))}
        <Link
          className="button nav-quote"
          href="/request-quote"
          onClick={() => setOpen(false)}
        >
          Request a quote <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </>
  );
}
