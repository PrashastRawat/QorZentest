import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BriefcaseBusiness,
  GraduationCap,
  Inbox,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers
} from 'lucide-react';
import {
  getServices,
  getProjects,
  getCourses,
  getSubmissions
} from '../../api/adminApi';
import '../../pages/Student/Dashboard/StudentDashboard.css';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    services: 0,
    projects: 0,
    courses: 0,
    submissions: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [sRes, pRes, cRes, subRes] = await Promise.all([
        getServices().catch(() => ({ data: [] })),
        getProjects().catch(() => ({ data: [] })),
        getCourses().catch(() => ({ data: [] })),
        getSubmissions().catch(() => ({ data: [] }))
      ]);

      const sData = sRes.data?.data || sRes.data || [];
      const pData = pRes.data?.data || pRes.data || [];
      const cData = cRes.data?.data || cRes.data || [];
      const subData = subRes.data?.data || subRes.data || [];

      setMetrics({
        services: Array.isArray(sData) ? sData.length : 0,
        projects: Array.isArray(pData) ? pData.length : 0,
        courses: Array.isArray(cData) ? cData.length : 0,
        submissions: Array.isArray(subData) ? subData.length : 0
      });

      setRecentSubmissions(Array.isArray(subData) ? subData.slice(0, 3) : []);
    } catch (err) {
      console.warn('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const navCards = [
    { name: 'Services', path: '/admin/services', icon: BriefcaseBusiness, count: metrics.services, color: '#2563eb' },
    { name: 'Portfolio', path: '/admin/portfolio', icon: Layers, count: metrics.projects, color: '#16a34a' },
    { name: 'Courses & Programs', path: '/admin/courses', icon: GraduationCap, count: metrics.courses, color: '#ca8a04' },
    { name: 'Submissions', path: '/admin/submissions', icon: Inbox, count: metrics.submissions, color: '#dc2626' }
  ];

  return (
    <div className="student-dash-page">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="student-welcome-banner"
      >
        <div className="welcome-info-col">
          <div className="welcome-pill">
            <Sparkles size={13} />
            <span>QorZen Control System v1.0</span>
          </div>
          <h1 className="welcome-heading">
            Welcome back, Admin Manager! 👋
          </h1>
          <p className="welcome-sub">
            All services are operational. You have <strong>{metrics.submissions} submissions</strong> pending review, and <strong>{metrics.courses} courses</strong> currently published.
          </p>
        </div>

        <div className="welcome-actions-col">
          <Link to="/admin/submissions" className="btn-resume-learning">
            <Inbox size={17} />
            <span>View Submissions</span>
          </Link>
        </div>
      </motion.div>

      {/* Quick Metrics Row */}
      <div className="stats-metric-grid">
        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <BriefcaseBusiness size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{metrics.services}</span>
            <span className="stat-lbl">Services</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <Layers size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{metrics.projects}</span>
            <span className="stat-lbl">Portfolio</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <GraduationCap size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{metrics.courses}</span>
            <span className="stat-lbl">Courses</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <Inbox size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{metrics.submissions}</span>
            <span className="stat-lbl">Submissions</span>
          </div>
        </div>
      </div>

      {/* Split Columns */}
      <div className="dash-columns-split">
        {/* Main Column */}
        <div className="dash-main-col">
          <div className="dash-content-card">
            <div className="card-title-header">
              <h2 className="card-title-text">
                <Server size={18} color="#8b7050" />
                <span>Quick Access Registries</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
              {navCards.map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.path}
                    to={c.path}
                    className="stat-metric-card"
                    style={{
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <div className="stat-icon-wrap" style={{ backgroundColor: `${c.color}15`, color: c.color }}>
                      <Icon size={20} />
                    </div>
                    <div className="stat-data-col" style={{ marginLeft: '0.5rem' }}>
                      <span className="stat-val" style={{ fontSize: '1.05rem', display: 'block' }}>{c.name}</span>
                      <span className="stat-lbl" style={{ margin: 0 }}>{c.count} records</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="dash-side-col">
          <div className="dash-content-card">
            <div className="card-title-header">
              <h2 className="card-title-text">
                <ShieldCheck size={18} color="#8b7050" />
                <span>Recent Submissions</span>
              </h2>
              <Link to="/admin/submissions" className="card-view-all-link">
                View All
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {loading ? (
                <p style={{ fontSize: '0.85rem', color: '#78716c' }}>Loading recent submissions...</p>
              ) : recentSubmissions.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: '#78716c' }}>No submissions found.</p>
              ) : (
                recentSubmissions.map((sub) => (
                  <div
                    key={sub._id || sub.id}
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: '0.5rem',
                      backgroundColor: '#ffffff',
                      border: '0.0625rem solid #d9cfc7'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                      <strong style={{ fontSize: '0.78rem', color: '#1c1917' }}>{sub.name}</strong>
                      <span style={{ fontSize: '0.68rem', color: '#78716c' }}>{sub.service || 'Enquiry'}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#44403c', margin: 0, lineHeight: 1.35 }}>
                      {sub.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
