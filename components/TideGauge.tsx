"use client";

import { useEffect, useRef } from "react";
import { july22, kingTides, kelvinWaveRange } from "@/lib/site";
import type { TideReading } from "./ScrollEngine";

/*
  The signature move: a harbor tide staff the visitor raises with their own scroll.
  Fixed in the left margin on desktop; a slim water bar under the top bar on phones.
*/

const MIN = 4;
const MAX = 9;
const frac = (ft: number) => (ft - MIN) / (MAX - MIN);
const pct = (ft: number) => `${(frac(ft) * 100).toFixed(2)}%`;

const dec24 = kingTides.find((t) => t.peak)!;
const bandLo = dec24.noaa + kelvinWaveRange.min;
const bandHi = dec24.noaa + kelvinWaveRange.max;

const ticks = Array.from({ length: (MAX - MIN) * 4 + 1 }, (_, i) => MIN + i * 0.25);

function fmt(level: number) {
  return level.toFixed(Math.abs(level - july22.noaa) < 0.003 ? 2 : 1);
}

export default function TideGauge() {
  const fillRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);
  const mReadRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 4.5;
    let current = 4.5;
    let raf = 0;

    const paint = () => {
      const f = Math.min(1, Math.max(0, frac(current)));
      fillRef.current?.style.setProperty("--f", f.toFixed(4));
      barRef.current?.style.setProperty("--f", f.toFixed(4));
      const text = fmt(current);
      if (readRef.current) readRef.current.textContent = text;
      if (mReadRef.current) mReadRef.current.textContent = text;
    };

    const step = () => {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.004) current = target;
      paint();
      raf = current === target ? 0 : requestAnimationFrame(step);
    };

    const onReading = (e: Event) => {
      const r = (e as CustomEvent<TideReading>).detail;
      target = r.level;
      if (labelRef.current) labelRef.current.textContent = r.label;
      homeRef.current?.toggleAttribute("data-on", r.home);
      if (reduce) {
        current = target;
        paint();
      } else if (!raf) raf = requestAnimationFrame(step);
    };

    window.addEventListener("tide:reading", onReading);
    paint();
    return () => {
      window.removeEventListener("tide:reading", onReading);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Desktop staff */}
      <aside
        aria-label="Tide gauge: water level for the part of the page you are reading"
        className="fixed bottom-6 left-5 top-[5.25rem] z-30 hidden w-[76px] flex-col lg:flex"
      >
        <div className="rounded-t-lg bg-night/92 px-2 pb-2 pt-2.5 text-center shadow-[0_8px_24px_-12px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
          <div className="text-[1.45rem] leading-none font-extrabold tracking-tight text-night-ink tnum">
            <span ref={readRef}>4.5</span>
          </div>
          <div className="mt-0.5 text-[0.62rem] font-semibold tracking-[0.08em] text-night-soft uppercase">
            ft MLLW
          </div>
          <div
            ref={homeRef}
            className="grid grid-rows-[0fr] text-[0.7rem] leading-tight font-bold text-teal-300 opacity-0 transition-[opacity,grid-template-rows] duration-300 data-[on]:grid-rows-[1fr] data-[on]:opacity-100"
          >
            <span className="overflow-hidden">
              <span className="mt-2 block border-t border-white/15 pt-1.5">Your home</span>
              <span className="block text-base">? ft</span>
            </span>
          </div>
        </div>

        <div className="relative flex-1 overflow-visible rounded-b-lg bg-night/80 ring-1 ring-white/10">
          {/* water */}
          <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden rounded-b-lg">
            <div
              ref={fillRef}
              className="gauge-fill absolute inset-0 bg-gradient-to-t from-teal-600 to-teal-300/85"
            />
          </div>

          {/* Dec 24 band */}
          <div
            className="gauge-hatch absolute left-0 w-3 opacity-90"
            style={{ bottom: pct(bandLo), height: `calc(${pct(bandHi)} - ${pct(bandLo)})` }}
            aria-hidden="true"
          />

          {/* ticks */}
          {ticks.map((t) => {
            const major = Number.isInteger(t);
            return (
              <div
                key={t}
                className="absolute right-0 flex items-center justify-end"
                style={{ bottom: pct(t), transform: "translateY(50%)" }}
                aria-hidden="true"
              >
                {major && (
                  <span className="mr-1 text-[0.68rem] font-bold text-night-ink tnum mix-blend-normal [text-shadow:0_1px_2px_rgb(7_26_44/0.8)]">
                    {t}
                  </span>
                )}
                <span className={`block h-px bg-night-ink/75 ${major ? "w-4" : t % 0.5 === 0 ? "w-2.5" : "w-1.5"}`} />
              </div>
            );
          })}

          {/* Jul 22 mark */}
          <div
            className="absolute inset-x-0 border-t border-dashed border-night-ink/90"
            style={{ bottom: pct(july22.noaa) }}
            aria-hidden="true"
          />

          {/* labels outside the staff */}
          <div
            className="pointer-events-none absolute left-[calc(100%+8px)] w-24 -translate-y-1/2 text-[0.66rem] leading-tight font-semibold text-night-soft"
            style={{ bottom: `calc(${pct(july22.noaa)} - 0.9rem)` }}
          >
            <span className="text-night-ink">Jul 22</span> 6.97
          </div>
          <div
            className="pointer-events-none absolute left-[calc(100%+8px)] w-24 text-[0.66rem] leading-tight font-semibold text-night-soft"
            style={{ bottom: pct(bandLo) }}
          >
            <span className="text-[#d7a656]">Dec 24</span>
            <br />
            {bandLo.toFixed(1)} to {bandHi.toFixed(1)}
          </div>
        </div>
        <span ref={labelRef} className="sr-only" aria-live="off" />
      </aside>

      {/* Phone bar */}
      <div className="fixed inset-x-0 top-14 z-30 lg:hidden" aria-hidden="true">
        <div className="relative h-1.5 bg-night-2">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 w-full origin-left bg-teal-300"
            style={{ transform: "scaleX(var(--f, 0.1))" }}
          />
          <div className="absolute inset-y-0 w-px bg-night-ink" style={{ left: pct(july22.noaa) }} />
          <div
            className="gauge-hatch absolute inset-y-0"
            style={{ left: pct(bandLo), width: `calc(${pct(bandHi)} - ${pct(bandLo)})` }}
          />
        </div>
      </div>
      <span className="sr-only">
        Gauge scale 4 to 9 feet. Reference marks: July 22, {july22.noaa} feet; December 24 forecast,{" "}
        {bandLo.toFixed(1)} to {bandHi.toFixed(1)} feet.
      </span>
      <MobileReading refEl={mReadRef} />
    </>
  );
}

function MobileReading({ refEl }: { refEl: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <div className="fixed right-[var(--gutter)] top-[4.1rem] z-30 rounded-full bg-night/90 px-2.5 py-1 text-xs font-bold text-night-ink ring-1 ring-white/10 lg:hidden">
      <span className="text-night-soft">Tide </span>
      <span ref={refEl} className="tnum">4.5</span>
      <span className="text-night-soft"> ft</span>
    </div>
  );
}
