import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  PlayCircle,
  FileCheck2,
  Video,
  LineChart,
  Award,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  Calendar,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { getNotifications } from "../../api/studentApi";
import "./StudentLayout.css";

const studentNavItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Courses", path: "/courses", icon: BookOpen },
  { name: "My Trainings", path: "/trainings", icon: GraduationCap },
  { name: "Classroom & Labs", path: "/learning", icon: PlayCircle },
  { name: "Assignments", path: "/assignments", icon: FileCheck2 },
  { name: "Live Classes", path: "/live-classes", icon: Video, badge: "Live" },
  { name: "Progress & Grades", path: "/progress", icon: LineChart },
  { name: "Certificates", path: "/certificates", icon: Award },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Profile & Settings", path: "/profile", icon: User },
];

/**
 * StudentLayout Component
 * Master responsive layout wrapper for all protected student portal routes.
 * Features clean sidebar navigation, mobile drawer, active batch pill, and Go to Website action.
 */
const StudentLayout = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await getNotifications();
        setUnreadCount((res.data || []).filter((n) => !n.read).length);
      } catch (err) {
        console.error("Failed to load notification count", err);
      }
    };
    fetchUnread();

    // Refresh whenever the Notifications page marks something read/deletes it.
    window.addEventListener("qorzen:notifications-updated", fetchUnread);
    return () =>
      window.removeEventListener("qorzen:notifications-updated", fetchUnread);
  }, []);

  const handleSignOut = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const closeDrawer = () => setMobileDrawerOpen(false);

  return (
    <div className="student-portal-shell">
      {/* Mobile Top Header */}
      <header className="student-mobile-header">
        <Link to="/dashboard" className="student-mobile-brand">
          <img
            src="/logo.jpeg"
            alt="QorZen"
            className="student-mobile-logo-img"
          />
          <span className="student-mobile-title">Student Portal</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link
            to="/"
            className="student-visit-site-pill"
            title="Go to Website"
          >
            <Globe size={13} />
            <span>Website</span>
          </Link>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="student-mobile-toggle-btn"
            aria-label="Toggle student portal navigation"
          >
            {mobileDrawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className="student-sidebar"
        style={{
          transform: mobileDrawerOpen ? "translateX(0)" : undefined,
        }}
      >
        {/* Brand Header */}
        <div className="student-sidebar-brand">
          <Link
            to="/dashboard"
            className="student-brand-link"
            onClick={closeDrawer}
          >
            <img
              src="/logo.jpeg"
              alt="QorZen Technologies"
              className="student-sidebar-logo"
            />
            <div className="student-brand-text">
              <span className="student-brand-main">QorZen</span>
              <span className="student-brand-sub">Classroom Portal</span>
            </div>
          </Link>
          <button
            onClick={closeDrawer}
            className="student-mobile-toggle-btn"
            style={{ display: mobileDrawerOpen ? "flex" : "none" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="student-sidebar-user">
          <img
            src={
              user?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop"
            }
            alt={user?.name || "Student"}
            className="student-user-avatar"
          />
          <div className="student-user-info">
            <h4 className="student-user-name">
              {user?.name || "Aarav Sharma"}
            </h4>
            <span className="student-user-badge">Student Member</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="student-nav-menu">
          {studentNavItems.map((item) => {
            const Icon = item.icon;
            const linkActive = location.pathname === item.path;
            const badge =
              item.path === "/notifications"
                ? unreadCount > 0
                  ? String(unreadCount)
                  : null
                : item.badge;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `student-nav-link ${linkActive ? "active" : ""}`
                }
              >
                <Icon size={18} className="student-nav-icon" />
                <span>{item.name}</span>
                {badge && <span className="student-nav-badge">{badge}</span>}
              </NavLink>
            );
          })}

          {/* Quick-Switch Link to Public Website */}
          <div
            style={{
              marginTop: "0.5rem",
              paddingTop: "0.5rem",
              borderTop: "1px solid var(--border-light, #efe9e3)",
            }}
          >
            <Link
              to="/"
              className="student-nav-link site-link"
              onClick={closeDrawer}
            >
              <Globe size={18} className="student-nav-icon" />
              <span>Go to Website</span>
              <ExternalLink
                size={13}
                style={{ marginLeft: "auto", opacity: 0.6 }}
              />
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer with Sign Out */}
        <div className="student-sidebar-footer">
          <button onClick={handleSignOut} className="student-signout-btn">
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileDrawerOpen && (
        <div onClick={closeDrawer} className="student-drawer-backdrop" />
      )}

      {/* Main Viewport Content Area */}
      <div className="student-main-content">
        {/* Desktop Top Bar */}
        <header className="student-topbar">
          <div className="student-topbar-left">
            <div className="student-batch-pill">
              <Calendar size={13} color="#8b7050" />
              <span>{user?.batchTiming || "Weekdays Batch (Mon–Thur)"}</span>
            </div>
            <div className="student-batch-pill">
              <Sparkles size={13} color="#8b7050" />
              <span>{user?.batch || "QorZen Full Stack & AI Cohort 2026"}</span>
            </div>
          </div>

          <div className="student-topbar-right">
            {/* Direct Link to Website */}
            <Link
              to="/"
              className="student-visit-site-pill"
              title="Go to Website"
            >
              <Globe size={14} />
              <span>Go to Website</span>
              <ExternalLink size={12} />
            </Link>

            <NavLink
              to="/notifications"
              className="student-icon-action-btn"
              aria-label="Notifications"
            >
              <Bell size={17} />
              {unreadCount > 0 && <span className="student-unread-dot" />}
            </NavLink>

            <NavLink
              to="/profile"
              className="student-icon-action-btn"
              aria-label="Profile"
            >
              <User size={17} />
            </NavLink>

            <button
              onClick={handleSignOut}
              className="student-signout-btn"
              style={{ width: "auto", padding: "0.45rem 0.85rem" }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Render Active Route Viewport */}
        <main className="student-viewport-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
