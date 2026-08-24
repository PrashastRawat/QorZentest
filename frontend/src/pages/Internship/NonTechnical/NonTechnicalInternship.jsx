import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Search,
  Check,
  X,
  Zap,
  Users,
  Megaphone,
  DollarSign,
  Layout,
  FileText,
  Target
} from 'lucide-react';
import InternshipCard from '../../../components/InternshipCard/InternshipCard';
import './NonTechnicalInternship.css';

export const nonTechnicalInternshipData = [
  {
    id: 'hr-intern',
    title: 'HR & Talent Acquisition Intern',
    tag: 'Human Resources',
    categoryGroup: 'management',
    icon: Users,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Assist in candidate sourcing, technical interview scheduling, employee onboarding, and HR operations.',
    tools: ['LinkedIn Recruiter', 'Keka HR', 'Workday', 'Excel', 'Google Workspace']
  },
  {
    id: 'digital-marketing-intern',
    title: 'Digital Marketing & SEO Intern',
    tag: 'Marketing',
    categoryGroup: 'marketing',
    icon: Megaphone,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Manage Meta & Google ad campaigns, execute keyword research, write SEO copy, and track ROI funnels.',
    tools: ['Meta Ads Manager', 'Google Ads', 'Ahrefs', 'GA4', 'Canva']
  },
  {
    id: 'bizdev-associate-intern',
    title: 'Business Development Associate Intern',
    tag: 'Sales',
    categoryGroup: 'sales',
    icon: DollarSign,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Lead generation, corporate outreach, cold emailing, and pipeline management in CRM systems.',
    tools: ['Apollo.io', 'LinkedIn Sales Nav', 'HubSpot CRM', 'Cold Outreach']
  },
  {
    id: 'ui-ux-design-intern',
    title: 'UI/UX Product Design Intern',
    tag: 'Design',
    categoryGroup: 'design',
    icon: Layout,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Design wireframes, mobile app UI mockups, design systems, and participate in user feedback research.',
    tools: ['Figma', 'Miro', 'Adobe XD', 'Prototyping', 'User Research']
  },
  {
    id: 'content-social-intern',
    title: 'Content Strategy & Social Media Intern',
    tag: 'Content',
    categoryGroup: 'marketing',
    icon: FileText,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Create viral Instagram reels, write LinkedIn posts, manage community engagement, and design ad visuals.',
    tools: ['CapCut', 'Canva AI', 'Instagram Studio', 'ChatGPT', 'Buffer']
  },
  {
    id: 'product-mgmt-intern',
    title: 'Product Management Intern',
    tag: 'Product',
    categoryGroup: 'management',
    icon: Target,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Gather feature requirements, write user stories in Jira, analyze product metrics, and assist sprint meetings.',
    tools: ['Jira', 'Mixpanel', 'Notion', 'Figma', 'Productboard']
  }
];

const categories = [
  { key: 'all', label: 'All Positions' },
  { key: 'marketing', label: 'Marketing & Content' },
  { key: 'sales', label: 'Sales & BizDev' },
  { key: 'management', label: 'HR & Product' },
  { key: 'design', label: 'UI/UX Design' }
];

const NonTechnicalInternship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRoleModal, setSelectedRoleModal] = useState(null);

  const filteredData = useMemo(() => {
    return nonTechnicalInternshipData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryGroup === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleApplyClick = (title, tag, duration, mode) => {
    setSelectedRoleModal({ title, tag, duration, mode });
  };

  return (
    <div className="technical-page">
      {/* Hero Section */}
      <section className="technical-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Briefcase size={14} className="hero-badge-icon" />
            <span>QorZen Non-Technical & Business Internship Portal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Guaranteed Practical <br />
            <span className="highlight-text">Business & HR Internships</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Gain hands-on corporate experience in HR, Digital Marketing, B2B Sales, UI/UX Design, and Product Management. Work on real campaigns & client deliverables.
          </motion.p>

          {/* Search & Filter Bar */}
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search business internships (e.g. HR, Digital Marketing, UI/UX, Sales)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="category-tabs flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Content Section */}
      <section className="technical-grid-section">
        <div className="container">
          <div className="grid-header-meta">
            <h2 className="grid-section-title">
              Open Business Roles <span className="count-pill">{filteredData.length} Positions</span>
            </h2>
            <p className="grid-section-sub">
              Apply for any business internship role below to begin your evaluation process.
            </p>
          </div>

          {filteredData.length > 0 ? (
            <div className="technical-cards-grid">
              {filteredData.map((internship, index) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  index={index}
                  onApplyClick={handleApplyClick}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <Search size={48} className="no-results-icon" />
              <h3>No internship role found</h3>
              <p>We couldn't find any position matching "{searchQuery}". Try another search term.</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedRoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedRoleModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedRoleModal(null)}>
                <X size={20} />
              </button>
              <div className="modal-header-badge">
                <Zap size={16} className="modal-badge-icon" />
                <span>{selectedRoleModal.tag} Internship</span>
              </div>
              <h3 className="modal-tool-name">{selectedRoleModal.title}</h3>
              <p className="modal-description">
                You are applying for the <strong>{selectedRoleModal.title}</strong> role (<strong>{selectedRoleModal.duration}</strong> | <strong>{selectedRoleModal.mode}</strong>). Complete the screening application below.
              </p>
              <div className="modal-features-list">
                <div className="modal-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>Real corporate team collaboration & weekly mentor reviews</span>
                </div>
                <div className="modal-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>Performance stipend + QorZen Verified Internship Certificate</span>
                </div>
                <div className="modal-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>Direct conversion pathway to Full-Time Business Associate</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-modal-primary" onClick={() => setSelectedRoleModal(null)}>
                  Submit Application for {selectedRoleModal.title}
                </button>
                <button className="btn-modal-secondary" onClick={() => setSelectedRoleModal(null)}>
                  Download Role Description PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NonTechnicalInternship;
