import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Search,
  MapPin,
  ArrowRight,
  X,
  Sparkles,
  User,
  Clock,
  Tag
} from 'lucide-react';
import './Events.css';

// Mock Events Array
export const eventsData = [
  {
    id: 'event-agentic-ai-workshop',
    title: 'Agentic AI & Prompt Engineering Masterclass',
    category: 'Workshop',
    categoryGroup: 'workshop',
    date: 'Oct 15, 2026',
    time: '2:00 PM - 5:00 PM IST',
    location: 'QorZen Campus / Hybrid',
    speaker: 'AI Engineering Lab',
    image: '/assets/blog/agentic-ai.jpg',
    excerpt: 'Deep dive into building autonomous AI agents, multi-agent frameworks, and advanced prompting techniques for developer productivity.'
  },
  {
    id: 'event-cloud-security-webinar',
    title: 'AWS Security & Cloud Infrastructure Essentials',
    category: 'Webinar',
    categoryGroup: 'webinar',
    date: 'Oct 22, 2026',
    time: '4:00 PM - 6:00 PM IST',
    location: 'Online via Zoom',
    speaker: 'Cloud & DevOps Team',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'Learn the principles of securing modern public cloud deployments, VPC network configuration, and IAM role management.'
  },
  {
    id: 'event-dev-networking-summit',
    title: 'QorZen Developers & Alumni Meetup 2026',
    category: 'Meetup',
    categoryGroup: 'meetup',
    date: 'Nov 05, 2026',
    time: '11:00 AM - 4:00 PM IST',
    location: 'Bangalore Innovation Hub',
    speaker: 'Alumni Network',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
    excerpt: 'An offline networking event for QorZen academy alumni, professional software engineers, and IT leaders to share career insights.'
  }
];

const categories = [
  { key: 'all', label: 'All Events' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'webinar', label: 'Webinars' },
  { key: 'meetup', label: 'Meetups' }
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory = activeCategory === 'all' || event.categoryGroup === activeCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="resource-events-page">
      {/* Events Hero Section */}
      <section className="resource-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Calendar size={14} className="hero-badge-icon" />
            <span>QorZen Events & Webinars</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Upcomming Workshops & <span className="highlight-text">Tech Summits</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Join our expert-led sessions, interactive technical bootcamps, free webinars, and industry networking meetups to stay ahead of the curve.
          </motion.p>

          {/* Search & Category Filter Bar */}
          <div className="search-filter-wrapper">
            <div className="search-input-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search events, workshops or locations..."
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

      {/* Events Grid Section */}
      <section className="resource-grid-section">
        <div className="container">
          <div className="grid-header-meta">
            <h2 className="grid-section-title">
              Featured Events <span className="count-pill">{filteredEvents.length} Sessions</span>
            </h2>
            <p className="grid-section-sub">Book your slots for our upcoming events and expert-led training sessions.</p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="articles-cards-grid">
              {filteredEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="article-card"
                >
                  {/* Event Thumbnail */}
                  <div className="article-image-wrap">
                    <img src={event.image} alt={event.title} loading="lazy" />
                    <span className="article-cat-tag">{event.category}</span>
                  </div>

                  {/* Event Body */}
                  <div className="article-card-body">
                    <div className="article-meta-row">
                      <div className="meta-item">
                        <Calendar size={13} className="meta-icon" />
                        <span>{event.date}</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={13} className="meta-icon" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <h3 className="article-card-title">{event.title}</h3>
                    <p className="article-card-excerpt">{event.excerpt}</p>

                    <div className="article-author-row">
                      <div className="author-info">
                        <User size={14} className="author-icon" />
                        <span>Speaker: {event.speaker}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="article-card-footer">
                    <button
                      className="article-read-btn"
                      onClick={() => setSelectedEventModal(event)}
                    >
                      <span>Register Now</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <Search size={48} className="no-results-icon" />
              <h3>No events found</h3>
              <p>We couldn't find any events matching "{searchQuery}". Try another search term.</p>
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

      {/* Event Details / Registration Modal */}
      <AnimatePresence>
        {selectedEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedEventModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content article-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedEventModal(null)}>
                <X size={20} />
              </button>

              <div className="modal-header-badge">
                <Sparkles size={14} className="modal-badge-icon" />
                <span>{selectedEventModal.category} Registration</span>
              </div>

              <h2 className="modal-article-title">{selectedEventModal.title}</h2>

              <div className="modal-meta-bar" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={14} style={{ color: 'var(--deep-accent)' }} />
                  <span><strong>Date:</strong> {selectedEventModal.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={14} style={{ color: 'var(--deep-accent)' }} />
                  <span><strong>Time:</strong> {selectedEventModal.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={14} style={{ color: 'var(--deep-accent)' }} />
                  <span><strong>Venue:</strong> {selectedEventModal.location}</span>
                </div>
              </div>

              <div className="modal-article-hero-img">
                <img src={selectedEventModal.image} alt={selectedEventModal.title} />
              </div>

              <div className="modal-article-text">
                <p><strong>Overview:</strong> {selectedEventModal.excerpt}</p>
                <p>
                  This session is led by the expert <strong>{selectedEventModal.speaker}</strong>. Register below to secure your seat and receive the dynamic access links, pre-read materials, and setup instructions.
                </p>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-modal-primary" 
                  onClick={() => {
                    alert('Thank you for registering! The calendar invite and link have been sent to your email.');
                    setSelectedEventModal(null);
                  }}
                >
                  Confirm Free Registration
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
