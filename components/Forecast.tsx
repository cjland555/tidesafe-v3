"use client";

import { useState } from "react";
import { kingTides, kelvinWaveRange, july22 } from "@/lib/site";

const W = 640;
const H = 380;
const PAD = { l: 52, r: 24, t: 28, b: 44 };
const Y0 = 6.0;
const Y1 = 8.25;
const y = (ft: number) => PAD.t + (1 - (ft - Y0) / (Y1 - Y0)) * (H - PAD.t - PAD.b);
const colW = (W - PAD.l - PAD.r) / kingTides.length;
const x = (i: number) => PAD.l + colW * (i + 0.5);
const grid = [6, 6.5, 7, 7.5, 8];

const dec = kingTides.find((t) => t.peak)!;
const lo = dec.noaa + kelvinWaveRange.min;
const hi = dec.noaa + kelvinWaveRange.max;

export default function Forecast() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section
      id="forecast"
      data-gauge={`${july22.noaa} ${hi}`}
      data-gauge-label="The forecast"
      className="chapter ground-night grain"
      aria-labelledby="forecast-title"
    >
      <div className="wrap relative z-[2] grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7 lg:order-2">
          <p className="dateline" data-in>
            <span>Winter king tides 2026 to 2027</span>
            <span>NOAA station 9410583, Newport Bay</span>
          </p>
          <h2 id="forecast-title" className="display h-lg mt-6" data-in style={{ ["--d" as string]: 1 }}>
            The highest tide of the winter lands on Christmas Eve. Then add the Kelvin wave.
          </h2>
          <div className="prose-text mt-7" data-in style={{ ["--d" as string]: 2 }}>
            <p>
              NOAA predicts four king tides between October and January. The highest is{" "}
              <strong className="tnum">{dec.noaa.toFixed(1)} feet</strong> on December 24.
            </p>
            <p>
              Scientists expect this season&apos;s El Niño Kelvin wave to lift sea level 6 to 12
              inches on top of the predictions. That puts Christmas Eve at{" "}
              <strong className="tnum">
                {lo.toFixed(1)} to {hi.toFixed(1)} feet
              </strong>
              , above the July 22 tide that flooded homes.
            </p>
          </div>
        </div>

        <figure className="lg:col-span-5 lg:order-1" data-in style={{ ["--d" as string]: 2 }}>
          <div className="relative rounded-[6px] bg-night-2 p-3 pt-4 shadow-[0_1px_0_rgb(255_255_255/0.06)_inset,0_24px_48px_-24px_rgb(0_0_0/0.6)] sm:p-5">
            <p className="px-1 text-sm font-semibold text-night-ink">
              Predicted high tide, feet above MLLW
            </p>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 block h-auto w-full" role="img" aria-labelledby="chart-desc">
              <desc id="chart-desc">
                Dot chart of NOAA predicted king tides: Oct 22 6.53 ft, Nov 25 6.89 ft, Dec 24 7.0 ft,
                Jan 22 6.83 ft. Dec 24 extends to 7.5 to 8.0 ft with the Kelvin wave. A dashed line
                marks the July 22 tide at 6.97 ft.
              </desc>
              <defs>
                <pattern id="kelvin-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="7" height="7" fill="#b98634" fillOpacity="0.28" />
                  <line x1="0" y1="0" x2="0" y2="7" stroke="#b98634" strokeWidth="3" />
                </pattern>
              </defs>

              {grid.map((g) => (
                <g key={g}>
                  <line x1={PAD.l} x2={W - PAD.r} y1={y(g)} y2={y(g)} stroke="#a9bccb" strokeOpacity="0.14" />
                  <text x={PAD.l - 10} y={y(g)} dy="0.35em" textAnchor="end" fontSize="15" fill="#a9bccb" className="tnum">
                    {g.toFixed(1)}
                  </text>
                </g>
              ))}

              {/* July 22 reference */}
              <line x1={PAD.l} x2={W - PAD.r} y1={y(july22.noaa)} y2={y(july22.noaa)} stroke="#f2f6f7" strokeWidth="1.5" strokeDasharray="6 5" />
              <text x={W - PAD.r} y={y(july22.noaa) - 8} textAnchor="end" fontSize="14" fontWeight="600" fill="#f2f6f7">
                Jul 22 flood tide: 6.97
              </text>

              {/* Kelvin range on Dec 24 */}
              {(() => {
                const i = kingTides.indexOf(dec);
                return (
                  <g>
                    <line x1={x(i)} x2={x(i)} y1={y(dec.noaa)} y2={y(lo)} stroke="#b98634" strokeWidth="2" strokeDasharray="3 4" />
                    <rect x={x(i) - 16} y={y(hi)} width="32" height={y(lo) - y(hi)} rx="4" fill="url(#kelvin-hatch)" stroke="#b98634" strokeWidth="2" />
                    <text x={x(i) + 24} y={y(hi) + 4} fontSize="14" fontWeight="700" fill="#f2f6f7" className="tnum">
                      {lo.toFixed(1)} to {hi.toFixed(1)}
                    </text>
                    <text x={x(i) + 24} y={y(hi) + 22} fontSize="13" fill="#a9bccb">
                      with Kelvin wave
                    </text>
                  </g>
                );
              })()}

              {kingTides.map((t, i) => (
                <g
                  key={t.iso}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${t.date}: ${t.noaa} feet predicted`}
                  className="cursor-default outline-none"
                >
                  <rect x={x(i) - colW / 2} y={PAD.t} width={colW} height={H - PAD.t - PAD.b} fill="transparent" />
                  <line x1={x(i)} x2={x(i)} y1={y(Y0)} y2={y(t.noaa)} stroke="#1c9aa6" strokeOpacity={hover === i ? 0.9 : 0.45} strokeWidth="2" />
                  <circle cx={x(i)} cy={y(t.noaa)} r={hover === i ? 11 : 9} fill="#1c9aa6" stroke="#0e2740" strokeWidth="2" />
                  <text x={x(i)} y={y(t.noaa) - 18} textAnchor="middle" fontSize="15" fontWeight="700" fill="#f2f6f7" className="tnum">
                    {t.noaa.toFixed(2).replace(/0$/, "")}
                  </text>
                  <text x={x(i)} y={H - PAD.b + 26} textAnchor="middle" fontSize="15" fontWeight={t.peak ? 700 : 500} fill={t.peak ? "#f2f6f7" : "#a9bccb"}>
                    {t.date}
                  </text>
                </g>
              ))}
            </svg>

            {hover !== null && (
              <div
                className="pointer-events-none absolute rounded-md bg-night px-3 py-2 text-sm shadow-lg ring-1 ring-white/15"
                style={{ left: `${(x(hover) / W) * 100}%`, top: "3.2rem", transform: "translateX(-50%)" }}
                role="status"
              >
                <div className="font-bold">{kingTides[hover].date}</div>
                <div className="tnum text-night-soft">
                  NOAA {kingTides[hover].noaa} ft
                  {kingTides[hover].peak && (
                    <>
                      <br />
                      With Kelvin wave {lo.toFixed(1)} to {hi.toFixed(1)} ft
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <figcaption className="mt-3 text-sm text-night-soft">
            NOAA predictions. Kelvin wave range: 6 to 12 inches, per news and scientific estimates.
            Wind, waves and pressure can push water higher.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
