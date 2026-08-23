import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Compass, Award, Code, Cpu, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

// 4 Value Proposition Pillars
const whyUsPillars = [
  {
    icon: Code,
    title: 'Production-Grade Code',
    description: 'We eliminate dummy tutorials. Students & clients work directly on real, scalable enterprise codebases.'
  },
  {
    icon: Cpu,
    title: 'AI-First Curriculum',
    description: 'Every program embeds modern AI tools, agentic workflows, and LLM automation to maximize output.'
  },
  {
    icon: GraduationCap,
    title: 'Architect Mentorship',
    description: 'Learn alongside senior engineers and software architects actively building production systems.'
  },
  {
    icon: ShieldCheck,
    title: 'Guaranteed Internships',
    description: 'Practical hands-on internship pathways that transition learners directly into industry roles.'
  }
];

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Sparkles size={14} className="hero-badge-icon" />
            <span>About QorZen Technologies</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Empowering the Next Generation of <span className="highlight-text">Engineers & Creators</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            QorZen Technologies is a premier platform delivering production-level technical training, practical internships, specialized courses, and enterprise engineering solutions.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Segment */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mv-card mission-card"
            >
              <div className="mv-icon-box">
                <Target size={24} />
              </div>
              <h2 className="mv-title">Our Mission</h2>
              <p className="mv-text">
                To bridge the gap between academia and production software engineering by equipping individuals and enterprises with practical AI tools, modern frameworks, and guaranteed internship pathways.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mv-card vision-card"
            >
              <div className="mv-icon-box">
                <Compass size={24} />
              </div>
              <h2 className="mv-title">Our Vision</h2>
              <p className="mv-text">
                To become the global benchmark for AI-driven technical upskilling, fostering a thriving ecosystem of high-velocity developers, digital leaders, and scalable software solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why QorZen Value Proposition */}
      <section className="why-qorzen-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Our Value Proposition</span>
            <h2 className="section-title">Why QorZen Technologies?</h2>
            <p className="section-desc">Built on principles of technical rigor, modern tools, and career impact.</p>
          </div>

          <div className="why-us-grid">
            {whyUsPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="pillar-card"
                >
                  <div className="pillar-icon-box">
                    <Icon size={24} />
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="about-cta-wrapper">
            <Link to="/training/ai-tools" className="btn-about-primary">
              <span>Explore AI Tools Training (₹10,000)</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/auth/signup" className="btn-about-secondary">
              <span>Join QorZen Today</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
