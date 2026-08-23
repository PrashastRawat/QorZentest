import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { featuredProjects } from '../../data/featuredProjects';
import './FeaturedPortfolio.css';


const FeaturedPortfolio = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  return (
    <section id="portfolio" className="featured-portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="global-section-header">
          <div className="header-badge-pill">
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>Our Flagship Work</span>
          </div>
          <h2 className="section-title">Featured Enterprise Portfolio</h2>
          <p className="section-desc">
            Explore 11 flagship projects engineered across our core IT and digital service capabilities. Designed for production performance, security, and high ROI.
          </p>
        </div>

        {/* 11-Card Responsive Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="portfolio-grid-layout"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="portfolio-card-item"
            >
              {/* Image Container with Fallback handling */}
              <div className="portfolio-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="portfolio-bg-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop';
                  }}
                />

                {/* Top Category Badge */}
                <span className="portfolio-category-pill">
                  {project.serviceCategory}
                </span>

                {/* Hover Gradient Overlay */}
                <div className="portfolio-gradient-overlay">
                  <div className="overlay-content">
                    <span className="overlay-service-tag">{project.serviceCategory}</span>
                    <h3 className="overlay-project-title">{project.title}</h3>
                    <p className="overlay-description">{project.description}</p>

                    <Link
                      to={`/services/${project.serviceSlug}`}
                      className="portfolio-read-more-btn"
                    >
                      <span>Explore Service Case Study</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPortfolio;
