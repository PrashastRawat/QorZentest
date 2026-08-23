import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FolderGit2, Layers, Zap } from 'lucide-react';
import './ServiceProjectsGrid.css';


const ServiceProjectsGrid = ({ projects = [], serviceSlug = '' }) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <section className="service-projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="global-section-header">
          <div className="header-pill">
            <FolderGit2 size={14} className="pill-icon" />
            <span>Category Portfolio ({projects.length} Case Studies)</span>
          </div>
          <h2 className="section-title">
            Projects Delivered in <span className="highlight-category">{serviceSlug ? serviceSlug.replace('-', ' ').toUpperCase() : 'SERVICE'}</span>
          </h2>
          <p className="section-desc">
            Explore 5-6 realistic B2B enterprise projects delivered by our principal engineering teams specifically for this service category.
          </p>
        </div>

        {/* 5-6 Category Specific Project Grid */}
        {projects.length > 0 ? (
          <div className="service-projects-grid-layout">
            {projects.map((proj) => (
              <div
                key={proj.id || proj._id}
                className="service-project-card"
              >
                {/* Image Banner */}
                <div className="proj-image-box">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />
                  <div className="proj-client-pill">
                    <span>{proj.client}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="proj-card-content">
                  <h3 className="proj-card-title">{proj.title}</h3>
                  <p className="proj-card-description">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-projects-fallback">
            <Layers size={40} className="empty-icon" />
            <h3>No Projects Found for category: {serviceSlug}</h3>
            <p>// BE-HANDOFF: Ensure GET /api/v1/projects?category={serviceSlug} returns a JSON array from MongoDB.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceProjectsGrid;
