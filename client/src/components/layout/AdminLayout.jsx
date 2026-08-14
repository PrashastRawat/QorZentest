import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  MessageSquareQuote,
  Inbox,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const navItems = [
  ["Dashboard", "/admin/dashboard", LayoutDashboard],
  ["Services", "/admin/services", BriefcaseBusiness],
  ["Portfolio", "/admin/portfolio", LayoutDashboard],
  ["Blog", "/admin/blog", FileText],
  ["Testimonials", "/admin/testimonials", MessageSquareQuote],
  ["Careers", "/admin/careers", BriefcaseBusiness],
  ["Submissions", "/admin/submissions", Inbox],
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col bg-slate-950 text-white">
        <div className="p-6">
          <p className="text-lg font-black">QorZen Admin</p>
          {user?.name && (
            <p className="mt-1 text-xs text-slate-400">{user.name}</p>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(([name, path, Icon]) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-brand-600 text-white"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {name}
              </Link>
            );
          })}
        </nav>

        <div className="p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-red-950 hover:text-red-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}