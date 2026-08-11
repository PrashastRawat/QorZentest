import { Sparkles, Shield, Cpu, Cloud, Code, Database, Zap, Lock, Globe } from "lucide-react";

const capabilities = [
  { label: "AI & Automation Pipelines", icon: Cpu },
  { label: "Data Science & Predictive Analytics", icon: Database },
  { label: "Cloud Microservices & DevOps", icon: Cloud },
  { label: "High-Scale Full-Stack Engineering", icon: Code },
  { label: "Zero-Trust Cyber Security", icon: Lock },
  { label: "High-Converting Web Platforms", icon: Globe },
  { label: "Enterprise Infrastructure", icon: Shield },
  { label: "Real-Time AI Agents", icon: Zap },
];

export default function ServicesTicker() {
  const loopedItems = [...capabilities, ...capabilities, ...capabilities];

  return (
    <div className="relative w-full overflow-hidden border-y border-slate-800/80 bg-slate-950 py-5">
      {/* Subtle Side Glow Overlays */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-dark-900 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-dark-900 to-transparent" />

      <div className="services-ticker-track flex w-max items-center gap-6">
        {loopedItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.label}-${i}`}
              className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/60 px-5 py-2.5 shadow-sm backdrop-blur-md transition hover:border-brand-500/50"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                <Icon size={14} />
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 whitespace-nowrap">
                {item.label}
              </span>
              <Sparkles size={12} className="text-slate-600" />
            </div>
          );
        })}
      </div>

      <style>{`
        .services-ticker-track {
          animation: qz-services-scroll 35s linear infinite;
        }
        @keyframes qz-services-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .services-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}