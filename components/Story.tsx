"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Story() {
  const [play, setPlay] = useState(false);

  return (
    <section
      id="story"
      data-gauge="8 8"
      data-gauge-label="Why TideSafe"
      className="chapter ground-fog grain"
      aria-labelledby="story-title"
    >
      <div className="wrap relative z-[2] grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <h2 id="story-title" className="display h-lg" data-in>
            38 years on the harbor. Then July 22.
          </h2>
          <div className="prose-text mt-8" data-in style={{ ["--d" as string]: 1 }}>
            <p>
              My parents have lived on the harbor for 38 years and have been through countless high
              tides. Then came July 22, 2026. The predicted tide was 6.97 feet, and it flooded and
              damaged some bayfront homes.
            </p>
            <p>
              King tides return in November, December and January, and the highest is predicted at
              7 feet. The El Niño Kelvin wave could add another 6 to 12 inches. Experts are telling
              us to be ready for an 8-foot king tide on December 24.
            </p>
            <p>
              So we&apos;re protecting my parents&apos; home now, with a 15-inch sandbag barrier.
              That experience is why I started TideSafe: to help other waterfront homeowners
              understand their flood risk and prepare <em>before</em> these extreme tides arrive.
            </p>
          </div>
          <p className="mt-8 font-[family-name:var(--font-text)] text-xl italic" data-in style={{ ["--d" as string]: 2 }}>
            {site.founder}, Founder
          </p>
        </div>

        <figure className="lg:col-span-6 lg:pt-3" data-in style={{ ["--d" as string]: 1 }}>
          <div className="relative aspect-video overflow-hidden rounded-[6px] bg-night shadow-[0_24px_48px_-24px_rgb(11_34_56/0.55)]">
            {play ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${site.youtubeId}?autoplay=1&rel=0`}
                title="TideSafe sandbag barrier demo at a Newport Harbor home"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlay(true)}
                className="group absolute inset-0 h-full w-full"
                aria-label="Play the TideSafe demo video"
              >
                <Image
                  src="/v3/tide-7-5.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-night/25" />
                <span className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fog-2 shadow-[0_10px_30px_-8px_rgb(7_26_44/0.7)] transition-transform duration-150 group-active:scale-95">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#071a2c" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
          <figcaption className="mt-3 text-sm text-fog-soft">
            Our demo at a Newport Harbor home: each rising tide level and the sandbag protection it
            takes to keep the water out.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
