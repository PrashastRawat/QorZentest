import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

// SVG Icon Helpers for Social Media
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

/**
 * Footer Component
 * Features updated Dehradun contact details, social media icon row, and external Jobs link (nnhire.com).
 */
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-top-grid">
          {/* Brand Info & Social Media Row */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <img src="/logo.jpeg" alt="QorZen Logo" className="footer-logo-img" />
              <div className="logo-text-wrapper">
                <span className="logo-title">QorZen</span>
                <span className="logo-sub">Technologies</span>
              </div>
            </Link>

            <p className="footer-tagline">
              Empowering individuals and enterprises with industry-leading AI training, practical internships, and cutting-edge tech courses.
            </p>

            {/* Social Media Row: Instagram, Facebook, YouTube, LinkedIn, Twitter (X) */}
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/qorzen.technologies?igsi=YWNydzBjN2dxaGJ0"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.facebook.com/share/14nuKz2dDf4/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://www.youtube.com/@QorZenTechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="YouTube"
              >
                <YoutubeIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/143350968/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://x.com/QorZenTech"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter (X)"
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>

          {/* Training Quick Links with Jobs Link */}
          <div className="footer-col">
            <h4 className="footer-heading">Training Programs</h4>
            <ul className="footer-links">
              <li><Link to="/training/ai-tools">AI Tools Mastery</Link></li>
              <li><Link to="/training/technical">Technical Engineering</Link></li>
              <li><Link to="/training/non-technical">Non-Technical Skills</Link></li>
              <li><Link to="/training/networking">Networking & Infrastructure</Link></li>
              <li><Link to="/training/corporate-training">Corporate Enterprise Training</Link></li>
              <li>
                <a
                  href="https://nnhire.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jobs-external-link"
                >
                  Jobs
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Key Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/ai-automation">AI & Automation</Link></li>
              <li><Link to="/services/data-analysis">Data Analysis & Data Science</Link></li>
              <li><Link to="/services/web-design">Web Design & Development</Link></li>
              <li><Link to="/services/cyber-security">Cyber Security</Link></li>
              <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Get In Touch Contact Details Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Get In Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Ithum Towers, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <a href="tel:+919917529504" style={{ color: 'inherit', textDecoration: 'none' }}>+91 9917529504</a>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <a href="mailto:info@qorzen.in" style={{ color: 'inherit', textDecoration: 'none' }}>info@qorzen.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} QorZen Technologies. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-and-conditions">Terms of Service</Link>
            <span>•</span>
            <Link to="/admin/login">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
