"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function DaysLeft({ className = "" }: { className?: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(site.countdownTarget).getTime();
    const update = () => setDays(Math.max(0, Math.ceil((target - Date.now()) / 86_400_000)));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`text-sm font-semibold text-night-ink [text-shadow:0_1px_10px_rgb(7_26_44/0.8)] ${className}`}>
      <span className="text-2xl font-extrabold tracking-tight text-teal-300 tnum">
        {days ?? "  "}
      </span>{" "}
      days to the Dec 24 king tide
    </p>
  );
}
