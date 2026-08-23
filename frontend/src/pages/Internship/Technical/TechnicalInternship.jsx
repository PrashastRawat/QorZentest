import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Search,
  Sparkles,
  Check,
  X,
  Zap,
  Globe,
  Database,
  ShieldCheck,
  Cpu,
  Smartphone,
  Workflow,
  Server,
  Cloud
} from 'lucide-react';
import InternshipCard from '../../../components/InternshipCard/InternshipCard';
import './TechnicalInternship.css';

// Technical Internship Roles Data Array
export const technicalInternshipData = [
  {
    id: 'mern-stack-intern',
    title: 'MERN Stack Developer Intern',
    tag: 'Web Engineering',
    categoryGroup: 'development',
    icon: Globe,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Build production-level React web applications, Node.js REST APIs, and MongoDB schemas alongside senior engineers.',
    tools: ['React.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Git']
  },
  {
    id: 'data-science-intern',
    title: 'Data Science & ML Engineer Intern',
    tag: 'AI & Data Science',
    categoryGroup: 'data',
    icon: Database,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Clean real-world corporate datasets, build predictive machine learning models, and deploy automated Power BI reports.',
    tools: ['Python', 'Pandas', 'Scikit-Learn', 'Power BI', 'SQL']
  },
  {
    id: 'cyber-security-intern',
    title: 'Cyber Security Analyst Intern',
    tag: 'Security',
    categoryGroup: 'security',
    icon: ShieldCheck,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Perform web application penetration testing, vulnerability scanning, security log analysis, and SOC monitoring.',
    tools: ['Kali Linux', 'Burp Suite', 'Wireshark', 'Nmap', 'Metasploit']
  },
  {
    id: 'mobile-dev-intern',
    title: 'Mobile App Developer Intern',
    tag: 'Mobile Engineering',
    categoryGroup: 'development',
    icon: Smartphone,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Develop cross-platform mobile apps for iOS and Android using Flutter or React Native with Firebase backends.',
    tools: ['Flutter', 'React Native', 'Dart', 'Firebase', 'REST APIs']
  },
  {
    id: 'devops-cloud-intern',
    title: 'Cloud & DevOps Engineer Intern',
    tag: 'Infrastructure',
    categoryGroup: 'cloud',
    icon: Cloud,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Manage AWS cloud instances, write Dockerfiles, configure GitHub Actions CI/CD, and assist in serverless setups.',
    tools: ['AWS Cloud', 'Docker', 'Kubernetes', 'Linux', 'GitHub Actions']
  },
  {
    id: 'ai-llm-intern',
    title: 'AI & LLM Application Intern',
    tag: 'Next-Gen AI',
    categoryGroup: 'data',
    icon: Cpu,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Construct agentic AI workflows, LangChain RAG pipelines, fine-tune LLM prompts, and integrate OpenAI APIs.',
    tools: ['LangChain', 'Python', 'OpenAI API', 'Pinecone', 'n8n']
  },
  {
    id: 'qa-automation-intern',
    title: 'QA & Automation Testing Intern',
    tag: 'Quality Assurance',
    categoryGroup: 'development',
    icon: Workflow,
    duration: '1, 3, 6 Months',
    mode: 'Online',
    stipend: 'Stipend + Certificate',
    description: 'Write automated end-to-end test suites using Cypress and Selenium for web and API regression testing.',
    tools: ['Cypress', 'Selenium', 'Postman', 'JavaScript', 'Jest']
  }
];

const categories = [
  { key: 'all', label: 'All Positions' },
  { key: 'development', label: 'Software & Mobile' },
  { key: 'data', label: 'AI & Data Science' },
  { key: 'cloud', label: 'DevOps & Cloud' },
  { key: 'security', label: 'Cyber Security' }
];

const TechnicalInternship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRoleModal, setSelectedRoleModal] = useState(null);

  const filteredData = useMemo(() => {
    return technicalInternshipData.filter((item) => {
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
            <Code size={14} className="hero-badge-icon" />
            <span>QorZen Technical Internship Portal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Guaranteed Practical <span className="highlight-text">Technical Internships</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Gain live production experience in Software Engineering, Data Science, DevOps, Mobile Apps, and Cyber Security. Work on real client codebases alongside senior architects.
          </motion.p>

          {/* Search & Filter Bar */}
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search technical internships (e.g. MERN Stack, Data Science, Cyber Security)..."
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
              Open Technical Roles <span className="count-pill">{filteredData.length} Positions</span>
            </h2>
            <p className="grid-section-sub">
              Apply for any technical internship role below to begin your evaluation process.
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
              <p>We couldn't find any position matching "{searchQuery}". Try searching for another skill.</p>
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
                  <span>Real-world client project assignments & code reviews</span>
                </div>
                <div className="modal-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>Performance stipend + QorZen Verified Internship Certificate</span>
                </div>
                <div className="modal-feature-item">
                  <Check size={16} className="feature-check" />
                  <span>Direct conversion pathway to Full-Time Engineer</span>
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

export default TechnicalInternship;
