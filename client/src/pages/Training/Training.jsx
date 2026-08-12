import { useParams, Link, Navigate } from "react-router-dom";
import { Cpu, Users2, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { TECHNICAL_DOMAINS, NON_TECHNICAL_DOMAINS } from "../../data/trainingDomains";

const TRACKS = {
  technical: {
    label: "Technical",
    eyebrow: "Build the skills employers hire for",
    blurb:
      "Hands-on, job-focused programs across development, data, security and design — pick a domain and start training.",
    icon: Cpu,
    domains: TECHNICAL_DOMAINS,
  },
  "non-technical": {
    label: "Non-Technical",
    eyebrow: "Grow a career beyond code",
    blurb:
      "Practical training for business, marketing and support roles — built for people who want real, placement-ready skills.",
    icon: Users2,
    domains: NON_TECHNICAL_DOMAINS,
  },
};

export default function Training() {
  const { type } = useParams();
  const track = TRACKS[type];

  if (!track) return <Navigate to="/training/technical" replace />;

  const OtherIcon = type === "technical" ? Users2 : Cpu;
  const otherType = type === "technical" ? "non-technical" : "technical";
  const otherLabel = TRACKS[otherType].label;
  const Icon = track.icon;

  return (
    <section className="relative overflow-hidden bg-white py-20 text-slate-900 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 75% 55% at 50% 20%, black 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 20%, black 30%, transparent 85%)",
        }}
      />

      <div className="container-page relative">
        {/* Track switcher */}
        <div className="mx-auto mb-10 flex max-w-md items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1.5">
          {Object.entries(TRACKS).map(([key, t]) => (
            <Link
              key={key}
              to={`/training/${key}`}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                key === type
                  ? "bg-brand-600 text-white shadow-soft"
                  : "text-slate-600 hover:text-brand-600"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </Link>
          ))}
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
            <Sparkles size={16} className="text-brand-600" /> {track.eyebrow}
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-brand-600">{track.label}</span> Domains
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {track.blurb}
          </p>
        </div>

        {/* Domain grid */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-3.5 sm:grid-cols-2">
          {track.domains.map((domain) => (
            <div
              key={domain}
              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={17} />
              </span>
              <span className="text-sm font-semibold text-slate-800">{domain}</span>
              <CheckCircle2
                size={18}
                className="ml-auto shrink-0 text-slate-200 transition group-hover:text-brand-600"
              />
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-5xl text-right text-xs text-slate-400">
          Note — 18% GST exclude
        </p>

        {/* CTA */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-bold text-slate-900">Don't see your domain?</p>
            <p className="mt-1 text-sm text-slate-600">
              We're always adding new tracks — reach out and we'll set one up for you.
            </p>
          </div>
          <Link to="/contact" className="btn-primary shrink-0">
            Talk to Us <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Looking for the other track?{" "}
          <Link to={`/training/${otherType}`} className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline">
            <OtherIcon size={14} /> View {otherLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}