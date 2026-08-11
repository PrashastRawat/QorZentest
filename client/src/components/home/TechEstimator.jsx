import { useState } from "react";
import { Calculator, ArrowRight, CheckCircle2, Sparkles, Server, Cpu, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const projectTypes = [
  { id: "ai", label: "AI & ML Agents", icon: Cpu, baseTime: "3-6 Weeks", stack: "Python, PyTorch, OpenAI / Local LLMs, FastAPI, Vector DB" },
  { id: "web", label: "Full-Stack Web App", icon: Globe, baseTime: "4-8 Weeks", stack: "React, Node.js / Next.js, PostgreSQL, Tailwind, AWS Edge" },
  { id: "cloud", label: "Cloud Infra & DevOps", icon: Server, baseTime: "2-4 Weeks", stack: "Kubernetes, Docker, Terraform, AWS Lambda, CI/CD Pipelines" },
  { id: "security", label: "Security & Audits", icon: Shield, baseTime: "1-3 Weeks", stack: "Zero-Trust Mesh, Auth0, Pentesting, Automated Vulnerability Scans" },
];

const userScales = [
  { id: "startup", label: "< 10k Active Users", multiplier: "Standard Scale SLA" },
  { id: "growth", label: "10k - 250k Users", multiplier: "Auto-Scaling Infra SLA" },
  { id: "enterprise", label: "500k+ High Traffic", multiplier: "99.999% Multi-Region SLA" },
];

export default function TechEstimator() {
  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [selectedScale, setSelectedScale] = useState(userScales[1]);

  return (
    <section className="section bg-dark-800/80 text-white border-y border-slate-800">
      <div className="container-page relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-brand-500/30 bg-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-950/50 px-3.5 py-1.5 text-xs font-semibold text-brand-300">
              <Calculator size={14} className="text-brand-400" />
              INTERACTIVE ARCHITECTURE ESTIMATOR
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Build Your Custom <span className="text-gradient-brand">Tech Solution</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
              Select your product requirements below to instantly generate a recommended tech stack, architectural blueprint, and estimated SLA timeline.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {/* Step 1: Select Project Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                1. Select Solution Domain
              </label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                        isSelected
                          ? "border-brand-500 bg-brand-950/40 text-white shadow-glow"
                          : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <Icon size={24} className={isSelected ? "text-brand-400" : "text-slate-500"} />
                      <span className="mt-2 text-xs font-bold">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Target User Scale */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                2. Expected User Concurrency & Scale
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {userScales.map((scale) => {
                  const isSelected = selectedScale.id === scale.id;
                  return (
                    <button
                      key={scale.id}
                      onClick={() => setSelectedScale(scale)}
                      className={`rounded-xl border p-3.5 text-center transition-all ${
                        isSelected
                          ? "border-purple-500 bg-purple-950/40 text-white shadow-glow"
                          : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <div className="text-xs font-bold">{scale.label}</div>
                      <div className="mt-1 text-[11px] text-slate-500">{scale.multiplier}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Architecture Breakdown Output Box */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-400" />
                  <span className="text-sm font-bold text-white">Recommended Architecture Blueprint</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle2 size={14} />
                  <span>SLA Delivery: {selectedType.baseTime}</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">Recommended Tech Stack</span>
                  <p className="text-slate-200 font-mono leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    {selectedType.stack}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block mb-1">Infrastructure Guarantee</span>
                  <p className="text-slate-200 font-mono leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    {selectedScale.multiplier} with automated edge caching & zero-downtime CI/CD deployment.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Ready to turn this specification into a live product?
                </span>
                <Link to="/contact" className="btn-primary !py-2.5 !px-5 text-xs group">
                  Book Technical Consultation
                  <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
