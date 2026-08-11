import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getBlog } from "../../api/blogApi";
import Loader from "../../components/common/Loader";

export default function BlogDetail() {
  const { id } = useParams();
  const { data, loading } = useFetch(() => getBlog(id), null);
  if (loading) return <Loader />;
  const blog = data?.data || data;
  if (!blog) return <section className="section"><div className="container-page">Article not found.</div></section>;
  return <section className="section"><div className="container-page max-w-4xl"><Link to="/blog" className="text-sm font-bold text-brand-600">← Back to blog</Link><h1 className="mt-6 text-4xl font-black">{blog.title}</h1><p className="mt-4 text-sm text-slate-500">{blog.createdAt?.slice(0,10)}</p><div className="mt-10 whitespace-pre-line text-lg leading-9 text-slate-700">{blog.content || blog.body || blog.excerpt}</div></div></section>;
}
