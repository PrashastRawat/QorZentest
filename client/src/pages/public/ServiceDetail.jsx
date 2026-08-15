import { Link, useParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import { getService } from "../../api/serviceApi";
import Loader from "../../components/common/Loader";

const advantages = [
  {
    title: "Dedicated Expertise",
    desc: "A focused team that understands your goals and builds around them, not a generic template.",
  },
  {
    title: "Transparent Pricing",
    desc: "Clear packages with no hidden costs, so you know exactly what you're investing in.",
  },
  {
    title: "Modern Technology",
    desc: "We use current, well-supported tools and practices, not outdated stacks.",
  },
  {
    title: "Ongoing Support",
    desc: "Our relationship doesn't end at delivery — we're available for updates and support after launch.",
  },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(() => getService(id), null);

  if (loading) return <Loader />;

  if (error || !data)
    return (
      <section className="section">
        <div className="container-page">
          <h1 className="section-title">Service not found</h1>
          <Link className="btn-primary mt-6" to="/services">
            Back to services
          </Link>
        </div>
      </section>
    );

  const service = data.data || data;

  return (
    <>
      {/* Hero */}
      <section className="section pb-16">
        <div className="container-page max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-950/40 px-3.5 py-1.5 text-xs font-semibold text-brand-300">
            <Sparkles size={14} />
            SERVICE
          </div>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            {service.description}
          </p>
          <Link to="/contact" className="btn-primary mt-8 inline-flex">
            Discuss your project
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Image */}
      {service.image?.url && (
        <section className="pb-16">
          <div className="container-page max-w-4xl">
            <div className="overflow-hidden rounded-3xl border border-slate-800">
              <img
                src={service.image.url}
                alt={service.title}
                className="h-80 w-full object-cover sm:h-96"
              />
            </div>
          </div>
        </section>
      )}

      {/* What's included */}
      {service.features?.length > 0 && (
        <section className="section bg-slate-900/40 border-y border-slate-800/80">
          <div className="container-page max-w-4xl">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              What's included
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-brand-400"
                  />
                  <span className="text-sm text-slate-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      {service.whyChooseUs && (
        <section className="section">
          <div className="container-page max-w-4xl">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Why choose us
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-400">
              {service.whyChooseUs}
            </p>
          </div>
        </section>
      )}

      {/* Technologies */}
      {service.technologies?.length > 0 && (
        <section className="section bg-slate-900/40 border-y border-slate-800/80">
          <div className="container-page max-w-4xl">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Technologies we use
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.technologies.map((t, i) => (
                <span
                  key={i}
                  className="rounded-full border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Pricing + CTA */}
      <section className="section bg-slate-900/40 border-t border-slate-800/80">
        <div className="container-page max-w-4xl text-center">
          {service.priceStartingFrom && (
            <>
              <p className="text-sm text-slate-400">Starting from</p>
              <p className="mt-2 text-4xl font-black text-brand-400">
                ₹{service.priceStartingFrom}
              </p>
            </>
          )}
          <h2 className="mt-6 text-2xl font-black text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-3 text-slate-400">
            Reach out and let's talk about what {service.title} can do for your
            business.
          </p>
          <Link to="/contact" className="btn-primary mt-8 inline-flex">
            Get in touch
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
}
