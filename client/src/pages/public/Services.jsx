import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getServices } from "../../api/serviceApi";
import Loader from "../../components/common/Loader";
import fallback from "../../data/services";

export default function Services() {
  const { data, loading } = useFetch(getServices, fallback);
  const services = Array.isArray(data) && data.length ? data : fallback;
  return (
    <section className="section">
      <div className="container-page">
        <p className="font-bold text-brand-600">OUR SERVICES</p>
        <h1 className="mt-2 section-title">
          Solutions built around your goals.
        </h1>
        <p className="section-subtitle">
          Choose the service that fits your next stage of growth.
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const fallbackMatch = fallback.find((f) => f._id === s._id);
              const image = s.image || fallbackMatch?.image;
              return (
                <Link
                  to={`/services/${s._id}`}
                  key={s._id}
                  className="card group overflow-hidden transition hover:-translate-y-1 hover:border-brand-300"
                >
                  {image ? (
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={image}
                        alt={s.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="p-7">
                    {!image && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 font-bold text-brand-600">
                        {s.icon || "S"}
                      </div>
                    )}
                    <h2 className={`text-xl font-bold ${image ? "" : "mt-6"}`}>
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {s.description}
                    </p>
                    <span className="mt-5 inline-block text-sm font-bold text-brand-600">
                      Learn more →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
