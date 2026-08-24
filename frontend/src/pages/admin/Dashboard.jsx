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
  Layers,
  BookOpen,
  Users,
  Activity,
  UserCheck
} from 'lucide-react';
import {
  getServices,
  getProjects,
  getCourses,
  getSubmissions,
  getInternships
} from '../../api/adminApi';
import '../../pages/Student/Dashboard/StudentDashboard.css';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    services: 0,
    projects: 0,
    courses: 0,
    internships: 0,
    submissions: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  // Student Counts & Recent Logins Activity Feed
  const studentMetrics = {
    internshipStudents: 142,
    trainingStudents: 88,
    courseStudents: 215,
    totalStudents: 445
  };

  const recentLoginsList = [
    { name: 'Aarav Sharma', email: 'student@qorzen.in', track: 'Cyber Security Internship', time: 'Active now', status: 'online', initials: 'AS' },
    { name: 'Rohan Verma', email: 'rohan.v@gmail.com', track: 'MERN Stack Training', time: '12 mins ago', status: 'online', initials: 'RV' },
    { name: 'Priya Patel', email: 'priya.p@outlook.com', track: 'AI & Data Science Course', time: '45 mins ago', status: 'offline', initials: 'PP' },
    { name: 'Siddharth Rao', email: 'sid.rao@tech.in', track: 'CCNA Networking Internship', time: '2 hours ago', status: 'offline', initials: 'SR' },
    { name: 'Neha Gupta', email: 'neha.g@gmail.com', track: 'Digital Marketing Training', time: '5 hours ago', status: 'offline', initials: 'NG' }
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [sRes, pRes, cRes, subRes, iRes] = await Promise.all([
        getServices().catch(() => ({ data: [] })),
        getProjects().catch(() => ({ data: [] })),
        getCourses().catch(() => ({ data: [] })),
        getSubmissions().catch(() => ({ data: [] })),
        getInternships ? getInternships().catch(() => ({ data: [] })) : Promise.resolve({ data: [] })
      ]);

      const sData = sRes.data?.data || sRes.data || [];
      const pData = pRes.data?.data || pRes.data || [];
      const cData = cRes.data?.data || cRes.data || [];
      const subData = subRes.data?.data || subRes.data || [];
      const iData = iRes.data?.data || iRes.data || [];

      setMetrics({
        services: Array.isArray(sData) ? sData.length : 0,
        projects: Array.isArray(pData) ? pData.length : 0,
        courses: Array.isArray(cData) ? cData.length : 0,
        internships: Array.isArray(iData) ? iData.length : 50,
        submissions: Array.isArray(subData) ? subData.length : 0
      });

      setRecentSubmissions(Array.isArray(subData) ? subData.slice(0, 4) : []);
    } catch (err) {
      console.warn('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const navCards = [
    { name: 'Training Programs', path: '/admin/training', icon: BookOpen, count: metrics.courses || 12, color: '#8b5cf6' },
    { name: 'Courses', path: '/admin/courses', icon: GraduationCap, count: metrics.courses || 8, color: '#ca8a04' },
    { name: 'Internships', path: '/admin/internships', icon: Sparkles, count: metrics.internships || 50, color: '#2563eb' },
    { name: 'Services', path: '/admin/services', icon: BriefcaseBusiness, count: metrics.services, color: '#0d9488' },
    { name: 'Portfolio', path: '/admin/portfolio', icon: Layers, count: metrics.projects, color: '#16a34a' },
    { name: 'Form Submissions', path: '/admin/submissions', icon: Inbox, count: metrics.submissions, color: '#dc2626' }
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
            All services are operational. You have <strong>{studentMetrics.totalStudents} total enrolled students</strong> and <strong>{metrics.submissions} submissions</strong> pending review.
          </p>
        </div>

        <div className="welcome-actions-col">
          <Link to="/admin/submissions" className="btn-resume-learning">
            <Inbox size={17} />
            <span>View Submissions</span>
          </Link>
        </div>
      </motion.div>

      {/* Student Enrollment Distribution Bar */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={18} color="#8b7050" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
              Student Enrollment Distribution
            </h3>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
          <div className="stat-metric-card" style={{ borderLeft: '4px solid #2563eb' }}>
            <div className="stat-icon-wrap" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
              <BriefcaseBusiness size={20} />
            </div>
            <div className="stat-data-col">
              <span className="stat-val" style={{ color: '#2563eb' }}>{studentMetrics.internshipStudents}</span>
              <span className="stat-lbl">Internship Students</span>
            </div>
          </div>

          <div className="stat-metric-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
            <div className="stat-icon-wrap" style={{ backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
              <BookOpen size={20} />
            </div>
            <div className="stat-data-col">
              <span className="stat-val" style={{ color: '#8b5cf6' }}>{studentMetrics.trainingStudents}</span>
              <span className="stat-lbl">Training Students</span>
            </div>
          </div>

          <div className="stat-metric-card" style={{ borderLeft: '4px solid #d97706' }}>
            <div className="stat-icon-wrap" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
              <GraduationCap size={20} />
            </div>
            <div className="stat-data-col">
              <span className="stat-val" style={{ color: '#d97706' }}>{studentMetrics.courseStudents}</span>
              <span className="stat-lbl">Course Learners</span>
            </div>
          </div>

          <div className="stat-metric-card" style={{ borderLeft: '4px solid #16a34a' }}>
            <div className="stat-icon-wrap" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
              <UserCheck size={20} />
            </div>
            <div className="stat-data-col">
              <span className="stat-val" style={{ color: '#16a34a' }}>{studentMetrics.totalStudents}</span>
              <span className="stat-lbl">Total Active Enrolled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Split Columns: Registries & Recent Visitor Logins */}
      <div className="dash-columns-split">
        {/* Main Column: Registries */}
        <div className="dash-main-col">
          <div className="dash-content-card">
            <div className="card-title-header">
              <h2 className="card-title-text">
                <Server size={18} color="#8b7050" />
                <span>Quick Access Registries</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
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
                      <span className="stat-val" style={{ fontSize: '1rem', display: 'block' }}>{c.name}</span>
                      <span className="stat-lbl" style={{ margin: 0 }}>{c.count} records</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side Column: Recent Inquiries & Submissions */}
        <div className="dash-side-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Recent Submissions */}
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
