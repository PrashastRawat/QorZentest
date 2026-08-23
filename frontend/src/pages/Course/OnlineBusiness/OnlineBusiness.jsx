import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Search,
  Sparkles,
  Check,
  X,
  Zap,
  Globe,
  ShoppingBag,
  Video,
  Megaphone,
  Mail,
  DollarSign
} from 'lucide-react';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import './OnlineBusiness.css';

// Online Business Modules Data Array
export const onlineBusinessModulesData = [
  {
    id: 'affiliate-marketing',
    title: 'Affiliate Marketing Mastery',
    tag: 'Monetization',
    categoryGroup: 'marketing',
    icon: Globe,
    price: '₹2,499',
    duration: '2 Months',
    description: 'Build passive income streams using high-commission affiliate networks, tracking, and content funnels.',
    tools: ['Amazon Associates', 'ClickBank', 'Impact Radius', 'CJ Affiliate', 'LinkTrust']
  },
  {
    id: 'reselling-dropshipping',
    title: 'Reselling & Dropshipping Mastery',
    tag: 'E-Commerce',
    categoryGroup: 'ecommerce',
    icon: ShoppingBag,
    price: '₹1,999',
    duration: '2 Months',
    description: 'Launch profitable dropshipping stores, product sourcing, meesho reselling, and zero-inventory scaling.',
    tools: ['Shopify', 'Meesho', 'DSers', 'AliExpress', 'WooCommerce']
  },
  {
    id: 'youtube-monetization',
    title: 'YouTube Mastery & Video Creator Blueprint',
    tag: 'Video Growth',
    categoryGroup: 'content',
    icon: Video,
    price: '₹2,999',
    duration: '3 Months',
    description: 'Create viral YouTube channels, video SEO, thumbnail design, and multi-channel ad revenue.',
    tools: ['YouTube Studio', 'VidIQ', 'TubeBuddy', 'Canva', 'CapCut']
  },
  {
    id: 'facebook-instagram-ads',
    title: 'Facebook & Instagram Paid Ads Scaling',
    tag: 'Paid Ads',
    categoryGroup: 'marketing',
    icon: Megaphone,
    price: '₹3,499',
    duration: '3 Months',
    description: 'Master Meta Ads Manager, CBO budgeting, custom audience pixel tracking, and high-ROAS ads.',
    tools: ['Meta Ads Manager', 'Meta Pixel', 'Canva Ads', 'AdEspresso', 'GA4']
  },
  {
    id: 'email-funnels-automation',
    title: 'Email Marketing & Sales Funnel Automation',
    tag: 'Funnels',
    categoryGroup: 'marketing',
    icon: Mail,
    price: '₹2,499',
    duration: '2 Months',
    description: 'Build automated email sequences, opt-in landing pages, and lead magnet conversion funnels.',
    tools: ['Mailchimp', 'Klaviyo', 'ClickFunnels', 'ActiveCampaign', 'ConvertKit']
  },
  {
    id: 'high-ticket-sales-closing',
    title: 'High-Ticket Sales & Remote Closing',
    tag: 'Sales Closing',
    categoryGroup: 'sales',
    icon: DollarSign,
    price: '₹2,999',
    duration: '3 Months',
    description: 'Master consultative high-ticket sales scripts, handling objections, and closing premium clients.',
    tools: ['Objection Handling', 'Cold Calling', 'Deal Structuring', 'LinkedIn Sales Nav', 'CRM Control']
  }
];

const categories = [
  { key: 'all', label: 'All Courses' },
  { key: 'marketing', label: 'Digital Marketing & Ads' },
  { key: 'ecommerce', label: 'E-Commerce & Dropshipping' },
  { key: 'content', label: 'YouTube & Content' },
  { key: 'sales', label: 'Sales & Closing' }
];

const OnlineBusiness = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedToolModal, setSelectedToolModal] = useState(null);

  const filteredData = useMemo(() => {
    return onlineBusinessModulesData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryGroup === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleToolClick = (toolName, categoryTitle, price = '₹10,000') => {
    setSelectedToolModal({ tool: toolName, category: categoryTitle, price });
  };

  return (
    <div className="technical-page">
      {/* Hero Section */}
      <section className="technical-hero">
        <div className="container">
          

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Build & Scale Profitable <span className="highlight-text">Online Business</span> Ventures
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Actionable, step-by-step training covering Affiliate Marketing, Dropshipping, YouTube Monetization, Facebook Lead Gen, Email Automation, and Sales Closing. Each course includes lifetime access & step-by-step blueprints.
          </motion.p>

          {/* Search & Filter Bar */}
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                id="onlineBizSearchInput"
                name="onlineBizSearchInput"
                type="text"
                autoComplete="off"
                placeholder="Search business courses (e.g. Affiliate, Dropshipping, YouTube, Facebook Ads)..."
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
              Online Business Programs <span className="count-pill">{filteredData.length} Courses</span>
            </h2>
            <p className="grid-section-sub">
              Click any course chip below to view curriculum & enrollment options.
            </p>
          </div>

          {filteredData.length > 0 ? (
            <div className="technical-cards-grid">
              {filteredData.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <Search size={48} className="no-results-icon" />
              <h3>No business course found</h3>
              <p>We couldn't find any course matching "{searchQuery}". Try searching for another topic.</p>
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
    </div>
  );
};

export default OnlineBusiness;
