import { site } from "@/lib/site";
import Logo from "./Logo";

export const CTA_LABEL = "Request an assessment";

export default function TopBar() {
  return (
    <header className="ground-night fixed inset-x-0 top-0 z-40 h-14 border-b border-white/10 !bg-night/95">
      <div className="flex h-full items-center justify-between gap-4 px-[var(--gutter)] lg:pl-5">
        <a href="#top" aria-label="TideSafe home" className="rounded-md">
          <Logo tone="dark" />
        </a>
        <div className="flex items-center gap-5">
          <a
            href={site.phoneHref}
            className="hidden text-sm font-semibold text-night-ink tnum hover:text-teal-300 sm:block"
          >
            {site.phoneDisplay}
          </a>
          <a href="#request" className="btn hidden !py-2.5 !text-sm md:inline-flex">
            {CTA_LABEL}
          </a>
        </div>
      </div>
    </header>
  );
}

export function MobileCta() {
  return (
    <div className="ground-night fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-white/10 !bg-night/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a href={site.phoneHref} className="btn btn-ghost flex-1 !py-3 !text-sm">
        Call
      </a>
      <a href="#request" className="btn flex-[2.2] !py-3 !text-sm">
        {CTA_LABEL}
      </a>
    </div>
  );
}
