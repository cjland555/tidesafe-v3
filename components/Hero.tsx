import { CTA_LABEL } from "./TopBar";
import DaysLeft from "./DaysLeft";

/*
  Layered title plate from the 7.0 ft photo:
  1. plate: the house and yard (slowest, settles back)
  2. headline: sits over the yard, drifts down
  3. water: the harbor cut out along the fence line, rises fastest and swallows the
     bottom of the headline
  4. front: sub, CTA and countdown, above everything, fade early
*/
export default function Hero() {
  return (
    <section
      id="top"
      data-act="pin"
      data-gauge="4.5 6.97"
      data-gauge-label="Title"
      className="hero ground-night"
      aria-labelledby="hero-title"
    >
      <div className="hero-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="hero-layer hero-plate" aria-hidden="true">
          <img src="/v3/hero-plate.webp" alt="" width={1422} height={789} fetchPriority="high" />
        </div>
        <div className="hero-layer hero-scrim" aria-hidden="true" />

        <div className="hero-layer hero-headline">
          <div className="wrap flex h-full flex-col pt-[18vh] md:pt-[17vh]">
            <h1 id="hero-title" className="display h-xl max-w-[13ch] text-night-ink [text-shadow:0_2px_24px_rgb(7_26_44/0.45)]">
              An 8-foot tide could reach Newport Harbor on Christmas&nbsp;Eve.
            </h1>
          </div>
        </div>

        <div className="hero-layer hero-water" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/v3/hero-water.webp" alt="" width={1422} height={1039} />
        </div>

        <div className="hero-layer hero-front pointer-events-none">
          <div className="wrap flex h-full flex-col justify-end pb-[max(6.5rem,13vh)] md:pb-[11vh]">
            <div className="pointer-events-auto max-w-xl">
              <p className="text-lg leading-snug font-medium text-night-ink md:text-xl [text-shadow:0_1px_12px_rgb(7_26_44/0.7)]">
                We measure where the water would enter your property, and show you how to keep
                it out.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="#request" className="btn">
                  {CTA_LABEL}
                </a>
                <DaysLeft />
              </div>
            </div>
          </div>
        </div>
        <p className="sr-only">
          Photo: a Newport Harbor home at a 7.0 foot tide, with water over the seawall and into
          the yard.
        </p>
      </div>
    </section>
  );
}
