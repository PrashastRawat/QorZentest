import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, MapPin, Phone, Scale } from 'lucide-react';
import './Legal.css';

const TermsAndConditions = () => {
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
            <Scale size={14} className="legal-badge-icon" />
            <span>Official Terms & Policies</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="legal-title"
          >
            Terms & Conditions
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
              <span>Acceptance of Terms</span>
            </h2>
            <p className="legal-text">
              By accessing, browsing, registering for an account, or enrolling in any training courses, internships, or enterprise services offered by <strong>QorZen Technologies</strong> ("Company," "we," or "us"), you agree to be legally bound by these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from using our services.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">2</span>
              <span>Eligibility & Account Registration</span>
            </h2>
            <p className="legal-text">
              To participate in our educational courses or internship programs:
            </p>
            <ul className="legal-list">
              <li>You must provide accurate, current, and complete registration information.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials and password.</li>
              <li>Sharing portal credentials or unauthorized redistribution of course materials is strictly prohibited.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">3</span>
              <span>Internship & Certification Guidelines</span>
            </h2>
            <p className="legal-text">
              QorZen Technologies delivers hands-on, practical internships designed to bridge academic learning with production engineering:
            </p>
            <ul className="legal-list">
              <li>
                <strong>Certificate Issuance:</strong> Completion certificates are awarded only upon meeting minimum attendance requirements and satisfactory completion of assigned project tasks.
              </li>
              <li>
                <strong>Letter of Recommendation (LOR):</strong> Official LORs are issued for 3-Month and 6-Month duration tracks based on mentor evaluation and codebase quality.
              </li>
              <li>
                <strong>Stipends & PPO Opportunities:</strong> Performance stipends and Pre-Placement Offer (PPO) opportunities are performance-contingent and awarded at the discretion of project managers and hiring partners.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">4</span>
              <span>Payment, Fees & Refund Policy</span>
            </h2>
            <p className="legal-text">
              All program fees are clearly displayed in INR (₹) including applicable taxes. Payments must be settled prior to batch onboarding.
            </p>
            <div className="legal-highlight-box">
              <p>
                <strong>Transparent Fee Policy:</strong> Once onboarding orientation commences and proprietary project repositories or portal resources are provisioned, registration fees are generally non-refundable except under special evaluated circumstances.
              </p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">5</span>
              <span>Intellectual Property Rights</span>
            </h2>
            <p className="legal-text">
              All website content, curriculum frameworks, proprietary datasets, logos, trademarks, and documentation are the exclusive intellectual property of QorZen Technologies. Students retain ownership of their individual original code contributions created during personal project assignments.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">6</span>
              <span>Code of Conduct & Academic Integrity</span>
            </h2>
            <p className="legal-text">
              Students and participants are expected to maintain professional conduct across all live lecture sessions, doubt clearings, Discord/Slack channels, and peer reviews. Harassment, unauthorized scraping, plagiarism, or disruptive behavior will result in immediate termination of portal access without refund.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">7</span>
              <span>Jurisdiction & Dispute Resolution</span>
            </h2>
            <p className="legal-text">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any legal disputes arising out of or related to our services shall be subject to the exclusive jurisdiction of the courts in Gautam Buddha Nagar (Noida), Uttar Pradesh, India.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">
              <span className="legal-section-num">8</span>
              <span>Contact Us</span>
            </h2>
            <p className="legal-text">
              For any legal notices, queries, or clarification on our terms, please contact:
            </p>
            <div className="legal-contact-card">
              <div className="legal-contact-item">
                <MapPin size={16} />
                <span>Ithum Towers, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309</span>
              </div>
              <div className="legal-contact-item">
                <Phone size={16} />
                <span>Phone / Mobile: +91 9917529504</span>
              </div>
              <div className="legal-contact-item">
                <Mail size={16} />
                <span>Email: <a href="mailto:info@qorzen.in">info@qorzen.in</a></span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
