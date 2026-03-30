"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-[var(--nav-h)] z-100 flex items-center justify-between px-[60px] bg-[rgba(10,14,19,0.85)] backdrop-blur-[12px] border-b border-border max-md:px-8 max-[480px]:px-5">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/favicon.png"
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="font-heading text-lg font-bold text-foreground">
            Nicola <span className="text-primary">Serrao</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[10px] tracking-[2.5px] uppercase no-underline transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-dimmed hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[2px] uppercase text-primary border border-border px-4 py-2 rounded bg-[rgba(0,255,252,0.10)] hover:bg-[rgba(0,255,252,0.18)] hover:border-primary transition-all duration-200 no-underline"
            >
              Parliamoci
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-[22px] h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-[var(--nav-h)] left-0 right-0 bg-[rgba(10,14,19,0.97)] backdrop-blur-[16px] border-b border-border p-6 z-99 flex flex-col gap-5 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-xs tracking-[2.5px] uppercase no-underline py-2 border-b border-[rgba(255,255,255,0.05)] ${
                pathname === link.href
                  ? "text-primary"
                  : "text-dimmed hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-xs tracking-[2.5px] uppercase text-dimmed hover:text-primary no-underline py-2"
          >
            Parliamoci su WhatsApp
          </a>
          <a
            href={`mailto:${SITE.email}`}
            onClick={() => setMenuOpen(false)}
            className="text-xs tracking-[2.5px] uppercase text-dimmed hover:text-primary no-underline py-2"
          >
            Inviami una mail
          </a>
        </div>
      )}
    </>
  );
}
