import Image from "next/image";
import { july22 } from "@/lib/site";

export default function July22() {
  return (
    <section
      id="july-22"
      data-gauge={`${july22.noaa} ${july22.noaa}`}
      data-gauge-label="July 22"
      className="chapter ground-fog grain"
      aria-labelledby="july-title"
    >
      <div className="wrap relative z-[2] grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-6">
          <p className="dateline" data-in>
            <span>Wednesday, July 22, 2026</span>
            <span>Newport Bay</span>
            <span>
              NOAA predicted <b className="tnum">{july22.noaa} ft</b>
            </span>
          </p>
          <h2 id="july-title" className="display h-lg mt-6" data-in style={{ ["--d" as string]: 1 }}>
            A 6.97-foot tide came over the wall.
          </h2>
          <div className="prose-text mt-7" data-in style={{ ["--d" as string]: 2 }}>
            <p>
              On July 22 the harbor flooded and damaged some bayfront homes. The prediction was
              under 7 feet. The December 24 king tide is forecast at 7.0 feet, before the Kelvin
              wave is added.
            </p>
            <p>
              At the home in these photos, the gap between water touching the brick cap and water
              in the yard was 0.3 feet: <strong>about 4 inches</strong>, from 6.7 to 7.0.
            </p>
          </div>
        </div>

        <figure className="lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] shadow-[0_24px_48px_-24px_rgb(11_34_56/0.55)]" data-reveal>
            <Image
              src="/v3/tide-7-0.webp"
              alt="A Newport Harbor home at a 7.0 foot tide. Water is over the seawall, around the white fence posts and into the lawn."
              fill
              sizes="(min-width: 1024px) 680px, 100vw"
              className="object-cover object-[50%_45%]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-fog-soft">
            7.0 ft at a Newport Harbor home. Over the seawall, into the lawn.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
