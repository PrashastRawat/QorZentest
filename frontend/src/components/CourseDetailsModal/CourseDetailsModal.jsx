import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  Tag,
  CheckCircle2,
  BookOpen,
  Award,
  Users,
  Briefcase,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import './CourseDetailsModal.css';

/**
 * CourseDetailsModal Component
 * Interactive modal popup displaying complete course details, syllabus highlights,
 * featured stack tools, prerequisites, and direct Enroll CTA.
 */
const CourseDetailsModal = () => {
  const { isDetailsOpen, closeDetailsModal, selectedDetailsCourse, openModal } = useEnquiryModal();

  if (!isDetailsOpen || !selectedDetailsCourse) return null;

  const { title, tag, description, duration, price, tools, department, icon: Icon } = selectedDetailsCourse;

  const formattedPrice = price
    ? (typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}` : price)
    : 'Enrollment Open';

  const handleEnrollDirect = () => {
    closeDetailsModal();
    openModal(selectedDetailsCourse);
  };

  return (
    <AnimatePresence>
      <div className="details-modal-backdrop" onClick={closeDetailsModal}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
          className="details-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Icon Button */}
          <button onClick={closeDetailsModal} className="details-close-btn" aria-label="Close Course Details">
            <X size={18} />
          </button>

          {/* Top Header Badge */}
          <div className="details-header-badge-row">
            <span className="details-tag-pill">
              <Tag size={12} />
              {tag || department || 'Certified Program'}
            </span>
            {duration && (
              <span className="details-duration-pill">
                <Clock size={12} />
                {duration}
              </span>
            )}
          </div>

          {/* Main Title & Overview */}
          <div className="details-main-info">
            <h2 className="details-title">{title}</h2>
            <p className="details-description">
              {description || `Master top tools and practical skills in ${title.toLowerCase()} with live industry projects and hands-on guidance.`}
            </p>
          </div>

          {/* Price & Duration Meta Box */}
          <div className="details-meta-box">
            <div className="meta-col">
              <span className="meta-col-label">Course Duration</span>
              <span className="meta-col-val">{duration || 'Flexible Track'}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-col">
              <span className="meta-col-label">Program Fee</span>
              <span className="meta-col-val price-highlight">{formattedPrice}</span>
            </div>
          </div>

          {/* Featured Tools & Technologies */}
          {tools && tools.length > 0 && (
            <div className="details-tools-section">
              <h4 className="section-small-title">
                <Sparkles size={14} className="title-icon" />
                Featured Tech Stack & Tools:
              </h4>
              <div className="details-tools-flex">
                {tools.map((tool, i) => (
                  <span key={i} className="details-tool-chip">
                    <CheckCircle2 size={13} className="chip-check-icon" />
                    <span>{tool}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* What You Will Learn & Highlights */}
          <div className="details-highlights-section">
            <h4 className="section-small-title">
              <BookOpen size={14} className="title-icon" />
              What You Will Learn & Key Benefits:
            </h4>
            <div className="highlights-grid">
              <div className="highlight-item">
                <Award size={16} className="item-icon" />
                <div>
                  <strong>Industry Certification</strong>
                  <p>ISO-Certified completion certificate recognized by top tech companies.</p>
                </div>
              </div>
              <div className="highlight-item">
                <Users size={16} className="item-icon" />
                <div>
                  <strong>1-on-1 Mentorship</strong>
                  <p>Personalized doubt clearing sessions with senior industry engineers.</p>
                </div>
              </div>
              <div className="highlight-item">
                <Briefcase size={16} className="item-icon" />
                <div>
                  <strong>Live Practical Projects</strong>
                  <p>Build real-world client projects to strengthen your portfolio.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="details-modal-footer">
            <button onClick={closeDetailsModal} className="btn-close-details">
              Close Preview
            </button>
            <button onClick={handleEnrollDirect} className="btn-enroll-from-details">
              <span>Enroll Now</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CourseDetailsModal;
