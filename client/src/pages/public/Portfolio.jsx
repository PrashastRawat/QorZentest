import useFetch from "../../hooks/useFetch";
import { getPortfolio } from "../../api/portfolioApi";
import Loader from "../../components/common/Loader";
import cloudImg from "../../assets/services/cloud-computing.jpg";
import cyberImg from "../../assets/services/cyber-security.webp";
import seoImg from "../../assets/services/seo.png";
import marketingImg from "../../assets/services/digital-marketing.jpg";
import dataImg from "../../assets/services/data-analysis-science.jpg";
import aiImg from "../../assets/services/ai-automation.png";

const fallback = [
  {
    _id: 1,
    title: "Migrating Skyloft Retail to the cloud",
    category: "Cloud Computing",
    description:
      "Re-platformed on-premise systems onto scalable AWS architecture, cutting infra spend by 40%.",
    image: cloudImg,
  },
  {
    _id: 2,
    title: "Hardening Vaultrix Bank's security posture",
    category: "Cyber Security",
    description:
      "Full security audit and 24/7 SOC monitoring, closing critical vulnerabilities before launch.",
    image: cyberImg,
  },
  {
    _id: 3,
    title: "Growing GreenLeaf Organics' organic traffic",
    category: "SEO",
    description:
      "Technical clean-up and content strategy grew organic traffic 180% in six months.",
    image: seoImg,
  },
  {
    _id: 4,
    title: "A full-funnel launch for Urban Bites",
    category: "Digital Marketing",
    description:
      "Coordinated paid, social and email campaign around a menu launch, tripling engagement.",
    image: marketingImg,
  },
  {
    _id: 5,
    title: "Predictive dashboards for MedTrack Health",
    category: "Data Analysis & Data Science",
    description:
      "Data pipeline and predictive-analytics dashboard for spotting patient risk trends earlier.",
    image: dataImg,
  },
  {
    _id: 6,
    title: "Automating dispatch for Flowmatic Logistics",
    category: "AI & Automation",
    description:
      "AI-driven dispatch engine that re-routes deliveries in real time, cutting delivery time 25%.",
    image: aiImg,
  },
];

export default function Portfolio() {
  const { data, loading } = useFetch(getPortfolio, fallback);
  const items = Array.isArray(data) && data.length ? data : fallback;
  return (
    <section className="section">
      <div className="container-page">
        <h1 className="section-title">Our portfolio</h1>
        <p className="section-subtitle">
          Selected digital experiences built for ambitious teams.
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <article
                key={p._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <p className="text-sm font-bold text-brand-600">
                    {p.category}
                  </p>
                  <h2 className="mt-2 text-xl font-bold">{p.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
