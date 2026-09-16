"use client";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { validateContact } from "@/lib/contact-validation";
export function EnquiryForm({
  initialProduct = "",
  quote = false,
}: {
  initialProduct?: string;
  quote?: boolean;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const requestId = useRef("");
  const previousPayload = useRef("");
  const pathname = usePathname();
  const notice = useRef<HTMLDivElement>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const raw = {
      ...Object.fromEntries(new FormData(form)),
      sourcePage: pathname,
    };
    const fingerprint = JSON.stringify(raw);
    if (!requestId.current || previousPayload.current !== fingerprint) {
      requestId.current = crypto.randomUUID();
      previousPayload.current = fingerprint;
    }
    const values = { ...raw, requestId: requestId.current };
    const checked = validateContact(values);
    if (!checked.ok) {
      setErrors(checked.errors);
      const field = Object.keys(checked.errors)[0];
      form.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checked.data),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setErrors(result.errors || {});
        throw new Error(
          typeof result.message === "string"
            ? result.message
            : "Please try again or contact us by phone.",
        );
      }
      setStatus("success");
      setMessage(
        "Thank you. Your requirement has been received. The PM Industries team will get back to you.",
      );
      requestId.current = "";
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error &&
          !["TimeoutError", "AbortError", "TypeError"].includes(error.name)
          ? error.message
          : "We could not confirm receipt. Please try again, or contact us by phone or email.",
      );
    }
    requestAnimationFrame(() => notice.current?.focus());
  }
  const error = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={name + "-error"}>
        {errors[name]}
      </span>
    ) : null;
  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="mono">
          {quote ? "YOUR REQUIREMENT" : "SEND AN ENQUIRY"}
        </span>
        <p>Fields marked * are required.</p>
      </div>
      <div className="form-grid">
        {[
          {
            name: "name",
            label: "Your name",
            type: "text",
            required: true,
            max: 100,
            auto: "name",
          },
          {
            name: "company",
            label: "Company",
            type: "text",
            required: false,
            max: 160,
            auto: "organization",
          },
          {
            name: "email",
            label: "Email address",
            type: "email",
            required: true,
            max: 254,
            auto: "email",
          },
          {
            name: "phone",
            label: "Phone number",
            type: "tel",
            required: true,
            max: 40,
            auto: "tel",
          },
        ].map((f) => (
          <label key={f.name} htmlFor={f.name}>
            {f.label}
            {f.required ? " *" : ""}
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required={f.required}
              maxLength={f.max}
              autoComplete={f.auto}
              aria-invalid={!!errors[f.name]}
              aria-describedby={errors[f.name] ? f.name + "-error" : undefined}
            />
            {error(f.name)}
          </label>
        ))}
        <label htmlFor="product">
          Product interest
          <select id="product" name="product" defaultValue={initialProduct}>
            <option value="">Help me choose / general enquiry</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option>Jointer training</option>
            <option>Technical documentation</option>
            <option>Other requirement</option>
          </select>
        </label>
        <label htmlFor="voltageClass">
          Voltage class
          <input
            id="voltageClass"
            name="voltageClass"
            maxLength={80}
            placeholder="e.g. 11 kV, or please advise"
          />
          {error("voltageClass")}
        </label>
        <label className="full" htmlFor="message">
          Requirement / message *
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={4000}
            placeholder="Tell us the cable type, size, quantity and installation requirements, if known."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {error("message")}
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field blank
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-privacy">
        We’ll use these details to respond to your enquiry.{" "}
        <Link href="/privacy">Privacy information</Link>
      </p>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending"
          ? "Sending enquiry…"
          : quote
            ? "Send quote request"
            : "Send enquiry"}
        <span aria-hidden="true">↗</span>
      </button>
      <div
        ref={notice}
        tabIndex={-1}
        className={`form-notice ${status}`}
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message}
      </div>
      <noscript>
        Please call or email PM Industries to send your enquiry. This form
        requires JavaScript.
      </noscript>
    </form>
  );
}
