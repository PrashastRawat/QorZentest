import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Cpu,
  GraduationCap,
  BookOpen,
  Briefcase,
  FolderKanban,
  ArrowRight,
  ShieldCheck,
  Globe,
  Code,
  LineChart,
  Layers,
  Calendar,
  User,
  LayoutDashboard,
  LogOut,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { getPublicCourses } from '../../api/courseCatalogApi';
import { getPublicServices } from '../../api/serviceApi';
import { navigateToDashboard } from '../../utils/navigation';
import './Navbar.css';

/* ------------------------------------------------------------------ */
/* Nav data                                                             */
/* ------------------------------------------------------------------ */
const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      { name: 'AI & Automation',               path: '/services/ai-automation',       icon: Cpu,        desc: 'Next-gen workflow automation & AI solutions' },
      { name: 'Data Analysis & Data Science',  path: '/services/data-analysis',       icon: LineChart,  desc: 'Turn raw data into actionable intelligence' },
      { name: 'Digital Marketing',             path: '/services/digital-marketing',   icon: Globe,      desc: 'Strategic performance marketing & ads' },
      { name: 'Web Design & Development',      path: '/services/web-design',          icon: Code,       desc: 'Responsive, high-converting websites' },
      { name: 'Software Development',          path: '/services/software-development',icon: Layers,     desc: 'Custom enterprise software solutions' },
      { name: 'Graphic Designing',             path: '/services/graphic-designing',   icon: Sparkles,   desc: 'Creative visuals & brand identities' },
      { name: 'Search Engine Optimization (SEO)', path: '/services/seo',             icon: LineChart,   desc: 'Rank higher & get organic traffic' },
      { name: 'Social media marketing',        path: '/services/social-media-marketing', icon: Globe,  desc: 'Engaging content & community growth' },
      { name: 'Cloud Computing',               path: '/services/cloud-computing',     icon: Layers,     desc: 'Scalable cloud infrastructure & DevOps' },
      { name: 'Cyber Security',                path: '/services/cyber-security',      icon: ShieldCheck,desc: 'Enterprise security & threat protection' },
      { name: 'Networking & IT Infrastructure',path: '/services/networking-it',       icon: Cpu,        desc: 'Robust network setup & management' },
    ],
  },
  {
    label: 'Training',
    path: '/training',
    dropdown: [
      { name: 'Networking',           path: '/training?category=Networking',                 icon: Cpu,         desc: 'Cisco, security, and enterprise networking programs' },
      { name: 'AI & Digital Skills',  path: '/training?category=AI%20%26%20Digital%20Skills', icon: Sparkles,    desc: 'AI tools, automation, and digital skill-building' },
      { name: 'Technical Domains',    path: '/training?category=Technical%20Domains',         icon: Code,        desc: 'Full stack, cloud, data, and core tech training' },
      { name: 'Non-Technical Domains', path: '/training?category=Non-Technical%20Domains',    icon: Briefcase,   desc: 'Sales, HR, marketing, and business skills' },
      { name: 'Corporate Training',   path: '/training?category=Corporate%20Training',        icon: GraduationCap, desc: 'Department-level corporate upskilling programs' },
    ],
  },
  { label: 'Courses', path: '/course' },
  { label: 'Internship', path: '/internship' },
  {
    label: 'Resource',
    path: '/resource',
    dropdown: [
      { name: 'About us', path: '/resource/about-us', icon: FolderKanban, desc: 'Learn about QorZen Technologies mission' },
      { name: 'Blog',     path: '/resource/blog',     icon: BookOpen,     desc: 'Latest tech insights, tutorials & articles' },
      { name: 'News',     path: '/resource/news',     icon: Globe,        desc: 'Company updates & tech industry news' },
      { name: 'Events',   path: '/resource/events',   icon: Calendar,     desc: 'Join our workshops, webinars & tech summits' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate  = useNavigate();
  const location  = useLocation();

  const [activeDropdown, setActiveDropdown]       = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled]               = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]        = useState(false);
  const [mobileExpanded, setMobileExpanded]        = useState(null);
  const [courseCategories, setCourseCategories]   = useState([]);
  const [serviceDropdownItems, setServiceDropdownItems] = useState([]);
  const profileMenuRef = useRef(null);

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchCourseCategories = async () => {
      try {
        const res = await getPublicCourses();
        const data = res.data?.data || [];
        const uniqueCategories = [...new Set(data.map((c) => c.category).filter(Boolean))].sort();
        const dropdownItems = uniqueCategories.map((cat) => ({
          name: cat,
          path: `/course?category=${encodeURIComponent(cat)}`,
          icon: BookOpen,
          desc: `Browse ${cat} courses`,
        }));
        if (isMounted) setCourseCategories(dropdownItems);
      } catch (err) {
        console.error('[Navbar] Failed to load course categories:', err);
      }
    };
    fetchCourseCategories();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchServiceDropdown = async () => {
      try {
        const res = await getPublicServices();
        const data = res.data?.data || res.data || [];

        const existingSlugs = new Set(
          navItems
            .find((item) => item.label === 'Services')
            ?.dropdown.map((dropdownItem) => dropdownItem.path.split('/').pop()) || []
        );

        const newItems = data
          .filter((service) => !existingSlugs.has(service.slug))
          .map((service) => ({
            name: service.title,
            path: `/services/${service.slug || service._id}`,
            icon: Sparkles,
          }));

        if (isMounted) setServiceDropdownItems(newItems);
      } catch (err) {
        console.error('[Navbar] Failed to load service dropdown:', err);
      }
    };
    fetchServiceDropdown();
    return () => { isMounted = false; };
  }, []);

  /* close everything on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setProfileDropdownOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  /* click-outside for profile menu */
  useEffect(() => {
    const handler = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleOpenDashboard = () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigateToDashboard(user, navigate);
  };

  const handleSignOut = async () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const userRole    = user?.role    || 'student';
  const displayName = user?.name    || 'My Account';
  const displayAvatar = user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop';

  const computedNavItems = navItems.map((item) => {
    if (item.label === 'Courses') return { ...item, dropdown: courseCategories };
    if (item.label === 'Services') {
      return { ...item, dropdown: [...item.dropdown, ...serviceDropdownItems] };
    }
    return item;
  });

  /* ---------------------------------------------------------------- */
  return (
    <header className={`navbar-header${isScrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">

        {/* ── Logo ── */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpeg" alt="QorZen" className="navbar-logo-img" />
          <div className="logo-text-wrapper">
            <span className="logo-title">QorZen</span>
            <span className="logo-sub">Technologies</span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="navbar-menu-desktop">
          {computedNavItems.map((item, index) => {
            const hasDropdown = item.dropdown?.length > 0;
            const isOpen   = activeDropdown === index;
            const isActive = location.pathname === item.path ||
              (hasDropdown && item.dropdown.some(d => location.pathname.startsWith(d.path)));

            return (
              <div
                key={item.label}
                className="nav-item-wrapper"
                onMouseEnter={() => hasDropdown && setActiveDropdown(index)}
                onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
              >
                {/* Link/button pill */}
                <Link
                  to={item.path}
                  className={`nav-link${isActive || isOpen ? ' active' : ''}`}
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`chevron-icon${isOpen ? ' rotated' : ''}`}
                    />
                  )}
                </Link>

                {/* Animated dropdown */}
                <AnimatePresence>
                  {hasDropdown && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      className={`dropdown-menu${item.dropdown.length > 5 ? ' mega-dropdown' : ''}`}
                    >
                      <div className="dropdown-grid">
                        {item.dropdown.map((sub) => {
                          const Icon = sub.icon || Sparkles;
                          return (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={() => setActiveDropdown(null)}
                              className={`dropdown-card${sub.highlighted ? ' highlighted' : ''}`}
                            >
                              <div className="dropdown-icon-box">
                                <Icon size={17} />
                              </div>
                              <div className="dropdown-card-content">
                                <span className="dropdown-card-title">
                                  {sub.name}
                                  {sub.highlighted && (
                                    <span className="hot-pill">Popular</span>
                                  )}
                                </span>
                                {sub.desc && <p className="dropdown-card-desc">{sub.desc}</p>}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* ── Desktop right: auth / profile ── */}
        <div className="navbar-actions-desktop">
          {isAuthenticated ? (
            <div className="profile-menu-container" ref={profileMenuRef}>
              <button
                type="button"
                className="navbar-profile-trigger"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-label="Account menu"
              >
                <img src={displayAvatar} alt={displayName} className="navbar-avatar-img" />
                <span className="navbar-profile-name">{displayName}</span>
                <ChevronDown
                  size={13}
                  className={`chevron-icon${profileDropdownOpen ? ' rotated' : ''}`}
                />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.14 }}
                    className="navbar-profile-dropdown"
                  >
                    {/* Header */}
                    <div className="profile-dropdown-header">
                      <div className="profile-header-name">{displayName}</div>
                      <div className="profile-header-meta">
                        <span className="profile-header-email">{user?.email}</span>
                        <span className={`profile-role-badge${userRole === 'admin' ? ' admin' : ''}`}>
                          {userRole}
                        </span>
                      </div>
                    </div>

                    {/* Dashboard CTA */}
                    <button
                      type="button"
                      onClick={handleOpenDashboard}
                      className="profile-dropdown-item highlight-dash"
                    >
                      <LayoutDashboard size={15} />
                      <span>{userRole === 'admin' ? 'Admin Panel' : 'Student Portal'}</span>
                      <ExternalLink size={11} style={{ marginLeft: 'auto' }} />
                    </button>

                    <Link to={userRole === 'admin' ? '/admin/dashboard' : '/profile'} onClick={() => setProfileDropdownOpen(false)} className="profile-dropdown-item">
                      <User size={15} />
                      <span>My Profile</span>
                    </Link>

                    <Link to={userRole === 'admin' ? '/admin/dashboard' : '/profile'} onClick={() => setProfileDropdownOpen(false)} className="profile-dropdown-item">
                      <Settings size={15} />
                      <span>Settings</span>
                    </Link>

                    <div className="profile-dropdown-divider" />

                    <button type="button" onClick={handleSignOut} className="profile-dropdown-item logout">
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/auth/signin" className="btn-secondary-auth">Sign In</Link>
              <Link to="/auth/signup" className="btn-primary-auth">Sign Up</Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="mobile-drawer"
          >
            <div className="mobile-drawer-content">

              {/* Authenticated user card */}
              {isAuthenticated && (
                <div style={{ padding: '0.75rem', background: '#f5f0eb', borderRadius: '0.75rem', border: '1px solid #e7e5e4', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <img src={displayAvatar} alt={displayName} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1c1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#78716c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleOpenDashboard}
                    style={{ width: '100%', padding: '0.6rem', background: '#1c1917', color: '#fff', border: 'none', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}
                  >
                    <LayoutDashboard size={15} />
                    {userRole === 'admin' ? 'Open Admin Panel' : 'Open Student Portal'}
                  </button>
                </div>
              )}

              {computedNavItems.map((item, index) => {
                const hasDropdown = item.dropdown?.length > 0;
                const isExpanded  = mobileExpanded === index;

                return (
                  <div key={item.label} className="mobile-nav-group">
                    <div className="mobile-nav-header">
                      {hasDropdown ? (
                        <button
                          type="button"
                          className="mobile-nav-btn"
                          onClick={() => setMobileExpanded(isExpanded ? null : index)}
                        >
                          <span>{item.label}</span>
                          <ChevronDown size={16} className={`mobile-chevron${isExpanded ? ' open' : ''}`} />
                        </button>
                      ) : (
                        <Link to={item.path} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                          {item.label}
                        </Link>
                      )}
                    </div>

                    <AnimatePresence>
                      {hasDropdown && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="mobile-sub-menu">
                            {item.dropdown.map((sub) => {
                              const SubIcon = sub.icon || Sparkles;
                              return (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  className="mobile-sub-link"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <SubIcon size={14} className="mobile-sub-icon" />
                                  <span>{sub.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="mobile-auth-actions">
                {isAuthenticated ? (
                  <button
                    onClick={handleSignOut}
                    style={{ width: '100%', padding: '0.65rem', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link to="/auth/signin" className="btn-mobile-signin" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                    <Link to="/auth/signup" className="btn-mobile-signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
