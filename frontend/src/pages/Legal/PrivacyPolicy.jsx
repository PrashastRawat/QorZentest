import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, MapPin, Phone, Lock } from 'lucide-react';
import './Legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        {/* Header */}
        <header className="legal-header">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="legal-badge-pill"
          >
            <ShieldCheck size={14} className="legal-badge-icon" />
            <span>Trust & Data Protection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="legal-title"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="legal-last-updated"
          >
            Last Updated: August 2026 • QorZen Technologies
          </motion.p>
        </header>

        {/* Legal Body */}
        <div className="legal-content">
          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">1</span>
              <span>Introduction</span>
            </h2>
            <p className="legal-text">
              Welcome to <strong>QorZen Technologies</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard your data when you visit our website, enroll in our courses or internship programs, or use our digital services.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">2</span>
              <span>Information We Collect</span>
            </h2>
            <p className="legal-text">
              We collect information that you provide directly to us, as well as certain technical information automatically generated during your use of our platform:
            </p>
            <ul className="legal-list">
              <li>
                <strong>Personal Identification Information:</strong> Full name, email address, phone number, academic qualification, and billing details provided during registration or enrollment.
              </li>
              <li>
                <strong>Student Academic Records:</strong> Assignment submissions, attendance logs, quiz scores, project deliverables, and course progress for issuing verified certificates and Letters of Recommendation (LOR).
              </li>
              <li>
                <strong>Technical & Usage Data:</strong> IP address, browser type, operating system, device details, and interaction logs to improve website speed and security.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">3</span>
              <span>How We Use Your Information</span>
            </h2>
            <p className="legal-text">
              Your personal data is used solely for legitimate business and educational purposes, including:
            </p>
            <ul className="legal-list">
              <li>Delivering live training sessions, classroom portal access, and curriculum resources.</li>
              <li>Evaluating hands-on project submissions and issuing verifiable digital credentials with QR validation.</li>
              <li>Communicating important program updates, schedule changes, and technical support notices.</li>
              <li>Providing career referrals, placement opportunities, and employer verification checks upon request.</li>
              <li>Preventing unauthorized access and ensuring compliance with our Terms of Service.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">4</span>
              <span>Data Protection & Security</span>
            </h2>
            <p className="legal-text">
              We implement industry-standard security protocols, including 256-bit SSL/TLS encryption, secure cloud hosting, and strict role-based access control (RBAC). We <strong>never sell, rent, or trade</strong> your personal information to third-party marketing companies.
            </p>
            <div className="legal-highlight-box">
              <p>
                <strong>Zero Commercial Sale Guarantee:</strong> QorZen Technologies does not sell student or client databases. Your information is strictly utilized for your learning journey and certification verification.
              </p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">5</span>
              <span>Your Privacy Rights</span>
            </h2>
            <p className="legal-text">
              You retain full control over your personal data. You have the right to:
            </p>
            <ul className="legal-list">
              <li>Request a copy of the personal data we hold about you.</li>
              <li>Request corrections to any inaccurate or incomplete details.</li>
              <li>Request account closure and data deletion, subject to regulatory retention obligations.</li>
              <li>Opt-out of non-essential promotional communications at any time.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">6</span>
              <span>Contact Our Privacy Team</span>
            </h2>
            <p className="legal-text">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to our legal and data protection team:
            </p>
            <div className="legal-contact-card">
              <div className="legal-contact-item">
                <MapPin size={16} />
                <span>Ithum Towers, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309</span>
              </div>
              <div className="legal-contact-item">
                <Mail size={16} />
                <span>Email: <a href="mailto:info@qorzen.in">info@qorzen.in</a></span>
              </div>
              <div className="legal-contact-item">
                <Phone size={16} />
                <span>Support: +91 9917529504</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
