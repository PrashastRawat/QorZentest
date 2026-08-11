import { useState } from "react";
import { Zap, ShieldCheck, Cpu, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import aboutImage from "../../assets/services/about.jpg";
import { Link } from "react-router-dom";

const pillars = [
  {
    id: "speed",
    title: "Extreme Speed & Low Latency",
    icon: Zap,
    subtitle: "Built for instant execution",
    desc: "We leverage edge computing, micro-caching, and optimized codebases to deliver sub-50ms render times and lightning-fast API responses.",
    metrics: "< 35ms Edge Latency",
  },
  {
    id: "ai",
    title: "Autonomous AI Integration",
    icon: Cpu,
    subtitle: "Next-generation intelligence",
    desc: "Embed custom fine-tuned LLM agents, automated workflow pipelines, and predictive analytics into your core products.",
    metrics: "99.98% Model Precision",
  },
  {
    id: "security",
    title: "Enterprise Zero-Trust Security",
    icon: ShieldCheck,
    subtitle: "Bank-grade data protection",
    desc: "End-to-end encryption, strict role-based access control (RBAC), and automated vulnerability monitoring keep your systems secure.",
    metrics: "100% Security Compliant",
  },
  {
    id: "scale",
    title: "Infinite Cloud Scalability",
    icon: TrendingUp,
    subtitle: "Architected for hyper-growth",
    desc: "Microservices and cloud-native infrastructure designed to dynamically auto-scale from thousands to millions of active concurrent users.",
    metrics: "10x Concurrency Peak",
  },
];

export default function About() {
  const [activePillar, setActivePillar] = useState(pillars[0]);

  return (
    <section className="section bg-dark-900 text-white">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading & Pillar Selector */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1.5 text-xs font-semibold text-purple-300">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                ABOUT QORZEN TECHNOLOGIES
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                Engineered for speed. Built for <span className="text-gradient-brand">exponential growth.</span>
              </h2>
              <p className="mt-4 text-base text-slate-400 sm:text-lg leading-relaxed">
                QorZen is a technology partner that designs, builds, and scales mission-critical software. We combine cutting-edge AI, modern web frameworks, and resilient cloud architecture.
              </p>
            </div>

            {/* Pillar Tabs */}
            <div className="space-y-3">
              {pillars.map((item) => {
                const Icon = item.icon;
                const isActive = activePillar.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActivePillar(item)}
                    className={`cursor-pointer rounded-2xl border p-4.5 transition-all duration-300 ${
                      isActive
                        ? "border-brand-500/80 bg-slate-900/90 shadow-glow"
                        : "border-slate-800/80 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                          isActive
                            ? "bg-brand-600 text-white shadow-glow"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Icon size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-white">{item.title}</h3>
                          <span
                            className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                              isActive
                                ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                                : "bg-slate-900 text-slate-500"
                            }`}
                          >
                            {item.metrics}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <Link to="/about" className="btn-secondary group inline-flex">
                Learn More About Our Team
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Preview Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
              {/* Image Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 group">
                <img
                  src={aboutImage}
                  alt="QorZen Engineering Team"
                  className="h-[360px] sm:h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                
                {/* Floating Metric Badge */}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Selected Focus</div>
                      <div className="text-sm font-bold text-white mt-0.5">{activePillar.title}</div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                      <CheckCircle size={14} />
                      <span>{activePillar.metrics}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat Counters Row Below Image */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-xl sm:text-2xl font-black text-white">150+</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Projects Delivered</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-xl sm:text-2xl font-black text-brand-400">99.8%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Client Satisfaction</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-xl sm:text-2xl font-black text-purple-400">24/7</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Dedicated SLA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}