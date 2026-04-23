import { useEffect, useState } from "react";

interface CountdownProps {
  endsAt: string;
  compact?: boolean;
}

function diff(endsAt: string) {
  const end = new Date(endsAt).getTime();
  const now = Date.now();
  const ms = Math.max(0, end - now);
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, ms };
}

export default function Countdown({ endsAt, compact }: CountdownProps) {
  const [t, setT] = useState(() => diff(endsAt));

  useEffect(() => {
    const id = setInterval(() => setT(diff(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (t.ms === 0) {
    return <span className="text-sm font-semibold text-red-500">Offre terminée</span>;
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (compact) {
    return (
      <span className="font-mono text-sm font-bold tabular-nums">
        {t.days > 0 && `${t.days}j `}
        {pad(t.hours)}:{pad(t.minutes)}:{pad(t.seconds)}
      </span>
    );
  }

  const cells = [
    { value: t.days, label: "jours" },
    { value: t.hours, label: "heures" },
    { value: t.minutes, label: "min" },
    { value: t.seconds, label: "sec" },
  ];

  return (
    <div className="flex items-center gap-2">
      {cells.map((c, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="min-w-[2.75rem] rounded-lg bg-white/95 px-2 py-1.5 text-center font-mono text-xl font-bold tabular-nums text-ink">
            {pad(c.value)}
          </div>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}
