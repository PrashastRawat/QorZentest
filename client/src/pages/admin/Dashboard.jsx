import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  FileText,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
} from "lucide-react";

const cards = [
  ["Services", "/admin/services", BriefcaseBusiness],
  ["Portfolio", "/admin/portfolio", LayoutDashboard],
  ["Blog", "/admin/blog", FileText],
  ["Testimonials", "/admin/testimonials", MessageSquareQuote],
  ["Submissions", "/admin/submissions", Inbox],
  ["Careers", "/admin/careers", BriefcaseBusiness],
];

export default function Dashboard() {
  return (
    <section className="section bg-slate-900 min-h-screen">
      <div className="container-page">
        <h1 className="section-title">Admin Dashboard</h1>
        <p className="section-subtitle">
          Manage your website content from one place.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(([name, path, Icon]) => (
            <Link
              key={path}
              to={path}
              className="card bg-slate-800 border-slate-700 p-6 transition hover:-translate-y-1"
            >
              <Icon className="text-brand-600" />
              <h2 className="mt-5 text-xl font-bold test-white">{name}</h2>
              <p className="mt-2 text-sm text-slate-400">
                Manage {name.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
