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
    </>
  );
}
