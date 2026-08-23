import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2 } from 'lucide-react';
import './FloatingContact.css';


const WhatsAppIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.473-8.413" />
  </svg>
);

/**
 * FloatingContact Component
 * Fixed vertical stack of circular WhatsApp and Phone contact buttons.
 * Rendered globally across all pages via Layout wrapper.
 */
const FloatingContact = () => {
  const [copied, setCopied] = useState(false);

  const handlePhoneClick = (e) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('+919917529504').catch(() => {});
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 3500);

    window.open('tel:+919917529504', '_self');
  };

  return (
    <div className="floating-contact-stack" aria-live="polite">
      {/* Visual Feedback Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="phone-copied-toast"
          >
            <CheckCircle2 size={15} className="toast-check-icon" />
            <span>Dialing / Copied: +91 99175 29504</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone Button (Top) */}
      <a
        href="tel:+919917529504"
        onClick={handlePhoneClick}
        className="floating-btn phone-btn"
        aria-label="Call QorZen Support"
        title="Call +91 99175 29504"
      >
        <Phone size={22} />
      </a>

      {/* WhatsApp Button (Bottom) */}
      <a
        href="https://wa.me/919917529504"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp (+91 99175 29504)"
      >
        <WhatsAppIcon size={26} />
      </a>
    </div>
  );
};

export default FloatingContact;
