"use client";

import { services, type ServiceKey } from "@/lib/site";

export const SERVICE_EVENT = "tidesafe:select-service";

function choose(key: ServiceKey) {
  window.dispatchEvent(new CustomEvent<ServiceKey>(SERVICE_EVENT, { detail: key }));
}

const steps = [
  {
    title: "You request an assessment",
    body: "Tell us about the property and what you've seen at past high tides. We confirm which assessment fits and book a visit.",
  },
  {
    title: "We survey the property",
    body: "Seawall cap, yard, patio, thresholds, utilities: every elevation where water could get in.",
  },
  {
    title: "You get a protection plan",
    body: "What floods at 7.0, 7.5 and 8.0 feet, and the temporary and permanent measures that stop it.",
  },
];

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[0.3rem] shrink-0">
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Assessments() {
  const certified = services.find((s) => s.key === "certified")!;
  const elevation = services.find((s) => s.key === "elevation")!;

  return (
    <section
      id="assessments"
      data-gauge="8 8"
      data-gauge-label="Assessments"
      className="chapter ground-night grain"
      aria-labelledby="assess-title"
    >
      <div className="wrap relative z-[2]">
        <h2 id="assess-title" className="display h-lg max-w-[18ch]" data-in>
          Know your flood height. Then protect it.
        </h2>
        <p className="prose-text soft mt-6 !text-night-soft" data-in style={{ ["--d" as string]: 1 }}>
          Two ways in, depending on whether you already know where past high tides reached on your
          property.
        </p>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Certified: the fuller option, raised */}
          <article
            className="rounded-[6px] bg-night-2 p-7 shadow-[0_1px_0_rgb(255_255_255/0.07)_inset,0_30px_60px_-30px_rgb(0_0_0/0.7)] sm:p-10 lg:col-span-7"
            data-in
            style={{ ["--d" as string]: 2 }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="h-md max-w-[20ch] font-[750]">{certified.name}</h3>
              <p className="text-5xl font-extrabold tracking-tight text-teal-300 tnum">{certified.price}</p>
            </div>
            <p className="mt-4 text-night-soft">{certified.forWho}</p>
            <ul className="mt-7 space-y-3">
              {certified.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-night-ink">
                  <span className="text-teal-300"><Check /></span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#request" onClick={() => choose("certified")} className="btn mt-9">
              Choose the certified survey
            </a>
          </article>

          {/* Elevation: lighter, unboxed */}
          <article className="border-t border-[var(--rule)] pt-7 lg:col-span-5 lg:mt-10" data-in style={{ ["--d" as string]: 3 }}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="h-md max-w-[16ch] font-[750]">{elevation.name}</h3>
              <p className="text-4xl font-extrabold tracking-tight tnum">{elevation.price}</p>
            </div>
            <p className="mt-4 text-night-soft">{elevation.forWho}</p>
            <ul className="mt-6 space-y-3">
              {elevation.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-night-ink">
                  <span className="text-night-soft"><Check /></span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#request" onClick={() => choose("elevation")} className="btn btn-ghost mt-8">
              Choose the elevation assessment
            </a>
          </article>
        </div>

        <ol className="mt-24 grid gap-x-10 gap-y-10 border-t border-[var(--rule)] pt-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} data-in style={{ ["--d" as string]: i }}>
              <p className="text-sm font-bold text-teal-300">Step {i + 1}</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-night-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
