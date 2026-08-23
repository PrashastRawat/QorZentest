import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle2,
  Tag,
  Clock,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import '../EnrollmentModal/EnrollmentModal.css';

/**
 * EnrollmentModal Component (src/components/forms/EnrollmentModal.jsx)
 * Provides student enrollment UI with mandatory Batch Selection (Weekdays vs Weekends),
 * Name, Email, and Phone inputs with mobile-first responsive constraints.
 */
const EnrollmentModal = () => {
  const { isOpen, closeModal, selectedProgram } = useEnquiryModal();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    batchTiming: 'Weekdays (Mon, Tue, Wed, Thur)', // Default to Option A
    specialNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const refCode = `QOR-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedData({
        refCode,
        ...formData,
        program: selectedProgram
      });
    }, 800);
  };

  const handleClose = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      batchTiming: 'Weekdays (Mon, Tue, Wed, Thur)',
      specialNotes: ''
    });
    closeModal();
  };

  const programTitle = selectedProgram?.title || selectedProgram?.name || 'QorZen Certified Training';
  const programCategory = selectedProgram?.category || 'Professional Certification';
  const programDuration = selectedProgram?.duration || '3 Months';
  const rawPrice = selectedProgram?.price;
  const formattedPrice = rawPrice
    ? typeof rawPrice === 'number'
      ? `₹${rawPrice.toLocaleString('en-IN')}`
      : rawPrice
    : 'Enrollment Open';

  return (
    <AnimatePresence>
      <div className="enrollment-modal-backdrop" onClick={handleClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25 }}
          className="enrollment-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Icon Button */}
          <button onClick={handleClose} className="modal-close-icon-btn" aria-label="Close Modal">
            <X size={18} />
          </button>

          {!submittedData ? (
            <div>
              {/* Header Badge */}
              <div className="modal-top-badge">
                <Sparkles size={14} className="badge-sparkle-icon" />
                <span>Instant Program Registration</span>
              </div>

              <h2 className="modal-main-heading">Enroll in {programTitle}</h2>
              <p className="modal-sub-heading">
                Fill in your details below to reserve your seat in the upcoming batch.
              </p>

              {/* Selected Program Summary */}
              <div className="selected-program-summary-card">
                <div className="summary-card-header">
                  <span className="summary-category-pill">
                    <Tag size={12} />
                    {programCategory}
                  </span>
                  <span className="summary-duration-text">
                    <Clock size={12} />
                    {programDuration}
                  </span>
                </div>

                <div className="summary-program-body">
                  <h4 className="summary-program-title">{programTitle}</h4>
                  <div className="summary-price-badge">
                    <span className="price-label">Fee:</span>
                    <span className="price-value">{formattedPrice}</span>
                  </div>
                </div>

                <div className="summary-perks-row">
                  <span>✓ 1-on-1 Mentorship</span>
                  <span>✓ Live Practical Labs</span>
                  <span>✓ Certification Included</span>
                </div>
              </div>

              {/* User Entry Form */}
              <form onSubmit={handleSubmit} className="enrollment-entry-form">
                <div className="form-group-row">
                  <div className="form-field-wrap">
                    <label htmlFor="fullName">Full Name</label>
                    <div className="input-with-icon">
                      <User size={16} className="field-icon" />
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        autoComplete="name"
                        required
                        placeholder="Enter your full name..."
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="form-field-wrap">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-with-icon">
                      <Mail size={16} className="field-icon" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field-wrap">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-with-icon">
                      <Phone size={16} className="field-icon" />
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="form-field-wrap">
                    <label htmlFor="batchTiming">Select Batch Timing *</label>
                    <div className="input-with-icon">
                      <Calendar size={16} className="field-icon" />
                      <select
                        id="batchTiming"
                        name="batchTiming"
                        autoComplete="off"
                        required
                        value={formData.batchTiming}
                        onChange={handleChange}
                        className="input"
                      >
                        <option value="Weekdays (Mon, Tue, Wed, Thur)">Option A: Weekdays (Mon, Tue, Wed, Thur)</option>
                        <option value="Weekends (Fri, Sat, Sun)">Option B: Weekends (Fri, Sat, Sun)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Mandatory Radio Options for Batch Timing */}
                <div className="batch-radio-group-wrap" style={{ marginTop: '0.25rem' }}>
                  <span className="form-field-wrap label" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.35rem', display: 'block' }}>
                    Preferred Batch Mode *
                  </span>
                  <div className="radio-options-flex-row" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <label htmlFor="batchTimingWeekdays" className="radio-option-card" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600, padding: '0.4rem 0.75rem', border: '0.0625rem solid #d9cfc7', borderRadius: '0.5rem', cursor: 'pointer', backgroundColor: formData.batchTiming.includes('Weekdays') ? '#efe9e3' : '#ffffff' }}>
                      <input
                        type="radio"
                        id="batchTimingWeekdays"
                        name="batchTimingRadio"
                        autoComplete="off"
                        value="Weekdays (Mon, Tue, Wed, Thur)"
                        checked={formData.batchTiming === 'Weekdays (Mon, Tue, Wed, Thur)'}
                        onChange={(e) => setFormData(prev => ({ ...prev, batchTiming: e.target.value }))}
                      />
                      <span>Option A: Weekdays (Mon-Thu)</span>
                    </label>

                    <label htmlFor="batchTimingWeekends" className="radio-option-card" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600, padding: '0.4rem 0.75rem', border: '0.0625rem solid #d9cfc7', borderRadius: '0.5rem', cursor: 'pointer', backgroundColor: formData.batchTiming.includes('Weekends') ? '#efe9e3' : '#ffffff' }}>
                      <input
                        type="radio"
                        id="batchTimingWeekends"
                        name="batchTimingRadio"
                        autoComplete="off"
                        value="Weekends (Fri, Sat, Sun)"
                        checked={formData.batchTiming === 'Weekends (Fri, Sat, Sun)'}
                        onChange={(e) => setFormData(prev => ({ ...prev, batchTiming: e.target.value }))}
                      />
                      <span>Option B: Weekends (Fri-Sun)</span>
                    </label>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-confirm-enrollment"
                >
                  <span>{isSubmitting ? 'Processing Registration...' : `Confirm & Enroll in ${programTitle}`}</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="modal-footer-note">
                <ShieldCheck size={14} className="shield-icon" />
                <span>QorZen Zero-Spam Policy. Your information is 100% secure.</span>
              </div>
            </div>
          ) : (
            /* Confirmation View */
            <div className="enrollment-success-view">
              <div className="success-icon-badge">
                <CheckCircle2 size={42} className="check-svg" />
              </div>

              <h2 className="success-title">Enrollment Reserved!</h2>
              <p className="success-subtitle">
                Thank you, <strong className="text-highlight">{submittedData.fullName}</strong>. Your seat for <strong className="text-highlight">{programTitle}</strong> has been provisionally registered.
              </p>

              <div className="order-summary-box">
                <div className="summary-item-row">
                  <span>Registration Ref:</span>
                  <strong className="ref-code">{submittedData.refCode}</strong>
                </div>
                <div className="summary-item-row">
                  <span>Selected Program:</span>
                  <strong>{programTitle}</strong>
                </div>
                <div className="summary-item-row">
                  <span>Course Fee:</span>
                  <strong>{formattedPrice}</strong>
                </div>
                <div className="summary-item-row">
                  <span>Batch Schedule:</span>
                  <strong>{submittedData.batchTiming}</strong>
                </div>
                <div className="summary-item-row">
                  <span>Contact Email:</span>
                  <strong>{submittedData.email}</strong>
                </div>
              </div>

              <p className="next-steps-text">
                Our academic advisor will reach out to you at <strong>{submittedData.phone}</strong> within 2 hours with syllabus access & payment confirmation.
              </p>

              <button onClick={handleClose} className="btn-done-close">
                Return to Courses
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnrollmentModal;
