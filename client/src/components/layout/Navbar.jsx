import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import qorzenLogo from "../../assets/tech/qorzen_logo.png";

// Slugs must match the _id values in src/data/services.js so each link
// resolves to a real ServiceDetail page.
const serviceLinks = [
  ["AI & Automation", "ai-automation"],
  ["Data Analysis & Data Science", "data-analysis-data-science"],
  ["Digital Marketing", "digital-marketing"],
  ["Web Design & Development", "web-design-development"],
  ["Software Development", "software-development"],
  ["Graphic Designing", "graphic-designing"],
  ["Search Engine Optimization (SEO)", "seo"],
  ["Social Media Marketing", "social-media-marketing"],
  ["Cloud Computing", "cloud-computing"],
  ["Cyber Security", "cyber-security"],
  ["Networking & IT Infrastructure", "networking-it-infrastructure"],
];

const trainingLinks = [
  ["Technical", "/training/technical"],
  ["Non-Technical", "/training/non-technical"],
];

const resourceLinks = [
  ["About Us", "/about"],
  ["Blog", "/blog"],
  ["Event", "/event"],
  ["News", "/news"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTrainingOpen, setMobileTrainingOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-4 z-40">
      <div className="container-page !max-w-[1560px]">
        <div className="flex h-20 items-center justify-between rounded-full border border-slate-800/80 bg-slate-950/85 px-5 shadow-2xl backdrop-blur-xl lg:grid lg:grid-cols-[auto_1fr_auto] lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={qorzenLogo} alt="QorZen logo" className="h-10 w-10 object-contain drop-shadow-md" />
            <span className="flex flex-col leading-tight">
              <span className="text-2xl font-black tracking-tight text-white">
                Qor<span className="text-brand-400">Zen</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Technologies
              </span>
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-8 lg:flex">
            <NavLink to="/" className={({ isActive }) =>
              `text-sm font-semibold transition ${isActive ? "text-brand-400" : "text-slate-300 hover:text-brand-300"}`
            }>Home</NavLink>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition ${servicesOpen ? "text-brand-400" : "text-slate-300 hover:text-brand-300"}`}
              >
                Services <ChevronDown size={15} className={`transition duration-200 ${servicesOpen ? "rotate-180 text-brand-400" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-2xl border border-slate-800 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl">
                  {serviceLinks.map(([label, slug]) => (
                    <Link
                      key={slug}
                      to={`/services/${slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-brand-500/10 hover:text-brand-300 transition"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Training dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTrainingOpen(true)}
              onMouseLeave={() => setTrainingOpen(false)}
            >
              <button
                type="button"
                onClick={() => setTrainingOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition ${trainingOpen ? "text-brand-400" : "text-slate-300 hover:text-brand-300"}`}
              >
                Training <ChevronDown size={15} className={`transition duration-200 ${trainingOpen ? "rotate-180 text-brand-400" : ""}`} />
              </button>

              {trainingOpen && (
                <div className="absolute left-1/2 top-full mt-2 w-48 -translate-x-1/2 rounded-2xl border border-slate-800 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl">
                  {trainingLinks.map(([label, path]) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setTrainingOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-brand-500/10 hover:text-brand-300 transition"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/courses" className={({ isActive }) =>
              `text-sm font-semibold transition ${isActive ? "text-brand-400" : "text-slate-300 hover:text-brand-300"}`
            }>Course</NavLink>

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setResourcesOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition ${resourcesOpen ? "text-brand-400" : "text-slate-300 hover:text-brand-300"}`}
              >
                Resources <ChevronDown size={15} className={`transition duration-200 ${resourcesOpen ? "rotate-180 text-brand-400" : ""}`} />
              </button>

              {resourcesOpen && (
                <div className="absolute left-1/2 top-full mt-2 w-48 -translate-x-1/2 rounded-2xl border border-slate-800 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl">
                  {resourceLinks.map(([label, path]) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setResourcesOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-brand-500/10 hover:text-brand-300 transition"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden items-center justify-end gap-4 lg:flex">
            {isAuthenticated ? (
              <>
                {isAdmin && <Link className="text-sm font-semibold text-slate-300 hover:text-white" to="/admin/dashboard">Admin</Link>}
                <button onClick={logout} className="text-sm font-semibold text-rose-400 hover:text-rose-300">Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn-primary !px-5 !py-2.5 text-xs font-bold shadow-glow">
                Login <ArrowRight size={14} className="ml-1.5" />
              </Link>
            )}
          </div>

          <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-page mt-2 lg:hidden">
          <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/95 px-6 py-6 shadow-2xl backdrop-blur-xl">
            <Link onClick={() => setOpen(false)} className="font-semibold text-white" to="/">Home</Link>

            <div>
              <button
                className="flex w-full items-center justify-between font-semibold text-slate-200"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services
                <ChevronDown size={16} className={`transition ${mobileServicesOpen ? "rotate-180 text-brand-400" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="mt-2 flex flex-col gap-2.5 pl-3">
                  {serviceLinks.map(([label, slug]) => (
                    <Link
                      key={slug}
                      to={`/services/${slug}`}
                      onClick={() => setOpen(false)}
                      className="text-xs font-medium text-slate-400 hover:text-brand-300"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                className="flex w-full items-center justify-between font-semibold text-slate-200"
                onClick={() => setMobileTrainingOpen(!mobileTrainingOpen)}
              >
                Training
                <ChevronDown size={16} className={`transition ${mobileTrainingOpen ? "rotate-180 text-brand-400" : ""}`} />
              </button>
              {mobileTrainingOpen && (
                <div className="mt-2 flex flex-col gap-2.5 pl-3">
                  {trainingLinks.map(([label, path]) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setOpen(false)}
                      className="text-xs font-medium text-slate-400 hover:text-brand-300"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link onClick={() => setOpen(false)} className="font-semibold text-slate-200" to="/courses">Course</Link>

            <div>
              <button
                className="flex w-full items-center justify-between font-semibold text-slate-200"
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              >
                Resources
                <ChevronDown size={16} className={`transition ${mobileResourcesOpen ? "rotate-180 text-brand-400" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="mt-2 flex flex-col gap-2.5 pl-3">
                  {resourceLinks.map(([label, path]) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setOpen(false)}
                      className="text-xs font-medium text-slate-400 hover:text-brand-300"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated && isAdmin && <Link onClick={() => setOpen(false)} className="text-slate-200" to="/admin/dashboard">Admin Dashboard</Link>}
            {isAuthenticated ? <button onClick={logout} className="text-left font-semibold text-rose-400">Logout</button> : <Link to="/login" className="btn-primary !py-2.5">Login</Link>}
          </div>
        </nav>
      )}
    </header>
  );
}