import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2
} from 'lucide-react';
import './IndustryProjectsSlider.css';

// Enterprise Industry Projects Data with Unique High-Resolution Web Image URLs (Simple Terms)
const topIndustryProjects = [
  {
    id: 'proj-fintech-commerce',
    title: 'Online Shopping Store & Easy Payments',
    client: 'Retail Store Network',
    category: 'E-Commerce & Online Payments',
    impact: 'Crossed ₹100 Crore Online Sales',
    metric: '₹100 Cr+',
    image: '/assets/services/industry-projects/proj-fintech-commerce.jpg',
    desc: 'Designed a fast online shopping website with easy card/UPI payment options, discount coupons, and instant order updates.',
    tech: ['Next.js', 'Stripe API', 'Redis', 'Microservices']
  },
  {
    id: 'proj-ai-suite',
    title: 'AI Customer Chatbot & Support Assistant',
    client: 'SaaS Software Enterprise',
    category: 'AI & Automation',
    impact: 'Saved 85% Customer Support Time',
    metric: '85%',
    image: '/assets/services/industry-projects/proj-ai-suite.jpg',
    desc: 'Created smart AI chat assistants that answer customer questions 24/7, help with troubleshooting, and resolve complaints automatically.',
    tech: ['Python', 'LangChain', 'OpenAI GPT-4', 'Pinecone', 'n8n']
  },
  {
    id: 'proj-hrms-ai',
    title: 'HR Staff Portal & AI Resume Scanner',
    client: 'Global Recruitment Firm',
    category: 'HR & Staffing Automation',
    impact: '65% Faster Employee Hiring',
    metric: '65%',
    image: '/assets/services/industry-projects/proj-hrms-ai.jpg',
    desc: 'Developed an easy HR website that scans job applicant resumes, arranges interview dates, and manages daily staff attendance.',
    tech: ['React.js', 'Node.js', 'Python', 'PostgreSQL', 'n8n']
  },
  {
    id: 'proj-cyber-cloud',
    title: 'Secure Cloud Storage & Cyber Protection',
    client: 'Capital Investment Network',
    category: 'Cloud & Security',
    impact: '100% Data Safety & Zero Downtime',
    metric: '100%',
    image: '/assets/services/industry-projects/proj-cyber-cloud.jpg',
    desc: 'Configured safe cloud servers on AWS with firewall security to protect company files from hackers and data loss.',
    tech: ['AWS VPC', 'Kubernetes', 'Palo Alto Firewalls', 'Terraform']
  }
];

const IndustryProjectsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalProjects = topIndustryProjects.length;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalProjects);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, totalProjects]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const currentProject = topIndustryProjects[currentIndex];

  return (
    <section id="industry-projects-slider" className="industry-slider-section">
      <div className="container">
        {/* Global Center-Aligned Section Header */}
        <div className="global-section-header">
          <div className="slider-badge-pill">
            <Sparkles size={14} className="badge-icon" />
            <span>Enterprise Portfolio Showcase</span>
          </div>
          <h2 className="slider-section-title">Our Top Industry Projects</h2>
          <p className="slider-section-desc">
            Explore benchmark enterprise implementations delivered across global logistics, retail commerce, AI automation, HRMS, and cybersecurity.
          </p>
        </div>

        {/* Carousel Active Slide Showcase Box with Edge-Aligned Navigation */}
        <div
          className="slider-showcase-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge-Aligned Left Navigation Arrow */}
          <button
            type="button"
            className="slider-edge-nav prev-edge-btn"
            onClick={handlePrev}
            aria-label="Previous Project Slide"
            title="Previous Project"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Edge-Aligned Right Navigation Arrow */}
          <button
            type="button"
            className="slider-edge-nav next-edge-btn"
            onClick={handleNext}
            aria-label="Next Project Slide"
            title="Next Project"
          >
            <ChevronRight size={22} />
          </button>

          {/* Fixed Non-Jittering Card Container */}
          <div className="slider-active-card">
            {/* Left Image Banner Column */}
            <div className="slider-card-image-box">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentProject.image}
                  src={currentProject.image}
                  alt={currentProject.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
              </AnimatePresence>
              <span className="slider-category-pill">
                {currentProject.category}
              </span>
              <span className="slider-count-badge">
                {currentIndex + 1} / {totalProjects}
              </span>
            </div>

            {/* Right Details Body Column */}
            <div className="slider-card-info-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <div className="client-name-tag">
                    <Building2 size={14} className="client-icon" />
                    <span>{currentProject.client}</span>
                  </div>

                  <h3 className="project-headline-title">{currentProject.title}</h3>

                  <p className="project-description-text">{currentProject.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Pagination Indicators / Dots */}
          <div className="slider-pagination-dots">
            {topIndustryProjects.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`pagination-dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryProjectsSlider;
