import { ArrowRight, Sparkles, MessageSquare, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-dark-900 py-24 text-white">
      {/* Radiant Gradient Background Orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-600/30 via-purple-600/20 to-indigo-600/30 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-dark-grid opacity-50" />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-brand-500/40 bg-gradient-to-b from-slate-900/90 to-dark-900/90 p-10 sm:p-16 text-center shadow-glow-lg backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-950/60 px-4 py-1.5 text-xs font-semibold text-brand-300 shadow-glow">
            <Sparkles size={14} className="text-brand-400" />
            READY TO ELEVATE YOUR DIGITAL PRODUCT?
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
            Let’s Build Something <span className="text-gradient-brand">Extraordinary Together.</span>
          </h2>

          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg mx-auto leading-relaxed">
            Schedule a technical strategy call with our software architects to analyze your product goals, technical stack, and timeline.
          </p>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Link to="/contact" className="btn-primary group !px-8 !py-4 text-base font-bold">
              Start Your Project Now
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/portfolio" className="btn-secondary !px-8 !py-4 text-base font-bold">
              <MessageSquare size={18} className="mr-2 text-slate-400" />
              Explore Portfolio
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-xs text-slate-400 border-t border-slate-800/80 pt-8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for New Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⚡ Fast 24-Hour Response SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒 Confidentiality & NDA Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
