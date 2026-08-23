import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Award, Zap, CheckCircle2, Lock, Users } from 'lucide-react';
import './ServiceFeatures.css';


const ServiceFeatures = ({ categorySlug = '', serviceTitle = '' }) => {

  const featurePillars = [
    {
      icon: Cpu,
      title: 'Architect-Led Production Engineering',
      desc: 'Every project is directly supervised by principal software architects with multi-cloud enterprise experience.'
    },
    {
      icon: Lock,
      title: 'Strict NDA & Zero-Trust Security',
      desc: 'Client intellectual property is protected under strict NDAs, encrypted data storage, and SOC 2 / ISO 27001 auditing.'
    },
    {
      icon: Award,
      title: 'Guaranteed SLA & 24/7 Monitoring',
      desc: 'We commit to strict Service Level Agreements (SLAs), zero-downtime release pipelines, and round-the-clock telemetry.'
    },
    {
      icon: Zap,
      title: 'Transparent Milestone Billing',
      desc: 'Sprint reviews every two weeks with clear technical deliverables, performance benchmarking, and measurable ROI.'
    }
  ];

  return (
    <section className="service-features-section">
      <div className="container">
        <div className="section-header center">
          <span className="section-subtitle">Novanectar-Inspired Capability Framework</span>
          <h2 className="section-title">Why Enterprise Leaders Choose QorZen for {serviceTitle}</h2>
          <p className="section-desc">We deliver strategic, production-grade technology assets designed for performance, security, and long-term scalability.</p>
        </div>

        <div className="features-pillars-grid">
          {featurePillars.map((feature, idx) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="feature-pillar-card"
              >
                <div className="pillar-icon-box">
                  <FeatureIcon size={22} />
                </div>
                <h3 className="pillar-title">{feature.title}</h3>
                <p className="pillar-desc">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
