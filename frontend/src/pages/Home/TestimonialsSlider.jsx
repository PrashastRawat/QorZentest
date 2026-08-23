import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from 'lucide-react';
import { clientTestimonials } from '../../data/homeData';
import './TestimonialsSlider.css';


const TestimonialsSlider = () => {
  const [pairIndex, setPairIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Group testimonials into pairs of 2
  const itemsPerPage = 2;
  const totalPairs = Math.ceil(clientTestimonials.length / itemsPerPage);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setPairIndex((prev) => (prev + 1) % totalPairs);
    }, 4800);

    return () => clearInterval(interval);
  }, [isPaused, totalPairs]);

  const handleNext = () => {
    setPairIndex((prev) => (prev + 1) % totalPairs);
  };

  const handlePrev = () => {
    setPairIndex((prev) => (prev - 1 + totalPairs) % totalPairs);
  };

  // Extract current 2 testimonials
  const startIndex = pairIndex * itemsPerPage;
  const currentPair = clientTestimonials.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="testimonials-slider" className="testimonials-section">
      <div className="container">
        {/* Global Center-Aligned Section Header */}
        <div className="global-section-header">
          <div className="header-badge-pill">
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>Strictly Confidential B2B Reviews</span>
          </div>
          <h2 className="section-title">What Our Enterprise Partners Say</h2>
          <p className="section-desc">
            Client identity protected under Non-Disclosure Agreements (NDA). Real feedback from verified executive leadership.
          </p>
        </div>

        {/* Carousel Showcase Box with Edge-Aligned Navigation */}
        <div
          className="testimonials-showcase-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge-Aligned Left Navigation Arrow */}
          <button
            type="button"
            className="testimonial-edge-nav prev-edge-btn"
            onClick={handlePrev}
            aria-label="Previous Testimonial Pair"
            title="Previous Reviews"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Edge-Aligned Right Navigation Arrow */}
          <button
            type="button"
            className="testimonial-edge-nav next-edge-btn"
            onClick={handleNext}
            aria-label="Next Testimonial Pair"
            title="Next Reviews"
          >
            <ChevronRight size={22} />
          </button>

          {/* Smooth 2-Card Horizontal Slide Transition */}
          <div className="testimonials-slider-viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={pairIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.42, ease: [0.25, 1, 0.5, 1] }}
                className="testimonials-two-card-grid"
              >
                {currentPair.map((item, idx) => (
                  <div key={item.name + idx} className="testimonial-single-card">
                    <div className="card-top-header">
                      <div className="quote-badge">
                        <Quote size={20} className="quote-icon" />
                      </div>
                      <div className="star-rating-row">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} className="star-icon" fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <p className="testimonial-quote-text">"{item.text}"</p>

                    <div className="testimonial-author-meta">
                      <h4 className="author-name">{item.name}</h4>
                      <span className="author-verified-tag">{item.company}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Pagination Dots */}
          <div className="testimonial-pagination-dots">
            {[...Array(totalPairs)].map((_, index) => (
              <button
                key={index}
                type="button"
                className={`pagination-dot ${pairIndex === index ? 'active' : ''}`}
                onClick={() => setPairIndex(index)}
                aria-label={`Go to testimonial slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
