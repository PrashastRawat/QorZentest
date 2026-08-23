import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Clock, Eye } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import './CategoryCard.css';


const CategoryCard = ({ category, index }) => {
  const { title, icon: Icon, tools, tag, description, duration, price } = category;
  const { openModal, openDetailsModal } = useEnquiryModal();

  const formattedPrice = price
    ? (typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}` : price)
    : null;

  const handleEnroll = (specificTool) => {
    const programTitle = specificTool ? `${title} (${specificTool})` : title;
    openModal({ ...category, title: programTitle });
  };

  const handleViewDetails = () => {
    openDetailsModal(category);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="category-card"
    >
      <div className="card-badge-header">
        <span className="category-tag-pill">{tag}</span>
        {duration && (
          <div className="duration-tag-badge">
            <Clock size={13} className="duration-tag-icon" />
            <span className="duration-text">{duration}</span>
          </div>
        )}
      </div>

      <div className="card-main-info">
        <div className="category-icon-wrapper">
          {Icon && <Icon size={24} />}
        </div>
        <div className="card-title-group">
          <h3 className="category-title">{title}</h3>
          <p className="category-description">{description || `Master top tools in ${title.toLowerCase()}`}</p>
        </div>
      </div>

      <div className="card-tools-container">
        <span className="tools-list-label">Featured Stack:</span>
        <div className="tools-flex-wrap">
          {tools && tools.map((tool, i) => (
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

      <div className="card-footer-pricing">
        <div className="card-meta-pricing-box">
          <span className="card-meta-label">Cost & Duration</span>
          <div className="meta-values-row">
            {formattedPrice ? (
              <span className="bold-price">{formattedPrice}</span>
            ) : (
              <span className="bold-price free-tag">Enrollment Open</span>
            )}
            <span className="meta-separator">•</span>
            <span className="bold-duration">{duration || 'Flexible Track'}</span>
          </div>
        </div>

        <div className="card-actions-flex-container">
          <button
            className="btn-view-details"
            onClick={handleViewDetails}
          >
            <Eye size={14} />
            <span>View Details</span>
          </button>
          <button
            className="card-enroll-btn"
            onClick={() => handleEnroll()}
          >
            <span>Enroll Now</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
