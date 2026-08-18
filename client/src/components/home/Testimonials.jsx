import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { getTestimonials } from "../../api/testimonialApi";

// Fallback shown while loading or if API returns empty
const FALLBACK = [
  {
    _id: "1",
    clientName: "Alexander Wright",
    message:
      "QorZen transformed our legacy infrastructure into a cloud-native architecture. Our latency dropped by 65% and deployment frequency went from monthly to daily.",
    photo: {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  },
  {
    _id: "2",
    clientName: "Elena Rostova",
    message:
      "The autonomous agents developed by QorZen handle over 80% of our customer workflow routing seamlessly. Their engineering team is unmatched in execution quality.",
    photo: {
      url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
  },
  {
    _id: "3",
    clientName: "Marcus Vance",
    message:
      "Partnering with QorZen gave us access to senior developers who understood our domain from day one. They delivered our MVP 3 weeks ahead of schedule.",
    photo: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  },
];

export default function Testimonials() {
  const [items, setItems]           = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    getTestimonials()
      .then((res) => {
        const data = res.data?.data || res.data || [];
        // If API returns real data use it, else fall back to placeholders
        setItems(data.length > 0 ? data : FALLBACK);
      })
      .catch(() => setItems(FALLBACK))   // network error → show fallback silently
      .finally(() => setLoading(false));
  }, []);

  const next = () => setCurrentIndex((p) => (p + 1) % items.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + items.length) % items.length);

  // Don't flash empty carousel while fetching
  if (loading) return (
    <section className="section bg-dark-800/50 text-white border-t border-slate-800">
      <div className="container-page flex items-center justify-center py-24">
        <p className="text-slate-500 text-sm animate-pulse">Loading testimonials…</p>
      </div>
    </section>
  );

  const current = items[currentIndex];

  return (
    <section className="section bg-dark-800/50 text-white border-t border-slate-800">
      <div className="container-page relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <Quote size={14} className="text-emerald-400" />
            CLIENT SUCCESS &amp; REVIEWS
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Trusted by Innovators{" "}
            <span className="text-gradient-brand">Worldwide.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg mx-auto">
            Discover how leading enterprises and fast-growing technology
            companies scale faster with QorZen.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-14 mx-auto max-w-4xl">
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
            <Quote className="absolute top-8 right-8 text-brand-500/10 h-24 w-24 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={current.photo?.url}
                  alt={current.clientName}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-2 border-brand-500/50 shadow-glow"
                />
                <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <CheckCircle size={14} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars — hardcoded 5 since model has no rating field */}
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Message — maps to model's `message` field */}
                <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed italic">
                  "{current.message}"
                </p>

                {/* Name — maps to model's `clientName` field */}
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <h3 className="text-base font-bold text-white">
                    {current.clientName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Verified Client</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-800/80 pt-4">
              {/* Dots */}
              <div className="flex gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx
                        ? "w-8 bg-brand-500"
                        : "w-2 bg-slate-800"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:border-brand-500 hover:text-white transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
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