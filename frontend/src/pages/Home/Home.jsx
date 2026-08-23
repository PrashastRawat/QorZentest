import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../../components/Home/Hero';
import ServiceProjectsShowcase from '../../components/Home/ServiceProjectsShowcase';
import IndustryProjectsSlider from './IndustryProjectsSlider';
import TestimonialsSlider from './TestimonialsSlider';
import FeaturedPortfolio from './FeaturedPortfolio';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Building2,
  Lock,
  CheckCircle2,
  Star,
  Quote
} from 'lucide-react';
import { b2bServices, featuredProjects, statsOverview, clientTestimonials } from '../../data/homeData';
import './Home.css';

const Home = () => {
  return (
    <div className="agency-home-page">
      {/* 1. Hero Section (Redesigned 2-Column Modular Component) */}
      <Hero />

      {/* 2. Stats Overview Section (Animated Trust Metrics) */}
      <section className="stats-overview-section">
        <div className="container">
          <div className="stats-overview-grid">
            {statsOverview.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="stats-overview-card"
                >
                  <div className="stats-icon-box">
                    <StatIcon className="stat-icon-svg" />
                  </div>
                  <h3 className="stats-counter-val">{stat.value}</h3>
                  <p className="stats-counter-lbl">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Core B2B Services Grid */}
      <section id="services" className="agency-services-section">
        <div className="container">
          <div className="global-section-header">
            <span className="section-subtitle">Solutions Built for Enterprise Scale</span>
            <h2 className="section-title">Our Core IT & Digital Capabilities</h2>
            <p className="section-desc">From custom AI agent orchestration to zero-trust cloud security, we deliver end-to-end technical superiority.</p>
          </div>

          <div className="services-cards-grid">
            {b2bServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="b2b-service-card"
                >
                  <div className="service-icon-box">
                    <Icon size={24} />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>

                  <div className="service-tags-wrap">
                    {service.tags.map((t) => (
                      <span key={t} className="service-tag">{t}</span>
                    ))}
                  </div>

                  <Link to={service.link} className="service-link-btn">
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 11-Service Flagship Portfolio Showcase with Direct Category CTA Routing */}
      <ServiceProjectsShowcase />

      {/* 4. Auto-Swapping Top Industry Projects Slider with 2 Arrow Navigation Controls */}
      <IndustryProjectsSlider />

      {/* 5. Client Testimonials Slider with Edge-Aligned Navigation */}
      <TestimonialsSlider />

      {/* 6. Why Choose Us / Value Proposition */}
      <section className="why-choose-us-section">
        <div className="container">
          <div className="global-section-header">
            <span className="section-subtitle">The QorZen Advantage</span>
            <h2 className="section-title">Why Global Enterprises Partner with QorZen</h2>
            <p className="section-desc">We don't just write code—we engineer strategic technology assets designed for performance, security, and market leadership.</p>
          </div>

          <div className="why-points-list">
            <div className="why-point-item">
              <div className="why-point-icon"><Building2 size={20} /></div>
              <div>
                <h4>Architect-Led Engineering</h4>
                <p>Every client project is directly supervised by principal software architects with enterprise experience.</p>
              </div>
            </div>

            <div className="why-point-item">
              <div className="why-point-icon"><Sparkles size={20} /></div>
              <div>
                <h4>AI-Native Integration</h4>
                <p>We embed autonomous AI agent capabilities into workflows to lower operating costs and increase output.</p>
              </div>
            </div>

            <div className="why-point-item">
              <div className="why-point-icon"><Lock size={20} /></div>
              <div>
                <h4>Enterprise-Grade Security</h4>
                <p>SOC 2 compliance, ISO 27001 auditing, and zero-trust cloud network security baked into every release.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
