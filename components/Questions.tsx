import { faqs } from "@/lib/site";

export default function Questions() {
  return (
    <section
      id="faq"
      data-gauge="8 8"
      data-gauge-label="Questions"
      className="chapter ground-fog grain"
      aria-labelledby="faq-title"
    >
      <div className="wrap relative z-[2] grid gap-10 lg:grid-cols-12">
        <h2 id="faq-title" className="display h-lg lg:col-span-4" data-in>
          What waterfront owners ask us
        </h2>
        <div className="border-y border-[var(--rule)] lg:col-span-8">
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-[var(--rule)] last:border-b-0">
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-lg font-bold tracking-tight [&::-webkit-details-marker]:hidden"
                data-in
                style={{ ["--d" as string]: i }}
              >
                {f.q}
                <span
                  aria-hidden="true"
                  className="relative h-7 w-7 shrink-0 rounded-full ring-1 ring-[var(--rule)] transition-transform duration-200 group-open:rotate-45"
                >
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current" />
                </span>
              </summary>
              <p className="prose-text pb-6 pr-10 !text-fog-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
