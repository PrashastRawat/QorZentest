import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Search,
  Calendar,
  ArrowRight,
  X,
  Sparkles,
  User,
  Megaphone
} from 'lucide-react';
import './News.css';

// Mock News & Press Releases Array
export const newsArticlesData = [
  {
    id: 'news-ai-curriculum-launch',
    title: 'QorZen Technologies Launches Next-Gen AI Tools Mastery Program for 2026',
    category: 'Press Release',
    categoryGroup: 'company',
    date: 'Aug 12, 2026',
    readTime: '3 min read',
    author: 'QorZen Newsroom',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'QorZen Technologies officially rolls out its comprehensive 14-module AI Tools curriculum, empowering students & corporate clients with hands-on prompt engineering & agentic workflows.'
  },
  {
    id: 'news-enterprise-partnerships',
    title: 'QorZen Secures Corporate Partnerships for Guaranteed Student Internships',
    category: 'Partnerships',
    categoryGroup: 'partnerships',
    date: 'Aug 08, 2026',
    readTime: '4 min read',
    author: 'QorZen Newsroom',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'New strategic alliances with top FinTech, SaaS, and Cloud enterprises guarantee hands-on project internships for QorZen academy graduates.'
  },
  {
    id: 'news-cyber-cloud-labs',
    title: 'Expansion of Virtual Hardware Labs for Cyber Security & AWS Networking',
    category: 'Platform Update',
    categoryGroup: 'company',
    date: 'Jul 30, 2026',
    readTime: '3 min read',
    author: 'Tech Infra Team',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'Students now gain 24/7 cloud access to Cisco Packet Tracer, EVE-NG, Palo Alto firewall instances, and AWS VPC lab topologies.'
  },
  {
    id: 'news-annual-summit',
    title: 'Annual QorZen Innovation Summit 2026 Announced for Tech Leaders',
    category: 'Events',
    categoryGroup: 'events',
    date: 'Jul 20, 2026',
    readTime: '5 min read',
    author: 'Events Desk',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'Bringing together industry CTOs, AI researchers, and engineering leads to discuss the future of AI automation, cloud security, and developer upskilling.'
  }
];

const categories = [
  { key: 'all', label: 'All News' },
  { key: 'company', label: 'Press Releases' },
  { key: 'partnerships', label: 'Partnerships' },
  { key: 'events', label: 'Events' }
];

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedNewsModal, setSelectedNewsModal] = useState(null);

  const filteredNews = useMemo(() => {
    return newsArticlesData.filter((article) => {
      const matchesCategory = activeCategory === 'all' || article.categoryGroup === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="resource-blog-page">
      {/* News Hero Section */}
      <section className="resource-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Globe size={14} className="hero-badge-icon" />
            <span>QorZen Official Newsroom</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Company Updates & <span className="highlight-text">Tech Industry News</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Official announcements, strategic enterprise partnerships, product releases, and upcoming tech industry events from QorZen Technologies.
          </motion.p>

          {/* Search & Category Filter Bar */}
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search news & press releases..."
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

      {/* News Grid Section */}
      <section className="resource-grid-section">
        <div className="container">
          <div className="grid-header-meta">
            <h2 className="grid-section-title">
              Press & Announcements <span className="count-pill">{filteredNews.length} Reports</span>
            </h2>
            <p className="grid-section-sub">Stay updated with official platform announcements and corporate milestones.</p>
          </div>

          {filteredNews.length > 0 ? (
            <div className="articles-cards-grid">
              {filteredNews.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="article-card"
                >
                  {/* Article Thumbnail */}
                  <div className="article-image-wrap">
                    <img src={article.image} alt={article.title} loading="lazy" />
                    <span className="article-cat-tag">{article.category}</span>
                  </div>

                  {/* Article Body */}
                  <div className="article-card-body">
                    <div className="article-meta-row">
                      <div className="meta-item">
                        <Calendar size={13} className="meta-icon" />
                        <span>{article.date}</span>
                      </div>
                      <div className="meta-item">
                        <Megaphone size={13} className="meta-icon" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="article-card-title">{article.title}</h3>
                    <p className="article-card-excerpt">{article.excerpt}</p>

                    <div className="article-author-row">
                      <div className="author-info">
                        <User size={14} className="author-icon" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="article-card-footer">
                    <button
                      className="article-read-btn"
                      onClick={() => setSelectedNewsModal(article)}
                    >
                      <span>Read Release</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <Search size={48} className="no-results-icon" />
              <h3>No announcements found</h3>
              <p>We couldn't find any press release matching "{searchQuery}". Try another search term.</p>
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

      {/* News Reader Modal */}
      <AnimatePresence>
        {selectedNewsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedNewsModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content article-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedNewsModal(null)}>
                <X size={20} />
              </button>

              <div className="modal-header-badge">
                <Sparkles size={14} className="modal-badge-icon" />
                <span>{selectedNewsModal.category}</span>
              </div>

              <h2 className="modal-article-title">{selectedNewsModal.title}</h2>

              <div className="modal-meta-bar">
                <span>By {selectedNewsModal.author}</span>
                <span>•</span>
                <span>{selectedNewsModal.date}</span>
              </div>

              <div className="modal-article-hero-img">
                <img src={selectedNewsModal.image} alt={selectedNewsModal.title} />
              </div>

              <div className="modal-article-text">
                <p><strong>Press Statement:</strong> {selectedNewsModal.excerpt}</p>
                <p>
                  For media inquiries, press interviews, or corporate partnership details, contact our communications desk at <code>press@qorzentech.com</code>.
                </p>
              </div>

              <div className="modal-actions">
                <button className="btn-modal-primary" onClick={() => setSelectedNewsModal(null)}>
                  Close Announcement
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default News;
