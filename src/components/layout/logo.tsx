import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
export function Logo() {
  // Owner supplies the actual artwork. No substitute logo or duplicated wordmark.
  const available = existsSync(path.join(process.cwd(), "public/logo.png"));
  return available ? (
    <Link className="logo" href="/" aria-label="PM Industries home">
      <Image
        src="/logo.png"
        alt="PM Industries"
        width={260}
        height={70}
        priority
        className="logo-image"
      />
    </Link>
  ) : (
    <Link className="logo-pending" href="/" aria-label="PM Industries home">
      <span className="sr-only">Home</span>
    </Link>
  );
}
