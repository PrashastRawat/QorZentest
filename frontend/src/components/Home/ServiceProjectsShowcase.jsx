import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { flagshipProjects } from '../../data/projectsData';
import './ServiceProjectsShowcase.css';

/**
 * ServiceProjectsShowcase Component (Home Page Showcase)
 * Displays 11 Flagship Projects (1 for each core service capability).
 * Each card features a direct CTA button: "View More Projects ➔" routing to /services/${project.categorySlug}.
 */
const ServiceProjectsShowcase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
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
    <section id="projects-showcase" className="showcase-section">
      <div className="container">
        
        <div className="global-section-header">
          <div className="showcase-pill">
            
            <span>11 Core Capabilities</span>
          </div>
          <h2 className="section-title">Flagship Enterprise Work</h2>
          <p className="section-desc">
            Discover one landmark enterprise project for each of our 11 core IT & digital capabilities. Select any project to explore full category case studies.
          </p>
        </div>

        {/* 11-Card Responsive Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="showcase-grid-layout"
        >
          {flagshipProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="showcase-card-item"
            >
              {/* Image Banner */}
              <div className="showcase-image-box">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
                <span className="showcase-category-badge">
                  {project.serviceCategory}
                </span>
              </div>

              {/* Card Body */}
              <div className="showcase-card-body">
                <h3 className="showcase-card-title">{project.title}</h3>
                <p className="showcase-card-description">{project.description}</p>

                {/* CTA Button routing directly to /services/${project.categorySlug} */}
                <div className="showcase-card-cta">
                  <Link
                    to={`/services/${project.categorySlug}`}
                    className="btn-view-more-projects"
                  >
                    <span>View More Projects</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceProjectsShowcase;
