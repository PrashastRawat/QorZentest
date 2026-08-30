import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Compass, Code, Cpu, ShieldCheck, Cloud, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

// 4 Enterprise Service Pillars
const whyUsPillars = [
  {
    icon: Cpu,
    title: 'AI & Intelligent Automation',
    description: 'We engineer autonomous AI agents, enterprise LLM workflows, predictive models, and robotic process automations that scale business efficiency.'
  },
  {
    icon: Code,
    title: 'Custom Software Engineering',
    description: 'End-to-end architecture and deployment of high-throughput web applications, mobile platforms, and resilient cloud-native microservices.'
  },
  {
    icon: ShieldCheck,
    title: 'Cyber Security & Defense',
    description: 'Zero-trust architecture, enterprise penetration testing, web app vulnerability scanning, compliance audits, and proactive threat mitigation.'
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure & Data',
    description: 'Modernizing legacy architectures through multi-cloud migrations, serverless pipelines, scalable data lakes, and real-time BI analytics.'
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
            Architecting Next-Gen Enterprise <span className="highlight-text">Technology & AI Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            QorZen Technologies is a full-cycle IT consulting and enterprise software engineering partner. We deliver production-grade AI automation, custom digital platforms, resilient cloud architectures, and proactive cyber security solutions.
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
                To accelerate business growth and digital transformation by delivering robust, secure, and scalable technology solutions that empower enterprises to innovate with confidence.
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
                To be the global benchmark for enterprise technology innovation, trusted by high-growth startups and global enterprises for bespoke software engineering and AI-driven automation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why QorZen Value Proposition */}
      <section className="why-qorzen-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Enterprise Capabilities</span>
            <h2 className="section-title">Our Core Service Domains</h2>
            <p className="section-desc">Delivering engineering excellence, robust security, and measurable ROI for global clients.</p>
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
            <Link to="/services/ai-automation" className="btn-about-primary">
              <span>Explore Enterprise Services</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/services/web-design" className="btn-about-secondary">
              <span>View Technology Stack</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
