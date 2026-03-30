import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-1 border-t border-border">
      {/* Top section */}
      <div className="max-w-[1100px] mx-auto px-[60px] py-12 max-md:px-8 max-[480px]:px-5">
        <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-8">
          {/* Col 1: Logo + tagline */}
          <div>
            <div className="font-heading text-lg font-bold text-foreground mb-3">
              Nicola <span className="text-primary">Serrao</span>
            </div>
            <p className="text-[11px] text-dimmed leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="text-[9px] tracking-[3px] uppercase text-primary mb-4">
              Navigazione
            </div>
            <ul className="list-none flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-dimmed hover:text-primary no-underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contatti */}
          <div>
            <div className="text-[9px] tracking-[3px] uppercase text-primary mb-4">
              Contatti
            </div>
            <ul className="list-none flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[11px] text-dimmed hover:text-primary no-underline transition-colors duration-200"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-dimmed hover:text-primary no-underline transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-dimmed hover:text-primary no-underline transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-glow mx-[60px] max-md:mx-8" />

      {/* Bottom */}
      <div className="max-w-[1100px] mx-auto px-[60px] py-5 flex flex-col items-center gap-2 text-[10px] text-faint tracking-[1px] text-center max-md:px-8 max-[480px]:px-5">
        <p>
          {SITE.address.street}, {SITE.address.cap} {SITE.address.city} (
          {SITE.address.province})
        </p>
        <p>
          P.IVA {SITE.piva} &middot; C.F. {SITE.cf}
        </p>
        <p>
          &copy; {year} {SITE.name} &middot;{" "}
          <Link
            href="/privacy-policy"
            className="text-faint hover:text-primary no-underline transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
