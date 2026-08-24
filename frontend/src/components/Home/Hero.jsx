import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Cpu, Zap } from 'lucide-react';
import './Hero.css';


const Hero = () => {
  return (
    <section className="hero-section-wrapper">
      <div className="container">
        <div className="hero-2col-grid">
          {/* Left Column: Content & Calls to Action */}
          <div className="hero-content-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="hero-main-title"
            >
              Transform Your Business with <br />
              <span className="hero-title-highlight">Next-Gen IT & AI Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="hero-subheadline-desc"
            >
              QorZen Technologies partners with forward-thinking enterprises to design, build, and scale production-grade AI automations, high-performance web applications, cloud infrastructure, and cybersecurity systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="hero-cta-horizontal-group"
            >
              <a href="#services" className="btn-hero-primary">
                <span>Explore Our Services</span>
                <ArrowRight size={16} />
              </a>
              <a href="#projects-showcase" className="btn-hero-secondary">
                <span>View Major Projects</span>
              </a>
            </motion.div>

            {/* Trust Highlights Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="hero-trust-chips-row"
            >
              <div className="hero-trust-chip">
                <ShieldCheck size={15} className="chip-trust-icon" />
                <span>Zero-Trust Security</span>
              </div>
              <div className="hero-trust-chip">
                <Cpu size={15} className="chip-trust-icon" />
                <span>AI-Native Workflows</span>
              </div>
              <div className="hero-trust-chip">
                <Zap size={15} className="chip-trust-icon" />
                <span>24/7 SLA Uptime</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hero-visual-right"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: 'easeInOut'
              }}
              className="hero-floating-card"
            >
              <img
                src="/assets/hero/hero-developer-desk.png"
                alt="QorZen Enterprise IT & Software Development"
                loading="eager"
                onError={(e) => {
                  e.target.src = '/hero-main.png';
                }}
              />
              
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
