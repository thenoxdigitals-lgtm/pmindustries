export const fieldLimits = {
  name: 100,
  company: 160,
  phone: 40,
  email: 254,
  product: 160,
  voltageClass: 80,
  message: 4000,
  sourcePage: 250,
  website: 200,
  requestId: 50,
} as const;
export type ContactData = Record<keyof typeof fieldLimits, string>;
export function validateContact(
  input: unknown,
):
  | { ok: true; data: ContactData }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const data = {} as ContactData;
  if (!input || typeof input !== "object" || Array.isArray(input))
    return {
      ok: false,
      errors: { form: "Please check your enquiry and try again." },
    };
  for (const [key, max] of Object.entries(fieldLimits)) {
    const value = (input as Record<string, unknown>)[key] ?? "";
    if (typeof value !== "string" || value.length > max) {
      errors[key] = `Please use no more than ${max} characters.`;
      data[key as keyof ContactData] = "";
    } else data[key as keyof ContactData] = value.trim();
  }
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (
    !/^[+\d\s().-]{7,40}$/.test(data.phone) ||
    data.phone.replace(/\D/g, "").length < 7
  )
    errors.phone = "Please enter a valid phone number.";
  if (data.message.length < 10)
    errors.message =
      "Please describe your requirement in at least 10 characters.";
  if (!/^\/(?!\/)[^\r\n]*$/.test(data.sourcePage))
    errors.sourcePage = "Please refresh this page and try again.";
  if (
    !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(
      data.requestId,
    )
  )
    errors.requestId = "Please refresh this page and try again.";
  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, data };
}
