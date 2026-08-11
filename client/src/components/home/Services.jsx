import { ArrowUpRight, Cpu, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getServices } from "../../api/serviceApi";
import services from "../../data/services";

export default function Services() {
  const { data } = useFetch(getServices, services);
  const items = Array.isArray(data) && data.length ? data : services;

  return (
    <section className="section bg-dark-800/60 text-white border-y border-slate-800/80">
      {/* Background Glow Accents */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="container-page relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-950/40 px-3.5 py-1.5 text-xs font-semibold text-brand-300">
            <Sparkles size={14} className="text-brand-400" />
            ENTERPRISE CAPABILITIES
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Services Built to <span className="text-gradient-brand">Scale Enterprises.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg mx-auto">
            From modern AI automation pipelines to full-stack engineering and cloud infrastructure, explore our end-to-end software capabilities.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
            const fallbackMatch = services.find((s) => s._id === service._id);
            const image = service.image || fallbackMatch?.image;

            return (
              <Link
                to={`/services/${service._id}`}
                key={service._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-brand-500/60 hover:shadow-glow"
              >
                {/* Glowing Top Edge Line */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  {/* Card Header: Image / Badge */}
                  <div className="relative mb-5 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 h-48 w-full">
                    {image ? (
                      <img
                        src={image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-950/60 to-slate-900">
                        <Cpu className="h-12 w-12 text-brand-400" />
                      </div>
                    )}
                    
                    {/* Icon Badge Overlay */}
                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-slate-950/80 text-sm font-black text-brand-300 backdrop-blur-md shadow-lg">
                      {service.icon || service.title?.charAt(0) || "S"}
                    </div>
                  </div>

                  {/* Title & Arrow */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-white transition group-hover:text-brand-300">
                      {service.title}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-glow">
                      <ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 text-brand-400">
                    <Zap size={12} />
                    High SLA Delivery
                  </span>
                  <span className="text-slate-400 group-hover:text-slate-200 transition">Explore Details &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}