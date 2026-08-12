import { useState } from "react";
import { ArrowUpRight, Sparkles, Code2, TrendingUp, Cpu, CheckCircle } from "lucide-react";
import taskManagerImg from "../../assets/projects/project_1.jpg";
import housePricePredictorImg from "../../assets/projects/project_2.jpg";
import customerSupportBotImg from "../../assets/projects/project_3.png";
import { Link } from "react-router-dom";

const categoryList = ["All", "AI & ML", "Web Platforms", "Enterprise Software"];

const projects = [
  {
    id: "task-manager-app",
    title: "Enterprise Task Workflow Manager",
    category: "Web Platforms",
    icon: "TM",
    image: taskManagerImg,
    metric: "+340% Team Output",
    tags: ["React", "Node.js", "PostgreSQL", "Real-Time Sync"],
    description:
      "A high-concurrency project orchestration platform that automates daily team tasks, visualizes real-time bottlenecks, and boosts overall productivity.",
  },
  {
    id: "house-price-predictor",
    title: "Real Estate Predictive AI Engine",
    category: "AI & ML",
    icon: "HP",
    image: housePricePredictorImg,
    metric: "99.4% Valuation Accuracy",
    tags: ["Python", "TensorFlow", "Scikit-Learn", "FastAPI"],
    description:
      "A machine learning property valuation engine leveraging multi-feature regression models to provide instant, data-driven real estate pricing insights.",
  },
  {
    id: "customer-support-bot",
    title: "Autonomous Conversational AI Agent",
    category: "Enterprise Software",
    icon: "CS",
    image: customerSupportBotImg,
    metric: "< 10ms Response Time",
    tags: ["NLP", "LLM Fine-Tuning", "Vector DB", "WebSocket"],
    description:
      "An intelligent omnichannel customer support agent powered by contextual AI that resolves over 85% of tier-1 support inquiries autonomously.",
  },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="section bg-dark-900 text-white">
      <div className="container-page relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1.5 text-xs font-semibold text-indigo-300">
              <Sparkles size={14} className="text-indigo-400" />
              FEATURED CASE STUDIES
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Software Shipped with <span className="text-gradient-brand">Measurable Impact.</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 rounded-xl bg-slate-950 p-1.5 border border-slate-800">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white shadow-glow"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-brand-500/50 hover:shadow-glow"
            >
              <div>
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 h-52 w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />

                  {/* Impact Metric Floating Badge */}
                  <div className="absolute top-3 left-3 rounded-lg border border-emerald-500/30 bg-slate-950/80 px-3 py-1 text-xs font-bold text-emerald-400 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                    <TrendingUp size={12} />
                    <span>{project.metric}</span>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-slate-950/80 text-xs font-black text-brand-300 backdrop-blur-md">
                    {project.icon}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] font-medium text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl font-bold text-white transition group-hover:text-brand-300 flex items-center gap-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center text-xs font-semibold text-brand-400 hover:text-brand-300 transition"
                >
                  View Full Case Study
                  <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <span className="text-[11px] text-slate-500 font-mono">QOR-PRJ-{project.id.substring(0, 4).toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}