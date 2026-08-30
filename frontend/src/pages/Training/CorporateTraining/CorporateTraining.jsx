import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Search,
  Sparkles,
  X,
  Building,
  Users,
  TrendingUp,
  BarChart,
  Target,
  Briefcase,
  Layers
} from 'lucide-react';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { coursePricingData } from '../../../data/courses';
import './CorporateTraining.css';

// 9 Corporate Training Courses Dataset (Exact User Specification)
const rawCorporateTrainingModulesData = [
  {
    id: 'corp-it-department',
    title: 'IT Department & Corporate Technology Basics',
    tag: 'IT Department',
    categoryGroup: 'it',
    department: 'IT',
    icon: Building,
    description: 'Master enterprise IT infrastructure, cloud fundamentals, corporate cybersecurity hygiene, and tech support.',
    tools: ['Active Directory', 'AWS Cloud', 'Windows Server', 'HelpDesk', 'Network Basics'],
    duration: '1 Month'
  },
  {
    id: 'corp-hr-management',
    title: 'Human Resource Management in Corporate',
    tag: 'HR Department',
    categoryGroup: 'hr',
    department: 'HR',
    icon: Users,
    description: 'Corporate HR management, employee onboarding, labor law compliance, performance reviews, and retention.',
    tools: ['Workday', 'Keka HR', 'LinkedIn Recruiter', 'Excel', 'HR Policies'],
    duration: '1 Month'
  },
  {
    id: 'corp-sales-bizdev',
    title: 'Corporate Sales & Business Development',
    tag: 'Sales Department',
    categoryGroup: 'sales',
    department: 'Sales',
    icon: TrendingUp,
    description: 'Corporate B2B lead generation, consultative sales pitching, pipeline CRM tracking, and deal negotiation.',
    tools: ['Salesforce', 'HubSpot CRM', 'LinkedIn Sales Nav', 'Cold Pitching', 'B2B Sales'],
    duration: '1 Month'
  },
  {
    id: 'corp-digital-marketing',
    title: 'Digital Marketing & Corporate Marketing',
    tag: 'Marketing Dept',
    categoryGroup: 'marketing',
    department: 'Marketing',
    icon: Target,
    description: 'Corporate brand positioning, Meta & Google Ads campaigns, SEO optimization, and corporate PR.',
    tools: ['Google Ads', 'Meta Ads Manager', 'GA4', 'SEO', 'Email Campaigns'],
    duration: '1 Month'
  },
  {
    id: 'corp-finance-accounting',
    title: 'Corporate Finance & Accounting Basics',
    tag: 'Finance Dept',
    categoryGroup: 'finance',
    department: 'Finance',
    icon: BarChart,
    description: 'Master corporate financial accounting, balance sheet auditing, GST compliance, Tally, and budgeting.',
    tools: ['Tally Prime', 'QuickBooks', 'Excel Financials', 'GST Filing', 'Zoho Books'],
    duration: '1 Month'
  },
  {
    id: 'corp-business-operations',
    title: 'Business Operations & Process Management',
    tag: 'Operations Dept',
    categoryGroup: 'operations',
    department: 'Operations',
    icon: Layers,
    description: 'Optimize corporate business processes, supply chain workflows, SOP documentation, and operational efficiency.',
    tools: ['Asana', 'Process Mapping', 'SOPs', 'Notion', 'Jira'],
    duration: '1 Month'
  },
  {
    id: 'corp-project-management',
    title: 'Project Handling, Agile & Team Coordination',
    tag: 'PM Department',
    categoryGroup: 'management',
    department: 'Project Management',
    icon: Briefcase,
    description: 'Train corporate project teams in Agile Scrum, sprint planning, Jira management, and cross-team coordination.',
    tools: ['Jira', 'Confluence', 'Agile Scrum', 'Trello', 'MS Project'],
    duration: '1 Month'
  },
  {
    id: 'corp-administration',
    title: 'Corporate Administration & Office Management',
    tag: 'Admin Dept',
    categoryGroup: 'operations',
    department: 'Administration',
    icon: Building,
    description: 'Corporate front-office administration, vendor management, executive scheduling, and facility coordination.',
    tools: ['MS Office 365', 'Vendor Management', 'Facility Admin', 'Email Etiquette', 'Scheduling'],
    duration: '1 Month'
  },
  {
    id: 'corp-team-leadership',
    title: 'Leadership & Team Management Skills',
    tag: 'Leadership',
    categoryGroup: 'management',
    department: 'Team Lead',
    icon: GraduationCap,
    description: 'Develop team leader capabilities, conflict resolution, performance feedback, decision making, and motivation.',
    tools: ['Leadership Frameworks', '1-on-1 Coaching', 'Conflict Resolution', 'KPI Tracking', 'Team Building'],
    duration: '1 Month'
  }
];

export const corporateTrainingModulesData = rawCorporateTrainingModulesData.map((item) => {
  const match = coursePricingData.find(
    (c) => c.title.toLowerCase() === item.title.toLowerCase()
  );
  return {
    ...item,
    price: match ? match.price : null
  };
});

const categories = [
  { key: 'all', label: 'All 9 Departments' },
  { key: 'it', label: 'IT & Operations' },
  { key: 'hr', label: 'HR & Administration' },
  { key: 'sales', label: 'Sales & Marketing' },
  { key: 'finance', label: 'Finance' },
  { key: 'management', label: 'Project & Team Leadership' }
];

const CorporateTraining = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredData = useMemo(() => {
    return corporateTrainingModulesData.filter((item) => {
      let matchesCategory = activeCategory === 'all';
      if (activeCategory === 'it') {
        matchesCategory = item.department === 'IT' || item.department === 'Operations';
      } else if (activeCategory === 'hr') {
        matchesCategory = item.department === 'HR' || item.department === 'Administration';
      } else if (activeCategory === 'sales') {
        matchesCategory = item.department === 'Sales' || item.department === 'Marketing';
      } else if (activeCategory === 'finance') {
        matchesCategory = item.department === 'Finance';
      } else if (activeCategory === 'management') {
        matchesCategory = item.department === 'Project Management' || item.department === 'Team Lead';
      }

      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

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
            <Sparkles size={14} className="hero-badge-icon" />
            <span>QorZen Corporate & Enterprise Department Upskilling</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-main-title"
          >
            9 Enterprise <br />
            <span className="text-highlight-gradient">Department Training Programs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-subtitle-description"
          >
            Tailored corporate workforce training for IT, HR, Sales, Marketing, Finance, Operations, Administration, and Team Leaders.
          </motion.p>
        </div>
      </section>

      {/* Toolbar & Filter */}
      <section style={{ padding: '2rem 0', backgroundColor: '#f9f8f6' }}>
        <div className="container">
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                id="corpSearchInput"
                name="corpSearchInput"
                type="text"
                autoComplete="off"
                placeholder="Search department, corporate program, or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="technical-grid-section">
        <div className="container">
          {filteredData.length > 0 ? (
            <div className="cards-responsive-grid">
              {filteredData.map((item, idx) => (
                <CategoryCard
                  key={item.id}
                  category={item}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-state">
              <h3>No Corporate Modules Matched</h3>
              <p>Try clearing your search query or switching category tabs.</p>
              <button
                className="reset-search-btn"
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
    </div>
  );
};

export default CorporateTraining;
