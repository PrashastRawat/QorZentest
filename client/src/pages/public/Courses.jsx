import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getCourses } from "../../api/courseApi";
import Loader from "../../components/common/Loader";
import fallback from "../../data/courses";

export default function Courses() {
  const { data, loading } = useFetch(getCourses, fallback);
  const courses = Array.isArray(data) && data.length ? data : fallback;

  return (
    <section className="section">
      <div className="container-page">
        <p className="font-bold text-brand-600">OUR COURSES</p>
        <h1 className="mt-2 section-title">
          Learn the skills that move your career forward.
        </h1>
        <p className="section-subtitle">
          Practical, job-focused courses taught by industry professionals.
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Link
                to={`/courses/${c._id}`}
                key={c._id}
                className="card group overflow-hidden transition hover:-translate-y-1 hover:border-brand-300"
              >
                {c.thumbnail?.url ? (
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={c.thumbnail.url}
                      alt={c.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="p-7">
                  <h2 className={`text-xl font-bold ${c.thumbnail?.url ? "" : "mt-2"}`}>
                    {c.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {c.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      By {c.instructor}
                    </span>
                    <span className="text-lg font-bold text-brand-600">
                      ₹{c.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}