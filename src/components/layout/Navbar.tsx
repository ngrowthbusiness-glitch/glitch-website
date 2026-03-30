"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [outreach, setOutreach] = useState<{
    slug: string;
    url: string;
  } | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const pathname = usePathname();

  /* ── Outreach bubble system ── */
  useEffect(() => {
    // Don't show bubble on outreach pages themselves
    if (pathname.startsWith("/outreach/")) return;

    const active = sessionStorage.getItem("ns_outreach_active");
    const url = sessionStorage.getItem("ns_outreach_url");

    if (active && url) {
      setOutreach({ slug: active, url });
      // Small delay before showing for smooth entrance
      const timer = setTimeout(() => setBubbleVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const dismissBubble = () => {
    setBubbleVisible(false);
    setTimeout(() => setOutreach(null), 300);
  };

  return (
    <>
      {/* ── Nav ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--nav-h)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          background: "rgba(10,14,13,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,255,252,0.22)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <Image
            src="/favicon.png"
            alt="Logo"
            width={24}
            height={24}
            style={{ objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#e8f5f2",
              letterSpacing: "-0.3px",
            }}
          >
            Nicola{" "}
            <span style={{ color: "#00fffc" }}>Serrao</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link"
                style={{
                  fontSize: "10px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  color:
                    pathname === link.href
                      ? "#00fffc"
                      : "rgba(232,245,242,0.50)",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href)
                    (e.target as HTMLElement).style.color = "#00fffc";
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href)
                    (e.target as HTMLElement).style.color =
                      "rgba(232,245,242,0.50)";
                }}
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
              className="nav-cta"
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#00fffc",
                border: "1px solid rgba(0,255,252,0.22)",
                padding: "8px 16px",
                borderRadius: "4px",
                background: "rgba(0,255,252,0.10)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(0,255,252,0.18)";
                el.style.borderColor = "#00fffc";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(0,255,252,0.10)";
                el.style.borderColor = "rgba(0,255,252,0.22)";
              }}
            >
              Parliamoci
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#e8f5f2",
              transition: "all 0.3s",
              transform: menuOpen
                ? "translateY(6.5px) rotate(45deg)"
                : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#e8f5f2",
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#e8f5f2",
              transition: "all 0.3s",
              transform: menuOpen
                ? "translateY(-6.5px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "var(--nav-h)",
            left: 0,
            right: 0,
            background: "rgba(10,14,13,0.97)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(0,255,252,0.22)",
            padding: "24px 32px",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          className="nav-mobile-menu"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "12px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.2s",
                color:
                  pathname === link.href
                    ? "#00fffc"
                    : "rgba(232,245,242,0.50)",
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href)
                  (e.target as HTMLElement).style.color = "#00fffc";
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href)
                  (e.target as HTMLElement).style.color =
                    "rgba(232,245,242,0.50)";
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "12px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "rgba(232,245,242,0.50)",
              padding: "8px 0",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#00fffc";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color =
                "rgba(232,245,242,0.50)";
            }}
          >
            Parliamoci su WhatsApp
          </a>
          <a
            href={`mailto:${SITE.email}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "12px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "rgba(232,245,242,0.50)",
              padding: "8px 0",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#00fffc";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color =
                "rgba(232,245,242,0.50)";
            }}
          >
            Inviami una mail
          </a>
        </div>
      )}

      {/* ── Outreach Bubble ── */}
      {outreach && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 20px",
            background: "rgba(10,14,13,0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(0,255,252,0.22)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
            opacity: bubbleVisible ? 1 : 0,
            transform: bubbleVisible
              ? "translateY(0)"
              : "translateY(20px)",
            pointerEvents: bubbleVisible ? "auto" : "none",
          }}
        >
          <Link
            href={outreach.url}
            style={{
              fontSize: "12px",
              letterSpacing: "1px",
              color: "#00fffc",
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.textDecoration = "none";
            }}
          >
            &larr; Torna alla tua strategia
          </Link>
          <button
            onClick={dismissBubble}
            aria-label="Chiudi"
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(232,245,242,0.50)",
              cursor: "pointer",
              fontSize: "16px",
              lineHeight: 1,
              padding: "0 0 0 8px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#e8f5f2";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color =
                "rgba(232,245,242,0.50)";
            }}
          >
            &times;
          </button>
        </div>
      )}

      {/* ── Responsive styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          nav {
            padding: 0 32px !important;
          }
        }
        @media (max-width: 480px) {
          nav {
            padding: 0 20px !important;
          }
        }
      `}} />
    </>
  );
}
