import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Calendar,
  ArrowRight,
  X,
  Sparkles,
  User,
  Clock
} from 'lucide-react';
import { getBlogs } from '../../../api/adminApi';
import './Blog.css';

const formatDate = (isoString) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Rough estimate since the model doesn't store a readTime field:
// ~200 words per minute, minimum 1 minute.
const estimateReadTime = (content) => {
  if (!content) return '1 min read';
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
        const data = res.data?.data || res.data || [];
        if (isMounted) setArticles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('[Blog] Failed to load blog posts:', err);
        if (isMounted) setError('Unable to load articles right now. Please try again later.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBlogs();
    return () => { isMounted = false; };
  }, []);

  // Categories are derived from whatever's actually in the DB, since the
  // old fixed 4-category list doesn't match real category values admins type in.
  const categories = useMemo(() => {
    const unique = [...new Set(articles.map((a) => a.category).filter(Boolean))];
    return [{ key: 'all', label: 'All Articles' }, ...unique.map((c) => ({ key: c, label: c }))];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
      const matchesSearch =
        (article.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, searchQuery, activeCategory]);
  
  return (
    <div className="resource-blog-page">
      {/* Blog Hero Section */}
      <section className="resource-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <BookOpen size={14} className="hero-badge-icon" />
            <span>QorZen Engineering & Tech Blog</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Latest Tech Insights, <span className="highlight-text">Tutorials & Articles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Stay ahead with authoritative engineering breakdowns, AI tool guides, cloud security architecture, and performance growth strategies written by QorZen experts.
          </motion.p>

          {/* Search & Category Filter Bar */}
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search articles (e.g. Agentic AI, React 19, Cloud Security, Performance Marketing)..."
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

      {/* Article Grid Section */}
      <section className="resource-grid-section">
        <div className="container">
          <div className="grid-header-meta">
            <h2 className="grid-section-title">
              Published Insights <span className="count-pill">{filteredArticles.length} Articles</span>
            </h2>
            <p className="grid-section-sub">Explore deep-dive technical articles written for engineers & leaders.</p>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="articles-cards-grid">
              {filteredArticles.map((article, index) => {
                const thumbnail = article.images?.[0]?.url;
                const excerpt = article.content
                  ? article.content.slice(0, 140).trim() + (article.content.length > 140 ? '...' : '')
                  : '';
                const authorName = article.author?.name || 'QorZen Team';

                return (
                  <motion.article
                    key={article._id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="article-card"
                  >
                    {/* Article Thumbnail */}
                    <div className="article-image-wrap">
                      {thumbnail && <img src={thumbnail} alt={article.title} loading="lazy" />}
                      <span className="article-cat-tag">{article.category}</span>
                    </div>

                    {/* Article Meta Bar */}
                    <div className="article-card-body">
                      <div className="article-meta-row">
                        <div className="meta-item">
                          <Calendar size={13} className="meta-icon" />
                          <span>{formatDate(article.createdAt)}</span>
                        </div>
                        <div className="meta-item">
                          <Clock size={13} className="meta-icon" />
                          <span>{estimateReadTime(article.content)}</span>
                        </div>
                      </div>

                      <h3 className="article-card-title">{article.title}</h3>
                      <p className="article-card-excerpt">{excerpt}</p>

                      <div className="article-author-row">
                        <div className="author-info">
                          <User size={14} className="author-icon" />
                          <span>{authorName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Article Card Footer CTA */}
                    <div className="article-card-footer">
                      <button
                        className="article-read-btn"
                        onClick={() => setSelectedArticleModal(article)}
                      >
                        <span>Read Article</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="no-results-box">
              <Search size={48} className="no-results-icon" />
              <h3>No articles found</h3>
              <p>We couldn't find any article matching "{searchQuery}". Try another keyword.</p>
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

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedArticleModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content article-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedArticleModal(null)}>
                <X size={20} />
              </button>

              <div className="modal-header-badge">
                <Sparkles size={14} className="modal-badge-icon" />
                <span>{selectedArticleModal.category}</span>
              </div>

              <h2 className="modal-article-title">{selectedArticleModal.title}</h2>

              <div className="modal-meta-bar">
                <span>By {selectedArticleModal.author?.name || 'QorZen Team'}</span>
                <span>•</span>
                <span>{formatDate(selectedArticleModal.createdAt)}</span>
                <span>•</span>
                <span>{estimateReadTime(selectedArticleModal.content)}</span>
              </div>

              {selectedArticleModal.images?.[0]?.url && (
                <div className="modal-article-hero-img">
                  <img src={selectedArticleModal.images[0].url} alt={selectedArticleModal.title} />
                </div>
              )}

              <div className="modal-article-text">
                <p>{selectedArticleModal.content}</p>
              </div>

              <div className="modal-actions">
                <button className="btn-modal-primary" onClick={() => setSelectedArticleModal(null)}>
                  Close Reader
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;