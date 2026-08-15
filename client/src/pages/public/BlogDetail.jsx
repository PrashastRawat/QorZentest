import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getBlog } from "../../api/blogApi";
import Loader from "../../components/common/Loader";

export default function BlogDetail() {
  const { id } = useParams();
  const { data, loading } = useFetch(() => getBlog(id), null);
  if (loading) return <Loader />;
  const blog = data?.data || data;
  if (!blog)
    return (
      <section className="section">
        <div className="container-page">Article not found.</div>
      </section>
    );
  return (
    <section className="section">
      <div className="container-page max-w-4xl">
        <Link to="/blog" className="text-sm font-bold text-brand-600">
          ← Back to blog
        </Link>
        <h1 className="mt-6 text-4xl font-black">{blog.title}</h1>
        <p className="mt-4 text-sm text-slate-500">
          {blog.createdAt?.slice(0, 10)}
        </p>

        {blog.images?.[0]?.url && (
          <div className="mt-8 overflow-hidden rounded-2xl">
            <img
              src={blog.images[0].url}
              alt={blog.title}
              className="h-96 w-full object-cover"
            />
          </div>
        )}

        <div className="mt-10 whitespace-pre-line text-lg leading-9 text-slate-700">
          {blog.content || blog.body || blog.excerpt}
        </div>

        {blog.images?.length > 1 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {blog.images.slice(1).map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`${blog.title} ${i + 2}`}
                className="h-56 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
