import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  Sparkles,
  X,
  Globe,
  BarChart,
  Megaphone,
  Users,
  Target,
  FileText,
  DollarSign
} from 'lucide-react';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { coursePricingData } from '../../../data/courses';
import './NonTechnical.css';

// 15 Non-Technical Courses Dataset (Exact Specification)
const rawNonTechnicalModulesData = [
  {
    id: 'nontech-project-management',
    title: 'Project Management',
    tag: 'Management',
    categoryGroup: 'management',
    icon: Briefcase,
    description: 'Master PMP & Scrum frameworks, agile sprint scheduling, risk management, and team leadership.',
    tools: ['Jira', 'Asana', 'Trello', 'MS Project', 'Slack'],
    duration: '3 Months'
  },
  {
    id: 'nontech-sales-executive',
    title: 'Sales Executive',
    tag: 'Sales',
    categoryGroup: 'marketing',
    icon: DollarSign,
    description: 'Learn high-converting sales pitching, objection handling, lead qualification, and deal closing.',
    tools: ['Salesforce', 'HubSpot CRM', 'Cold Calling', 'Pitching', 'CRM Tracking'],
    duration: '3 Months'
  },
  {
    id: 'nontech-social-media-handling',
    title: 'Social Media Handling',
    tag: 'Social Media',
    categoryGroup: 'marketing',
    icon: Megaphone,
    description: 'Manage daily social media accounts, audience inbox replies, community engagement, and post scheduling.',
    tools: ['Buffer', 'Hootsuite', 'Meta Business Suite', 'Canva', 'Later'],
    duration: '1 Month'
  },
  {
    id: 'nontech-social-media-management',
    title: 'Social Media Management',
    tag: 'Social Growth',
    categoryGroup: 'marketing',
    icon: Megaphone,
    description: 'Develop monthly brand content calendars, organic growth strategies, and social media analytics.',
    tools: ['Meta Suite', 'Sprout Social', 'Canva Pro', 'CapCut', 'Analytics'],
    duration: '3 Months'
  },
  {
    id: 'nontech-social-media-marketing',
    title: 'Social Media Marketing',
    tag: 'Social Ads',
    categoryGroup: 'marketing',
    icon: Megaphone,
    description: 'Run high-ROI paid ad campaigns on Instagram, Facebook, LinkedIn, and YouTube for lead generation.',
    tools: ['Meta Ads Manager', 'LinkedIn Ads', 'YouTube Ads', 'Pixel Tracking', 'GA4'],
    duration: '3 Months'
  },
  {
    id: 'nontech-accounting',
    title: 'Accounting',
    tag: 'Finance & Tax',
    categoryGroup: 'analytics',
    icon: BarChart,
    description: 'Master corporate financial accounting, GST filing, balance sheets, Tally Prime, and payroll.',
    tools: ['Tally Prime', 'QuickBooks', 'Excel', 'GST Filing', 'Zoho Books'],
    duration: '3 Months'
  },
  {
    id: 'nontech-content-creation',
    title: 'Content Creation',
    tag: 'Creative Media',
    categoryGroup: 'marketing',
    icon: FileText,
    description: 'Create viral short-form video reels, brand storytelling, graphics, and multi-channel content.',
    tools: ['Canva Pro', 'CapCut', 'ChatGPT', 'Instagram Reels', 'YouTube Shorts'],
    duration: '3 Months'
  },
  {
    id: 'nontech-bde',
    title: 'BDE (Business Development Executive)',
    tag: 'BizDev',
    categoryGroup: 'marketing',
    icon: Target,
    description: 'Master B2B corporate outreach, client acquisition, proposal writing, and revenue expansion.',
    tools: ['LinkedIn Sales Nav', 'Apollo.io', 'Email Outreach', 'Cold Pitching', 'CRM'],
    duration: '3 Months'
  },
  {
    id: 'nontech-hr',
    title: 'HR',
    tag: 'Human Resources',
    categoryGroup: 'management',
    icon: Users,
    description: 'Master corporate HR operations, talent acquisition, employee onboarding, labor laws, and payroll.',
    tools: ['Workday', 'BambooHR', 'LinkedIn Recruiter', 'Keka', 'Excel'],
    duration: '3 Months'
  },
  {
    id: 'nontech-content-writing',
    title: 'Content Writing',
    tag: 'Copywriting',
    categoryGroup: 'marketing',
    icon: FileText,
    description: 'Write high-converting website copy, SEO blog articles, email sales sequences, and ad scripts.',
    tools: ['Grammarly', 'ChatGPT', 'WordPress', 'SEO Copywriting', 'Hemingway'],
    duration: '3 Months'
  },
  {
    id: 'nontech-email-marketing',
    title: 'Email Marketing',
    tag: 'Email Funnels',
    categoryGroup: 'marketing',
    icon: Megaphone,
    description: 'Build automated email sequences, newsletter campaigns, lead magnet funnels, and high open-rate copy.',
    tools: ['Mailchimp', 'Klaviyo', 'ActiveCampaign', 'Sendinblue', 'Copywriting'],
    duration: '1 Month'
  },
  {
    id: 'nontech-tele-calling',
    title: 'Tele Calling',
    tag: 'Customer Outreach',
    categoryGroup: 'marketing',
    icon: Users,
    description: 'Develop professional phone etiquette, outbound telesales techniques, and customer lead follow-ups.',
    tools: ['Phone Etiquette', 'CRM Logging', 'Objection Handling', 'Lead Follow-up'],
    duration: '1 Month'
  },
  {
    id: 'nontech-support-calling',
    title: 'Support Calling',
    tag: 'Customer Service',
    categoryGroup: 'management',
    icon: Users,
    description: 'Master customer service support, ticket resolution, query handling, and client retention.',
    tools: ['Zendesk', 'Freshdesk', 'Customer Support', 'Ticket Routing', 'VoIP'],
    duration: '1 Month'
  },
  {
    id: 'nontech-meta-google-ads',
    title: 'Meta & Google Ads',
    tag: 'Performance Ads',
    categoryGroup: 'marketing',
    icon: Target,
    description: 'Run high-converting paid search ads on Google and retargeting campaigns on Meta Ads Manager.',
    tools: ['Google Ads', 'Meta Ads Manager', 'Keyword Planner', 'GA4', 'GTM'],
    duration: '3 Months'
  },
  {
    id: 'nontech-bda',
    title: 'BDA (Business Development Associate)',
    tag: 'Sales & Growth',
    categoryGroup: 'marketing',
    icon: Target,
    description: 'Learn consultative sales, client relationship management, revenue growth, and deal closing.',
    tools: ['HubSpot CRM', 'Cold Calling', 'Sales Nav', 'Email Pitching', 'Negotiation'],
    duration: '3 Months'
  }
];

export const nonTechnicalModulesData = rawNonTechnicalModulesData.map((item) => {
  const match = coursePricingData.find(
    (c) => c.title.toLowerCase() === item.title.toLowerCase()
  );
  return {
    ...item,
    price: match ? match.price : null
  };
});

const categories = [
  { key: 'all', label: 'All 15 Programs' },
  { key: 'marketing', label: 'Marketing & Sales' },
  { key: 'management', label: 'Management & HR' },
  { key: 'analytics', label: 'Finance & Accounting' }
];

const NonTechnical = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredData = useMemo(() => {
    return nonTechnicalModulesData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryGroup === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <span>QorZen Non-Technical & Business Training Registry</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-main-title"
          >
            15 Specialized <span className="text-highlight-gradient">Business & Growth Programs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-subtitle-description"
          >
            Master Project Management, Sales Pitching, Digital Marketing, HR Operations, and Corporate Accounting with real-world case studies.
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
                id="nonTechSearchInput"
                name="nonTechSearchInput"
                type="text"
                autoComplete="off"
                placeholder="Search business skills, marketing tools, or management modules..."
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
              <h3>No Business Modules Matched</h3>
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

export default NonTechnical;
