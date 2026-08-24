import React, { useState, useMemo } from 'react';
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
import './Blog.css';

// Mock Sample Tech Insights Articles Array
export const blogArticlesData = [
  {
    id: 'blog-ai-agents-2026',
    title: 'The Rise of Agentic AI: How Multi-Agent Systems Are Replacing Manual Workflows',
    category: 'AI & Future',
    categoryGroup: 'ai',
    date: 'Aug 14, 2026',
    readTime: '5 min read',
    author: 'Dr. Evelyn Vance',
    image: '/assets/blog/agentic-ai.jpg',
    excerpt: 'Explore how modern n8n workflows, LangChain RAG pipelines, and autonomous AI agents are revolutionizing software development velocity and enterprise automation.'
  },
  {
    id: 'blog-nextjs15-react19',
    title: 'Mastering React 19 & Next.js 15: Server Actions, Compiler & Performance',
    category: 'Web Engineering',
    categoryGroup: 'engineering',
    date: 'Aug 10, 2026',
    readTime: '7 min read',
    author: 'Alex Mercer',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'A deep dive into React 19’s automatic memoization, compiler optimizations, server components, and building ultra-fast web applications with 100 Lighthouse scores.'
  },
  {
    id: 'blog-cloud-zero-trust',
    title: 'Architecting Zero-Trust Cloud Security in AWS & Kubernetes Systems',
    category: 'Cloud & Security',
    categoryGroup: 'cloud',
    date: 'Aug 05, 2026',
    readTime: '6 min read',
    author: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'How enterprise DevOps teams enforce IAM least privilege, container network policies, and automated vulnerability scanning across multi-region Kubernetes clusters.'
  },
  {
    id: 'blog-b2b-performance-marketing',
    title: 'Data-Driven Performance Marketing: Scaling SaaS ROAS Beyond 5x',
    category: 'Digital Growth',
    categoryGroup: 'growth',
    date: 'Jul 28, 2026',
    readTime: '4 min read',
    author: 'David Chen',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'Discover actionable strategies for Meta Pixel tracking, Google Search intent bidding, and conversion rate optimization (CRO) that consistently scale high-ticket B2B funnels.'
  }
];

const categories = [
  { key: 'all', label: 'All Articles' },
  { key: 'ai', label: 'AI & Automation' },
  { key: 'engineering', label: 'Web & Tech' },
  { key: 'cloud', label: 'Cloud & Security' },
  { key: 'growth', label: 'Digital Growth' }
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);

  const filteredArticles = useMemo(() => {
    return blogArticlesData.filter((article) => {
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
              {filteredArticles.map((article, index) => (
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

                  {/* Article Meta Bar */}
                  <div className="article-card-body">
                    <div className="article-meta-row">
                      <div className="meta-item">
                        <Calendar size={13} className="meta-icon" />
                        <span>{article.date}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={13} className="meta-icon" />
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
              ))}
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
                <span>By {selectedArticleModal.author}</span>
                <span>•</span>
                <span>{selectedArticleModal.date}</span>
                <span>•</span>
                <span>{selectedArticleModal.readTime}</span>
              </div>

              <div className="modal-article-hero-img">
                <img src={selectedArticleModal.image} alt={selectedArticleModal.title} />
              </div>

              <div className="modal-article-text">
                <p><strong>Abstract:</strong> {selectedArticleModal.excerpt}</p>
                <p>
                  At QorZen Technologies, we continuously evaluate production software patterns, AI multi-agent orchestration, and serverless cloud architectures to deliver state-of-the-art results for learners and corporate clients.
                </p>
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
