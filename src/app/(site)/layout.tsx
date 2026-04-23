import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowBackground from "@/components/layout/GlowBackground";
import CookieBanner from "@/components/layout/CookieBanner";
import FeedbackPopup from "@/components/layout/FeedbackPopup";
import { getPersonSchema, getOrganizationSchema } from "@/lib/structured-data";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationSchema()),
        }}
      />

      {/* ── Custom cursor (desktop only) ── */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
          .c-dot {
            position: fixed; top: 0; left: 0; z-index: 9999;
            width: 6px; height: 6px; border-radius: 50%;
            background: var(--teal);
            box-shadow: 0 0 10px rgba(0,255,252,.8), 0 0 20px rgba(0,255,252,.3);
            pointer-events: none;
            transition: width .2s, height .2s, margin .2s;
          }
          .c-ring {
            position: fixed; top: 0; left: 0; z-index: 9998;
            width: 30px; height: 30px; border-radius: 50%;
            border: 1.5px solid rgba(0,255,252,.5);
            pointer-events: none;
            transition: width .25s, height .25s, margin .25s, background .25s, border-color .25s;
          }
          .c-ring.c-hover {
            width: 44px; height: 44px;
            background: rgba(0,255,252,.1);
            border-color: rgba(0,255,252,.7);
          }
          .c-dot.c-hover {
            width: 4px; height: 4px;
          }
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: '<div class="c-dot" id="c-dot"></div><div class="c-ring" id="c-ring"></div>' }} />
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          if (window.matchMedia('(pointer: coarse)').matches) return;
          var dot = document.getElementById('c-dot');
          var ring = document.getElementById('c-ring');
          if (!dot || !ring) return;
          var mx = 0, my = 0, rx = 0, ry = 0;
          document.addEventListener('mousemove', function(e) {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
          });
          function lerpRing() {
            rx += (mx - rx) * 0.15;
            ry += (my - ry) * 0.15;
            ring.style.transform = 'translate(' + (rx - 15) + 'px,' + (ry - 15) + 'px)';
            requestAnimationFrame(lerpRing);
          }
          lerpRing();
          document.addEventListener('mouseover', function(e) {
            var t = e.target;
            if (t.closest && (t.closest('a') || t.closest('button') || t.closest('[role=button]'))) {
              dot.classList.add('c-hover');
              ring.classList.add('c-hover');
            }
          });
          document.addEventListener('mouseout', function(e) {
            var t = e.target;
            if (t.closest && (t.closest('a') || t.closest('button') || t.closest('[role=button]'))) {
              dot.classList.remove('c-hover');
              ring.classList.remove('c-hover');
            }
          });
        })();
      `}} />

      <GlowBackground />
      <Navbar />
      <main className="relative z-1 pt-[var(--nav-h)] flex-1">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <FeedbackPopup />

      {/* ── Floating bubbles: WhatsApp (right) + Risorse (left) ── */}
      <style>{`
        .float-bubble {
          position: fixed; bottom: 24px; z-index: 90;
          width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .float-bubble:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 28px rgba(0,0,0,0.4);
        }
        .float-wa {
          right: 24px;
          background: #25D366;
        }
        .float-wa:hover {
          box-shadow: 0 6px 28px rgba(37,211,102,0.4);
        }
        .float-risorse {
          left: 24px;
          background: var(--bg);
          border: 1px solid var(--teal-border);
        }
        .float-risorse:hover {
          background: rgba(0,255,252,0.08);
          border-color: var(--teal);
          box-shadow: 0 6px 28px rgba(0,255,252,0.2);
        }
        .float-tooltip {
          position: absolute; bottom: 64px; white-space: nowrap;
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          padding: 6px 12px; border-radius: 5px;
          opacity: 0; pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
          transform: translateY(4px);
        }
        .float-bubble:hover .float-tooltip {
          opacity: 1; transform: translateY(0);
        }
        .float-wa .float-tooltip {
          right: 0; background: #25D366; color: #fff;
        }
        .float-risorse .float-tooltip {
          left: 0; background: var(--teal-dim); color: var(--teal);
          border: 1px solid var(--teal-border);
        }
        @media (max-width: 480px) {
          .float-bubble { width: 48px; height: 48px; bottom: 16px; }
          .float-wa { right: 16px; }
          .float-risorse { left: 16px; }
          .float-tooltip { display: none; }
        }
      `}</style>
      <a href="https://wa.me/393385691369" target="_blank" rel="noopener noreferrer" className="float-bubble float-wa" aria-label="WhatsApp">
        <span className="float-tooltip">Scrivimi su WhatsApp</span>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
      <a href="/risorse" className="float-bubble float-risorse" aria-label="Risorse gratuite">
        <span className="float-tooltip">Risorse gratuite AI</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </a>
    </>
  );
}
