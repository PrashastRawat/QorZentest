import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, ArrowRight, Tag } from 'lucide-react';
import { coursePricingData } from '../../data/courses';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import './Courses.css';

const categories = [
  'All Courses',
  'Networking',
  'AI & Digital Skills',
  'Technical Domains',
  'Non-Technical Domains'
];

/**
 * Public Courses Page Component
 * High-Density 3-Column Compact Grid Layout with Dynamic Enrollment Popup.
 */
const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const { openModal } = useEnquiryModal();

  const filteredCourses = activeCategory === 'All Courses'
    ? coursePricingData
    : coursePricingData.filter((c) => c.category === activeCategory);

  return (
    <div className="courses-page-wrapper">
      <section className="section container">
        {/* Global Center-Aligned Section Header */}
        <div className="global-section-header" style={{ marginBottom: '2rem' }}>
          <div className="showcase-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', backgroundColor: 'var(--surface-card)', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-medium)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            <Sparkles size={14} color="var(--deep-accent)" />
            <span>QorZen Learning Academy</span>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '0.5rem' }}>
            Explore Professional Courses
          </h1>
          <p className="section-desc" style={{ fontSize: '0.9rem' }}>
            Master high-demand tech skills, AI automation, networking engineering, and enterprise leadership with our 70+ certified training programs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Compact 3-Column High-Density Grid Mapping */}
        <div className="courses-grid-layout">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id || course.title + idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.015 }}
              className="course-card-compact"
            >
              <div>
                {/* Category Badge & Duration */}
                <div className="course-card-header">
                  <span className="course-category-tag">
                    <Tag size={11} color="#c9b59c" />
                    {course.category}
                  </span>
                  <span className="course-duration-lbl">
                    <Clock size={12} />
                    {course.duration}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="course-card-title">
                  {course.title}
                </h3>

                <p className="course-card-desc">
                  Includes hands-on practical labs, real-world case studies, and QorZen industry certification.
                </p>
              </div>

              {/* Pricing & CTA */}
              <div className="course-card-footer">
                <div>
                  <span className="fee-lbl">Enrollment Fee</span>
                  <span className="fee-val">
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => openModal(course)}
                  className="btn-course-enroll"
                >
                  <span>Enroll Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;
