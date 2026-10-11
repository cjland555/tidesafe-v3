import Image from "next/image";
import { tideSteps } from "@/lib/site";

const levels = tideSteps.map((s) => s.level).join(",");

const big = (i: number) => (i === 0 ? "Normal" : `${tideSteps[i].level.toFixed(1)} ft`);
const sub = [
  "high tide",
  "high tide",
  "high tide, no barrier",
  "with 2 layers of sandbags",
  "with 4 layers of sandbags",
];

export function QuietLine() {
  return (
    <section
      className="ground-fog grain"
      data-gauge="7.5 4.5"
      data-gauge-label="One house"
      aria-label="Introduction to the five tide levels"
    >
      <div className="wrap relative z-[2] py-[clamp(6rem,18vh,11rem)]">
        <p className="display h-lg max-w-[22ch]" data-in>
          Here is what those numbers look like at one house.
        </p>
      </div>
    </section>
  );
}

export default function FiveTides() {
  return (
    <section
      id="five-tides"
      data-act="pin"
      data-steps={tideSteps.length}
      data-step="0"
      data-gauge="4.5 8"
      data-gauge-steps={levels}
      data-gauge-label="Five tides"
      className="peak ground-night"
      aria-labelledby="peak-title"
    >
      <div className="peak-stage">
        <div className="absolute inset-0">
          {tideSteps.map((s, i) => (
            <div key={s.src} className="peak-img" style={{ ["--i" as string]: i }}>
              <Image
                src={s.src}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="peak-scrim absolute inset-0" aria-hidden="true" />

        <div className="relative z-[2] h-full">
          <div className="wrap flex h-full flex-col justify-end pb-[8.5rem] pt-24 md:justify-center md:pb-12">
            <h2 id="peak-title" className="dateline !text-night-ink">
              <span>One Newport Harbor home</span>
              <span>
                <b>Five tide levels</b>
              </span>
            </h2>
            <div className="relative mt-4 min-h-[15rem] max-w-md md:min-h-[17rem]">
              {tideSteps.map((s, i) => (
                <div key={s.label} className="peak-cap inset-0" data-cap={i} aria-hidden="true">
                  <p className="display text-[clamp(3.2rem,8vw,6.5rem)] text-night-ink tnum">
                    {big(i)}
                  </p>
                  <p className="mt-1 text-lg font-bold text-teal-300">{sub[i]}</p>
                  <p className="prose-text mt-3 !text-night-ink [text-shadow:0_1px_8px_rgb(7_26_44/0.6)]">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="peak-held mt-2 text-xl font-extrabold tracking-tight text-night-ink">
              The lawn stays dry.
            </p>
          </div>
        </div>
      </div>

      {/* Reduced motion and screen readers: the same five frames as a plain list */}
      <ol className="peak-static wrap hidden space-y-12 py-[var(--section)]">
        {tideSteps.map((s, i) => (
          <li key={s.label}>
            <figure>
              <div className="relative aspect-video overflow-hidden rounded-[6px]">
                <Image src={s.src} alt={`${s.label} at a Newport Harbor home`} fill sizes="100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3">
                <span className="text-2xl font-extrabold">{big(i)}</span>{" "}
                <span className="font-bold text-teal-300">{sub[i]}</span>
                <span className="prose-text mt-1 block">{s.note}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
      <ol className="sr-only motion-reduce:hidden">
        {tideSteps.map((s) => (
          <li key={s.label}>
            {s.label}: {s.note}
          </li>
        ))}
      </ol>
    </section>
  );
}
