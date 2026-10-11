"use client";

import { useEffect } from "react";

/*
  One rAF loop drives the whole page. It never re-renders React; it only writes
  CSS custom properties and data attributes:

  [data-act="pin"]   --p  0..1 across the pinned travel (height minus one viewport)
  [data-act="flow"]  --p  0..1 from entering the bottom to leaving the top
  [data-steps]       --s  0..n-1 continuous step, data-step = active index, data-held
  [data-gauge="a b"] the tide gauge reading for that stretch of the page
  [data-in], [data-reveal]  get .is-in once they come into view

  The gauge listens for "tide:reading" events with { level, label, home }.
*/

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export type TideReading = { level: number; label: string; home: boolean };

export default function ScrollEngine() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const acts = Array.from(document.querySelectorAll<HTMLElement>("[data-act]"));
    const gauges = Array.from(document.querySelectorAll<HTMLElement>("[data-gauge]"));

    // entrances
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    document.querySelectorAll("[data-in], [data-reveal]").forEach((el) => io.observe(el));

    let frame = 0;
    let lastKey = "";

    const tick = () => {
      frame = 0;
      const vh = window.innerHeight;

      for (const el of acts) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const kind = el.dataset.act;
        const p =
          kind === "pin"
            ? clamp(-r.top / Math.max(r.height - vh, 1))
            : clamp((vh - r.top) / (vh + r.height));
        el.style.setProperty("--p", p.toFixed(4));

        const steps = Number(el.dataset.steps || 0);
        if (steps > 1) {
          // the last 14% of the travel holds on the final step
          const s = clamp(p / 0.86) * (steps - 1);
          el.style.setProperty("--s", s.toFixed(4));
          const active = String(clamp(Math.floor(s + 0.5), 0, steps - 1));
          if (el.dataset.step !== active) el.dataset.step = active;
          el.dataset.held = p > 0.9 ? "1" : "0";
        }
      }

      // gauge: whichever marked stretch holds the middle of the viewport
      const mid = vh * 0.5;
      for (const g of gauges) {
        const r = g.getBoundingClientRect();
        if (r.top > mid || r.bottom <= mid) continue;
        const [a, b] = (g.dataset.gauge || "4.5 4.5").split(" ").map(Number);
        let level: number;
        const stepLevels = g.dataset.gaugeSteps?.split(",").map(Number);
        if (stepLevels) {
          const s = Number(g.style.getPropertyValue("--s") || 0);
          level = stepLevels[clamp(Math.floor(s + 0.5), 0, stepLevels.length - 1)];
        } else {
          const t = clamp((mid - r.top) / r.height);
          level = a + (b - a) * t;
        }
        const reading: TideReading = {
          level,
          label: g.dataset.gaugeLabel || "",
          home: g.hasAttribute("data-gauge-home"),
        };
        const key = `${level.toFixed(2)}|${reading.label}|${reading.home}`;
        if (key !== lastKey) {
          lastKey = key;
          window.dispatchEvent(new CustomEvent<TideReading>("tide:reading", { detail: reading }));
        }
        break;
      }
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    document.documentElement.dataset.motion = reduce ? "reduced" : "full";

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return null;
}
