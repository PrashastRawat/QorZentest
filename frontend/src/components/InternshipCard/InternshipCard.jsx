import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import './InternshipCard.css';

const InternshipCard = ({ internship, index, onApplyClick }) => {
  const {
    title,
    icon: Icon = Briefcase,
    tools = [],
    tag = 'Internship',
    description,
    duration = '1, 3, 6 Months',
    mode = 'Online',
    stipend = 'Performance Stipend + Certificate'
  } = internship;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="internship-card"
    >
      <div className="card-badge-header">
        <span className="stipend-badge">{stipend}</span>
      </div>

      <div className="card-main-info">
        <div className="internship-icon-wrapper">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="internship-title">{title}</h3>
          <p className="internship-description">{description}</p>
        </div>
      </div>

      {/* Internship Meta Specs */}
      <div className="internship-meta-row">
        <div className="meta-item">
          <Calendar size={14} className="meta-icon" />
          <span>Duration: <strong>{duration}</strong></span>
        </div>
        <div className="meta-item">
          <MapPin size={14} className="meta-icon" />
          <span>Access Mode: <strong>{mode || 'Online'}</strong></span>
        </div>
      </div>

      <div className="card-tools-container">
        <span className="tools-list-label">Required Skills & Stack:</span>
        <div className="tools-flex-wrap">
          {tools.map((skill, i) => (
            <span key={i} className="skill-chip">
              <CheckCircle2 size={12} className="chip-icon" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="card-footer-apply">
        <button
          className="card-apply-btn"
          onClick={() => onApplyClick && onApplyClick(title, tag, duration, mode)}
        >
          <span>Apply for Internship</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
