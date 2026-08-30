import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  MessageSquareQuote,
  Inbox,
  ClipboardCheck,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  User,
  Globe,
  ExternalLink,
  Layers
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import '../StudentPortal/StudentLayout.css';

const adminNavItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Services', path: '/admin/services', icon: BriefcaseBusiness },
  { name: 'Portfolio', path: '/admin/portfolio', icon: LayoutDashboard },
  { name: 'Courses', path: '/admin/courses', icon: GraduationCap },
  { name: 'Training', path: '/admin/training', icon: Layers },
  { name: 'Internship', path: '/admin/careers', icon: BriefcaseBusiness },
  { name: 'Blog', path: '/admin/blog', icon: FileText },
  { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Submissions', path: '/admin/submissions', icon: Inbox },
  { name: 'Enrollment Requests', path: '/admin/enrollment-requests', icon: ClipboardCheck }
];

export default function AdminLayout() {
  const auth = useAuth() || {};
  const { user, logout } = auth;
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    if (auth.adminLogout) {
      await auth.adminLogout();
    } else if (logout) {
      await logout();
    } else {
      localStorage.removeItem('qorzen_token');
      localStorage.removeItem('qorzen_user');
    }
    navigate('/admin/login', { replace: true });
  };

  const closeDrawer = () => setMobileDrawerOpen(false);

  return (
    <div className="student-portal-shell">
      {/* Mobile Top Header */}
      <header className="student-mobile-header">
        <Link to="/admin/dashboard" className="student-mobile-brand">
          <img src="/logo.jpeg" alt="QorZen" className="student-mobile-logo-img" />
          <span className="student-mobile-title">Admin Panel</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link to="/" className="student-visit-site-pill" title="Go to Website">
            <Globe size={13} />
            <span>Website</span>
          </Link>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="student-mobile-toggle-btn"
            aria-label="Toggle admin portal navigation"
          >
            {mobileDrawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className="student-sidebar"
        style={{
          transform: mobileDrawerOpen ? 'translateX(0)' : undefined
        }}
      >
        {/* Brand Header */}
        <div className="student-sidebar-brand">
          <Link to="/admin/dashboard" className="student-brand-link" onClick={closeDrawer}>
            <img src="/logo.jpeg" alt="QorZen Technologies" className="student-sidebar-logo" />
            <div className="student-brand-text">
              <span className="student-brand-main">QorZen</span>
              <span className="student-brand-sub">Control Panel</span>
            </div>
          </Link>
          <button
            onClick={closeDrawer}
            className="student-mobile-toggle-btn"
            style={{ display: mobileDrawerOpen ? 'flex' : 'none' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="student-sidebar-user">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=500&auto=format&fit=crop"
            alt={user?.name || 'Administrator'}
            className="student-user-avatar"
          />
          <div className="student-user-info">
            <h4 className="student-user-name">{user?.name || 'Admin Manager'}</h4>
            <span className="student-user-badge">Master Administrator</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="student-nav-menu">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `student-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={18} className="student-nav-icon" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Quick-Switch Link to Public Website */}
          <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light, #efe9e3)' }}>
            <Link to="/" className="student-nav-link site-link" onClick={closeDrawer}>
              <Globe size={18} className="student-nav-icon" />
              <span>Go to Website</span>
              <ExternalLink size={13} style={{ marginLeft: 'auto', opacity: 0.6 }} />
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
              <ShieldCheck size={13} color="#8b7050" />
              <span>Admin Session Secure</span>
            </div>
            <div className="student-batch-pill">
              <Sparkles size={13} color="#8b7050" />
              <span>Core Control System v1.0</span>
            </div>
          </div>

          <div className="student-topbar-right">
            {/* Direct Link to Website */}
            <Link to="/" className="student-visit-site-pill" title="Go to Website">
              <Globe size={14} />
              <span>Go to Website</span>
              <ExternalLink size={12} />
            </Link>

            <NavLink to="/admin/profile" className="student-icon-action-btn" aria-label="Administrator Profile">
              <User size={17} />
            </NavLink>

            <button
              onClick={handleSignOut}
              className="student-signout-btn"
              style={{ width: 'auto', padding: '0.45rem 0.85rem' }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Render Active Admin Route Page */}
        <main className="student-viewport-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}