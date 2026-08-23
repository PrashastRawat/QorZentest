import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './TrainingPlaceholder.css';

/**
 * TrainingPlaceholder Component
 * Dynamic placeholder page for training sub-routes (/training/corporate-training, /training/technical, etc.)
 * Uses useLocation to display the active pathname dynamically.
 */
const TrainingPlaceholder = () => {
  const location = useLocation();

  return (
    <div className="training-placeholder-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="training-placeholder-card"
      >
        {/* Top Center Pill-Shaped Badge */}
        <div className="training-badge">
          <span>✨ TRAINING</span>
        </div>

        {/* Heading */}
        <h1 className="training-heading">QorZen Training Program</h1>

        {/* Subtitle with Dynamic Pathname */}
        <p className="training-subtitle">
          This specialized module path ( <code className="dynamic-path-badge">{location.pathname}</code> ) is actively part of the QorZen Technologies curriculum architecture.
        </p>

        {/* Feature List Box */}
        <div className="training-features-box">
          <div className="feature-item">
            <span className="check-icon-wrapper">
              <Check size={14} className="check-icon" />
            </span>
            <span>Interactive course modules and hands-on capstone labs</span>
          </div>

          <div className="feature-item">
            <span className="check-icon-wrapper">
              <Check size={14} className="check-icon" />
            </span>
            <span>Mentorship from senior software & AI architects</span>
          </div>

          <div className="feature-item">
            <span className="check-icon-wrapper">
              <Check size={14} className="check-icon" />
            </span>
            <span>QorZen Industry Recognized Professional Certification</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="training-actions">
          <Link to="/training/ai-tools" className="btn-explore-ai">
            Explore AI Tools Page →
          </Link>
          <Link to="/" className="btn-back-home">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default TrainingPlaceholder;
