import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './ServiceHero.css';


const ServiceHero = ({ service }) => {
  if (!service) return null;

  const getConciseText = (text) => {
    if (!text) return '';
    const parts = text.split('. ');
    const first = parts[0].trim();
    return first.endsWith('.') ? first : `${first}.`;
  };

  const overviewText = getConciseText(service.overview || service.description);

  return (
    <section className="service-hero-wrapper">
      <div className="container">
        {/* Navigation Breadcrumb Back Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/#services" className="back-services-link">
            <ArrowLeft size={16} />
            <span>Back to Core Services</span>
          </Link>
        </motion.div>

        {/* Hero Header */}
        <div className="service-hero-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="service-category-badge"
          >
            <Sparkles size={14} className="sparkle-icon" />
            <span>{service.categoryName || service.categoryLabel || 'Enterprise IT Capability'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="service-main-title"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="service-tagline-text"
          >
            {service.tagline}
          </motion.p>
        </div>

        {/* Sleek Centered Overview & Capabilities Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="service-overview-card"
        >
          <div className="overview-center-block">
            <h3 className="overview-heading">Overview & Strategic Focus</h3>
            <p className="overview-p-text">{overviewText}</p>
          </div>

          {service.capabilities && service.capabilities.length > 0 && (
            <div className="capabilities-center-block">
              <span className="capabilities-sublabel">Core Capabilities & Technical Stack</span>
              <div className="capabilities-chips-wrap">
                {service.capabilities.map((cap, i) => (
                  <div key={i} className="hero-cap-chip">
                    <CheckCircle2 size={15} className="cap-check-icon" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
