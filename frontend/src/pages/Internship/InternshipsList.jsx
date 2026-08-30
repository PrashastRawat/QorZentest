import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Code,
  Globe,
  Database,
  ShieldCheck,
  Cpu,
  Smartphone,
  Cloud,
  Users,
  Megaphone,
  DollarSign,
  Layout,
  FileText,
  Target,
  Lock,
  ArrowUpRight,
  Calendar,
  MapPin,
  CheckCircle2,
  X,
  Palette,
  Video,
  FileSpreadsheet,
  BarChart2,
  Layers,
  Server,
  Calculator,
  Edit3,
  Mail,
  PhoneCall,
  Headphones,
  Award,
  Monitor,
  Network,
  Wifi,
  Shield,
  Gamepad2,
  LineChart,
  CheckCircle,
  FileCode,
  Sparkles,
  PieChart
} from 'lucide-react';
import { getInternships } from '../../api/internshipApi';
import './InternshipsList.css';

// Maps the iconName string stored on each real Internship document (see
// server/scripts/seedInternships.js) to the matching Lucide component.
// Keys must exactly match the string values written to the DB.
const ICON_MAP = {
  Sparkles, Cpu, ShieldCheck, Globe, Code, PieChart, Wifi, Megaphone, Layout,
  Smartphone, Database, Cloud, Lock, Target, Video, FileText, Gamepad2,
  LineChart, CheckCircle, Palette, Layers, DollarSign, Users, Edit3, Mail,
  PhoneCall, Headphones, Monitor, Network, Server, FileCode, FileSpreadsheet,
  BarChart2, Search, Calculator, Briefcase, Award, Shield
};

const filterCategories = ['All', 'Technical', 'Non-Technical', 'Networking'];

const InternshipsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchInternships = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getInternships();
        if (!cancelled) setInternships(res.data.data || []);
      } catch (err) {
        if (!cancelled) setError('Could not load internships. Please try again shortly.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchInternships();
    return () => { cancelled = true; };
  }, []);

  const handleApplyClick = (item) => {
    navigate(`/internship/enroll/${item._id}`);
  };

  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tools || []).some((t) => t.toLowerCase().includes(q)) ||
        (item.tag || '').toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [internships, searchQuery, activeFilter]);

  return (
    <div className="internship-list-page">
      {/* Hero Header */}
      <section className="internship-list-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Briefcase size={14} className="hero-badge-icon" />
            <span>QorZen Verified Internship Portal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Accelerate Your Career with <span className="highlight-text">Practical Internships</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Explore practical internship domains across Technical Development, Non-Technical Business, and Networking Infrastructure. Work on real client projects alongside industry mentors.
          </motion.p>

          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search internships by title or skill (e.g. MERN Stack, Data Science, HR, CCNA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="filter-pills-row">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="internship-grid-section">
        <div className="container">
          {loading ? (
            <div className="no-results-box">
              <p>Loading internships...</p>
            </div>
          ) : error ? (
            <div className="no-results-box">
              <h3>Something went wrong</h3>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="grid-header-meta">
                <h2 className="grid-section-title">
                  Available Positions{' '}
                  <span className="count-pill">
                    Showing {filteredInternships.length} of {internships.length} internships
                  </span>
                </h2>
                <p className="grid-section-sub">
                  Select any role below to view complete duration tiers, project roadmap, and enrollment details.
                </p>
              </div>

              {filteredInternships.length > 0 ? (
                <div className="internship-cards-grid">
                  {filteredInternships.map((item, index) => {
                    const IconComponent = ICON_MAP[item.iconName] || Briefcase;
                    return (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.4, delay: index * 0.03 }}
                        whileHover={{ y: -6 }}
                        className="internship-card"
                      >
                        <div className="card-badge-header">
                          <span className="category-pill">{item.category}</span>
                        </div>

                        <div className="card-main-info">
                          <div className="internship-icon-wrapper">
                            <IconComponent size={24} />
                          </div>
                          <div>
                            <h3 className="internship-title">{item.title}</h3>
                            <p className="internship-description">{item.description}</p>
                          </div>
                        </div>

                        <div className="internship-meta-row">
                          <div className="meta-item">
                            <Calendar size={14} className="meta-icon" />
                            <span>Duration: <strong>1, 3, 6 Months</strong></span>
                          </div>
                          <div className="meta-item">
                            <MapPin size={14} className="meta-icon" />
                            <span>Access Mode: <strong>{item.mode || 'Online'}</strong></span>
                          </div>
                        </div>

                        <div className="card-tools-container">
                          <span className="tools-list-label">Skills Covered:</span>
                          <div className="tools-flex-wrap">
                            {(item.tools || []).map((skill, i) => (
                              <span key={i} className="skill-chip">
                                <CheckCircle2 size={12} className="chip-icon" />
                                <span>{skill}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="card-footer-apply">
                          <button
                            type="button"
                            className="card-apply-btn"
                            onClick={() => handleApplyClick(item)}
                          >
                            <span>Apply for Internship</span>
                            <ArrowUpRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-results-box">
                  <Search size={48} className="no-results-icon" />
                  <h3>No internships found</h3>
                  <p>We couldn't find any position matching "{searchQuery}". Try another search term.</p>
                  <button
                    className="reset-filter-btn"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('All');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default InternshipsList;