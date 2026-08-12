import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alexander Wright",
    role: "VP of Technology",
    company: "NexusCloud Global",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "QorZen transformed our legacy infrastructure into a cloud-native microservices architecture. Our latency dropped by 65% and deployment frequency went from monthly to daily.",
    impact: "65% Latency Reduction",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Head of Product",
    company: "Synapse AI Labs",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "The autonomous LLM agents developed by QorZen handle over 80% of our customer workflow routing seamlessly. Their engineering team is unmatched in execution quality.",
    impact: "80% Workflow Automation",
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "Chief Executive Officer",
    company: "Vanguard Tech Ops",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    quote: "Partnering with QorZen gave us access to senior full-stack developers who understood our domain from day one. They delivered our MVP 3 weeks ahead of schedule.",
    impact: "3 Weeks Ahead of Schedule",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="section bg-dark-800/50 text-white border-t border-slate-800">
      <div className="container-page relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <Quote size={14} className="text-emerald-400" />
            CLIENT SUCCESS & REVIEWS
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Trusted by Innovators <span className="text-gradient-brand">Worldwide.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg mx-auto">
            Discover how leading enterprises and fast-growing technology companies scale faster with QorZen.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="mt-14 mx-auto max-w-4xl">
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
            <Quote className="absolute top-8 right-8 text-brand-500/10 h-24 w-24 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Client Avatar */}
              <div className="relative shrink-0">
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-2 border-brand-500/50 shadow-glow"
                />
                <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <CheckCircle size={14} />
                </div>
              </div>

              {/* Client Feedback Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating Stars */}
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed italic">
                  "{current.quote}"
                </p>

                {/* Info & Metric Badge */}
                <div className="mt-6 flex flex-wrap items-center justify-between border-t border-slate-800 pt-4 gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{current.name}</h3>
                    <p className="text-xs text-slate-400">{current.role} • <span className="text-brand-300">{current.company}</span></p>
                  </div>
                  <div className="rounded-full bg-brand-500/15 border border-brand-500/30 px-3.5 py-1 text-xs font-semibold text-brand-300">
                    ⚡ {current.impact}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-800/80 pt-4">
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx ? "w-8 bg-brand-500" : "w-2 bg-slate-800"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:border-brand-500 hover:text-white transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:border-brand-500 hover:text-white transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
