import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { company } from "@/data/company";
export function Header() {
  return (
    <>
      <div className="utility">
        <div className="shell">
          <span>HEAT SHRINKABLE CABLE ACCESSORIES</span>
          <a href={company.phoneHref}>
            Technical enquiries <span>{company.phone} ↗</span>
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Logo />
          <Navigation />
        </div>
      </header>
    </>
  );
}
