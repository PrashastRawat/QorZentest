import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import '../CategoryCard/CategoryCard.css';

/**
 * CourseCard Component
 * Displays course information with View Details and Enroll Now action buttons.
 * Responsive flex container: stacked on mobile, side-by-side on medium/desktop screens.
 */
const CourseCard = ({ course, index }) => {
  const { title, icon: Icon, tools, tag, description, duration, price, slug, id } = course || {};
  const { openModal } = useEnquiryModal();

  const formattedPrice = price
    ? (typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}` : price)
    : null;

  const courseSlug = slug || id || title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const handleEnroll = (specificTool) => {
    const programTitle = specificTool ? `${title} (${specificTool})` : title;
    openModal({ ...course, title: programTitle });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.05 }}
      whileHover={{ y: -6 }}
      className="category-card"
    >
      <div className="card-badge-header">
        <span className="category-tag-pill">{tag || 'Certified'}</span>
      </div>

      <div className="card-main-info">
        <div className="category-icon-wrapper">
          {Icon && <Icon size={24} />}
        </div>
        <div className="card-title-group">
          <h3 className="category-title">{title}</h3>
          <p className="category-description">{description || `Master top skills in ${title?.toLowerCase()}`}</p>
        </div>
      </div>

      {tools && tools.length > 0 && (
        <div className="card-tools-container">
          <span className="tools-list-label">Featured Stack:</span>
          <div className="tools-flex-wrap">
            {tools.map((tool, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="tool-chip"
                onClick={() => handleEnroll(tool)}
              >
                <CheckCircle2 size={13} className="chip-icon" />
                <span>{tool}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="card-meta-pricing-box" style={{ marginTop: '0.25rem' }}>
        <span className="card-meta-label">Program Fee</span>
        <div className="meta-values-row">
          {formattedPrice ? (
            <span className="bold-price">{formattedPrice}</span>
          ) : (
            <span className="bold-price free-tag">Enrollment Open</span>
          )}
        </div>
      </div>

      {/* Action Buttons Flex Container (Stacked on mobile, side-by-side on md screens) */}
      <div className="card-actions-flex-container">
        <Link
          to={`/courses/${courseSlug}`}
          className="btn-view-details"
        >
          <Eye size={15} />
          <span>View Details</span>
        </Link>
        <button
          className="card-enroll-btn"
          onClick={() => handleEnroll()}
        >
          <span>Enroll Now</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
