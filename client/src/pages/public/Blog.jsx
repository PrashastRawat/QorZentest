import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getBlogs } from "../../api/blogApi";
import Loader from "../../components/common/Loader";

const fallback = [
  {
    _id: 1,
    title: "How to build a high-converting website",
    excerpt: "Practical ideas for improving clarity, speed and conversions.",
    createdAt: "2026-07-20",
  },
  {
    _id: 2,
    title: "Why good UX matters for business",
    excerpt: "How thoughtful user experience improves digital products.",
    createdAt: "2026-07-12",
  },
  {
    _id: 3,
    title: "Choosing the right tech stack",
    excerpt: "A simple guide for startups planning a new product.",
    createdAt: "2026-07-01",
  },
];

export default function Blog() {
  const { data, loading } = useFetch(getBlogs, fallback);
  const blogs = Array.isArray(data) && data.length ? data : fallback;
  return (
    <section className="section">
      <div className="container-page">
        <h1 className="section-title">From our blog</h1>
        <p className="section-subtitle">
          Ideas about design, development, business and technology.
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogs.map((b) => (
              <article className="card overflow-hidden" key={b._id}>
                {b.images?.[0]?.url && (
                  <img
                    src={b.images[0].url}
                    alt={b.title}
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-7">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    {b.createdAt?.slice(0, 10)}
                  </p>
                  <h2 className="mt-4 text-xl font-bold">{b.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {b.excerpt}
                  </p>
                  <Link
                    className="mt-5 inline-block font-bold text-brand-600"
                    to={`/blog/${b._id}`}
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
