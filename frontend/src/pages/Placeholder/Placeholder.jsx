import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import './Placeholder.css';

const Placeholder = ({ title, category }) => {
  const location = useLocation();
  const pageTitle = title || location.pathname.split('/').pop().replace(/-/g, ' ').toUpperCase();

  return (
    <div className="placeholder-page container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="placeholder-card"
      >
        <div className="placeholder-badge">
          <Sparkles size={14} />
          <span>{category || 'QorZen Module'}</span>
        </div>
        <h1 className="placeholder-title">{pageTitle}</h1>
        <p className="placeholder-subtitle">
          This specialized module path (<code>{location.pathname}</code>) is actively part of the QorZen Technologies curriculum architecture.
        </p>

        <div className="placeholder-highlights">
          <div className="highlight-item">
            <CheckCircle2 size={16} className="highlight-icon" />
            <span>Interactive course modules and hands-on capstone labs</span>
          </div>
          <div className="highlight-item">
            <CheckCircle2 size={16} className="highlight-icon" />
            <span>Mentorship from senior software & AI architects</span>
          </div>
          <div className="highlight-item">
            <CheckCircle2 size={16} className="highlight-icon" />
            <span>QorZen Industry Recognized Professional Certification</span>
          </div>
        </div>

        <div className="placeholder-actions">
          <Link to="/training/ai-tools" className="btn-primary-placeholder">
            <span>Explore AI Tools Page</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/" className="btn-secondary-placeholder">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Placeholder;
