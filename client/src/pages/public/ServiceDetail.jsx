import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getService } from "../../api/serviceApi";
import Loader from "../../components/common/Loader";

export default function ServiceDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(() => getService(id), null);
  if (loading) return <Loader />;
  if (error || !data) return <section className="section"><div className="container-page"><h1 className="section-title">Service not found</h1><Link className="btn-primary mt-6" to="/services">Back to services</Link></div></section>;
  const service = data.data || data;
  return <section className="section"><div className="container-page max-w-4xl"><p className="font-bold text-brand-600">SERVICE</p><h1 className="mt-2 text-4xl font-black">{service.title}</h1><p className="mt-6 text-lg leading-8 text-slate-600">{service.description}</p>{service.content && <div className="mt-10 whitespace-pre-line leading-8 text-slate-700">{service.content}</div>}<Link to="/contact" className="btn-primary mt-10">Discuss your project</Link></div></section>;
}
