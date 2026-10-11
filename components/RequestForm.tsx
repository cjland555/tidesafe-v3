"use client";

import { useEffect, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { site, type ServiceKey } from "@/lib/site";
import { SERVICE_EVENT } from "./Assessments";
import { CTA_LABEL } from "./TopBar";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[6px] border border-white/15 bg-night px-4 py-3 text-night-ink placeholder:text-night-soft/70 transition-colors duration-150 focus:border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/30";
const label = "mb-1.5 block text-sm font-semibold text-night-ink";

export default function RequestForm() {
  const [service, setService] = useState<ServiceKey | "unsure">("unsure");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const onSelect = (e: Event) => setService((e as CustomEvent<ServiceKey>).detail);
    window.addEventListener(SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SERVICE_EVENT, onSelect);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    if (!site.formspreeId) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      track("assessment_request", { service: String(data.get("service")) });
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="request"
      data-gauge="8 8"
      data-gauge-label="Your home"
      data-gauge-home
      className="chapter ground-night grain"
      aria-labelledby="request-title"
    >
      <div className="wrap relative z-[2] grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="request-title" className="display h-lg" data-in>
            Find out where the water gets into your home.
          </h2>
          <p className="prose-text mt-6" data-in style={{ ["--d" as string]: 1 }}>
            Tell us about your property. We&apos;ll reply within one business day to confirm the
            right assessment and set a time to visit, well before December 24.
          </p>
          <dl className="mt-10 space-y-6" data-in style={{ ["--d" as string]: 2 }}>
            <div>
              <dt className="text-sm font-semibold text-night-soft">Call or text</dt>
              <dd className="mt-1 text-2xl font-bold tracking-tight tnum">
                <a href={site.phoneHref} className="hover:text-teal-300">
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-night-soft">Email</dt>
              <dd className="mt-1 text-2xl font-bold tracking-tight">
                <a href={`mailto:${site.email}`} className="hover:text-teal-300">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div
          className="rounded-[6px] bg-night-2 p-6 shadow-[0_1px_0_rgb(255_255_255/0.07)_inset,0_30px_60px_-30px_rgb(0_0_0/0.7)] sm:p-10 lg:col-span-7"
          data-in
          style={{ ["--d" as string]: 1 }}
        >
          {status === "sent" ? (
            <div className="py-12 text-center" role="status">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-300 text-night">
                <svg width="26" height="26" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-6 text-3xl font-extrabold tracking-tight">Request received.</h3>
              <p className="mx-auto mt-3 max-w-sm text-night-soft">
                Thank you. We&apos;ll be in touch within one business day. If it&apos;s urgent, call or
                text {site.phoneDisplay}.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input type="hidden" name="_subject" value="New TideSafe assessment request" />

              <div className="sm:col-span-2">
                <label htmlFor="name" className={label}>Full name</label>
                <input id="name" name="name" required autoComplete="name" className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className={label}>Property address</label>
                <input id="address" name="address" required autoComplete="street-address" placeholder="e.g. Balboa Island, Newport Beach" className={field} />
              </div>
              <div>
                <label htmlFor="phone" className={label}>Phone</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
              </div>
              <div>
                <label htmlFor="email" className={label}>Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="service" className={label}>Assessment</label>
                <select
                  id="service"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceKey | "unsure")}
                  className={field}
                >
                  <option value="unsure">Not sure yet, help me choose</option>
                  <option value="elevation">Property Elevation Assessment ($800)</option>
                  <option value="certified">Certified Survey &amp; Flood Risk Assessment ($3,100)</option>
                </select>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className={label}>Do you know where past high tides reached on your property?</legend>
                <div className="mt-1 flex flex-wrap gap-2.5">
                  {["Yes", "No", "Not sure"].map((v) => (
                    <label
                      key={v}
                      className="flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-white/20 transition-colors duration-150 has-[:checked]:bg-teal-300 has-[:checked]:text-night has-[:checked]:ring-teal-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-300"
                    >
                      <input type="radio" name="knows_past_tides" value={v} className="sr-only" defaultChecked={v === "Not sure"} />
                      {v}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="notes" className={label}>
                  Anything we should know? <span className="font-normal text-night-soft">(optional)</span>
                </label>
                <textarea id="notes" name="notes" rows={3} placeholder="Past flooding, seawall condition, timing" className={field} />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === "sending"} className="btn w-full !py-4 !text-lg">
                  {status === "sending" ? "Sending" : CTA_LABEL}
                </button>
                {status === "error" && (
                  <p className="mt-3 text-sm text-night-ink" role="alert">
                    Sorry, that didn&apos;t go through. Please call or text {site.phoneDisplay} or email{" "}
                    <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.
                  </p>
                )}
                <p className="mt-3 text-center text-xs text-night-soft">
                  We only use your details to contact you about your assessment.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
