import React from 'react';
import { Sparkles } from 'lucide-react';
import './Loader.css';

/**
 * Reusable Loader Component
 * Displays a smooth spinning brand-colored gradient ring and logo text.
 * Strictly adheres to QorZen theme variables from index.css.
 *
 * @param {Object} props
 * @param {string} props.message - Optional loading text message (default: 'Loading QorZen Portal...')
 * @param {boolean} props.fullPage - If true, fills the entire viewport (default: false)
 */
const Loader = ({ message = 'Loading QorZen Portal...', fullPage = false }) => {
  return (
    <div className={`loader-container ${fullPage ? 'full-page' : ''}`}>
      <div className="loader-spinner-wrapper">
        <div className="gradient-spinner-ring"></div>
        <div className="loader-center-badge">
          <Sparkles size={20} className="loader-sparkle" />
        </div>
      </div>
      {message && <p className="loader-text">{message}</p>}
    </div>
  );
};

export default Loader;
