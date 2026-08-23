import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Workflow, Cpu, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';
import './ServiceFrameworkSection.css';

/**
 * ServiceFrameworkSection Component
 * Displays structured architectural content for the active service:
 * 1. Our Strategic Approach & "Why We Use This Way" Rationale.
 * 2. 4-Step Proven Delivery Methodology.
 * 3. Core Engineering Techniques & Architectures Deployed.
 */
const ServiceFrameworkSection = ({ service }) => {
  if (!service) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  return (
    <section className="service-framework-section">
      <div className="container">
        {/* Section 1: Strategic Approach & "Why We Use This Way" */}
        <div className="framework-top-grid">
          {/* Strategic Approach Card */}
          <div className="framework-card approach-card">
            <div className="framework-badge-pill">
              <Compass size={18} className="card-badge-icon" />
              <span>Architectural Strategy</span>
            </div>
            <h3 className="framework-card-title">How We Approach {service.title}</h3>
            <p className="framework-card-text">{service.approach || service.overview}</p>
          </div>

          {/* "Why This Way" Rationale Card */}
          <div className="framework-card why-card">
            <div className="framework-badge-pill accent-badge">
              <HelpCircle size={18} className="card-badge-icon" />
              <span>Why This Approach?</span>
            </div>
            <h3 className="framework-card-title">Why We Engineer It This Way</h3>
            <p className="framework-card-text">{service.whyThisWay || 'Our architect-led methodology eliminates monolithic bottlenecks, enforces enterprise security compliance, and guarantees measurable ROI.'}</p>
          </div>
        </div>

        {/* Section 2: 4-Step Delivery Methodology */}
        {service.methodology && service.methodology.length > 0 && (
          <div className="framework-methodology-wrap">
            <div className="global-section-header">
              <div className="header-pill">
                <Workflow size={14} className="pill-icon" />
                <span>Proven Delivery Blueprint</span>
              </div>
              <h2 className="section-title">Our 4-Step Engineering Methodology</h2>
              <p className="section-desc">
                Every enterprise implementation follows a rigorous, zero-downtime lifecycle from discovery to continuous production delivery.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="methodology-timeline-grid"
            >
              {service.methodology.map((m, index) => (
                <motion.div key={index} variants={cardVariants} className="methodology-step-card">
                  <div className="step-num-badge">{m.step || `0${index + 1}`}</div>
                  <h4 className="step-card-title">{m.title}</h4>
                  <p className="step-card-desc">{m.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Section 3: Specialized Techniques & Architectures */}
        {service.techniques && service.techniques.length > 0 && (
          <div className="framework-techniques-wrap">
            <div className="global-section-header">
              <div className="header-pill">
                <Cpu size={14} className="pill-icon" />
                <span>Core Engineering Stack</span>
              </div>
              <h2 className="section-title">Specialized Techniques & Architectures</h2>
              <p className="section-desc">
                We deploy advanced enterprise techniques engineered specifically to deliver sub-second performance, high availability, and data privacy.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="techniques-2x2-grid"
            >
              {service.techniques.map((t, idx) => (
                <motion.div key={idx} variants={cardVariants} className="technique-item-card">
                  <div className="technique-icon-box">
                    <CheckCircle2 size={20} className="tech-check-icon" />
                  </div>
                  <div>
                    <h4 className="technique-title">{t.title}</h4>
                    <p className="technique-desc">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceFrameworkSection;
