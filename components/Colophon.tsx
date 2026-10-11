import { site, sources } from "@/lib/site";
import Logo from "./Logo";

export default function Colophon() {
  return (
    <footer className="ground-night border-t border-white/10 pb-32 pt-14 text-sm md:pb-14" data-gauge="8 8" data-gauge-label="Your home" data-gauge-home>
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo tone="dark" />
          <p className="mt-4 max-w-xs leading-relaxed text-night-soft">
            Flood risk assessments for waterfront homes on Newport Harbor.
          </p>
          <p className="mt-4 leading-relaxed">
            <a className="hover:text-teal-300 tnum" href={site.phoneHref}>{site.phoneDisplay}</a>
            <br />
            <a className="hover:text-teal-300" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <div className="md:col-span-3">
          <h2 className="font-bold">Serving</h2>
          <p className="mt-3 leading-relaxed text-night-soft">{site.serviceArea.join(" · ")}</p>
        </div>
        <div className="md:col-span-5">
          <h2 className="font-bold">Sources</h2>
          <ul className="mt-3 space-y-2">
            {sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-night-soft underline decoration-white/25 underline-offset-4 hover:text-night-ink hover:decoration-teal-300"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-night-soft">
            Tide heights are NOAA predictions in feet above Mean Lower Low Water (MLLW). Kelvin wave
            effects are estimates. Real water levels also depend on wind, waves and atmospheric
            pressure.
          </p>
        </div>
      </div>
      <p className="wrap mt-12 text-xs text-night-soft">
        © {new Date().getFullYear()} TideSafe · Newport Beach, California
      </p>
    </footer>
  );
}
