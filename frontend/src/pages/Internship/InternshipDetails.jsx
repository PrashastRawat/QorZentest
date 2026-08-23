import React, { useState } from 'react';
import { useLocation, useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Check,
  CheckCircle2,
  Award,
  BookOpen,
  DollarSign,
  UserCheck,
  ArrowRight,
  X,
  Zap,
  ChevronRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';
import { ALL_INTERNSHIPS } from './InternshipsList';
import './InternshipDetails.css';

// 7 Step Internship Journey Timeline Data
const journeyTimelineSteps = [
  { step: '01', title: 'Enrollment Process', desc: 'Select your preferred duration tier (1, 3, or 6 Months) and submit your registration details.' },
  { step: '02', title: 'Offer Letter', desc: 'Receive your official QorZen Internship Offer Letter within 24 hours of verification.' },
  { step: '03', title: 'Introduction Session', desc: 'Join the live orientation with your technical mentor, industry team leads, and co-interns.' },
  { step: '04', title: 'Elementary Task', desc: 'Complete an initial baseline assignment to benchmark your current skill set and tool proficiency.' },
  { step: '05', title: 'Live Projects', desc: 'Work on actual corporate client deliverables, software repos, or real-time business campaigns.' },
  { step: '06', title: 'Certification & LOR', desc: 'Receive your QorZen Verified Internship Certificate and official Letter of Recommendation (LOR).' },
  { step: '07', title: 'Career Growth', desc: 'Access PPO (Pre-Placement Offer) conversion tracks, resume reviews, and corporate referrals.' }
];

// Benefits Grid Data
const performanceBenefits = [
  { icon: DollarSign, title: 'Stipend & Rewards', desc: 'Performance-based monthly stipend incentives for top-performing interns.' },
  { icon: UserCheck, title: 'Job Opportunity & PPO', desc: 'Direct placement pathways and full-time hiring opportunities with QorZen network partners.' },
  { icon: ShieldCheck, title: '1-on-1 Mentorship', desc: 'Weekly code reviews and direct guidance from senior architects and tech leaders.' }
];

const learningBenefits = [
  { icon: BookOpen, title: 'Real Live Projects', desc: 'Hands-on production codebase experience instead of artificial theoretical assignments.' },
  { icon: Award, title: 'Verified Certification', desc: 'Industry-recognized QorZen Internship Certificate with QR verification.' },
  { icon: CheckCircle2, title: 'Official LOR', desc: 'Customized Letter of Recommendation for university credits and job applications.' }
];

const InternshipDetails = ({ propsInternship }) => {
  const { openModal } = useEnquiryModal();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  // Bulletproof lookup: Priority 1: prop, Priority 2: location.state, Priority 3: query ?id=..., Priority 4: params.id, Priority 5: fallback to ALL_INTERNSHIPS[0]
  const targetId = searchParams.get('id') || params.id;
  const foundFromId = targetId ? ALL_INTERNSHIPS.find((item) => item.id === targetId) : null;

  const passedInternship = propsInternship || location.state?.internship || foundFromId || ALL_INTERNSHIPS[0];

  const title = passedInternship?.title || 'Cyber Security Intern';
  const category = passedInternship?.category || 'Technical';
  const tag = passedInternship?.tag || 'Security';
  const description =
    passedInternship?.description ||
    'Master real-world practical skills with live project assignments, expert 1-on-1 mentorship, and guaranteed internship credentials.';

  const price1Month = passedInternship?.price1Month || 799;
  const price3Month = passedInternship?.price3Month || 1399;
  const price6Month = passedInternship?.price6Month || 2399;
  const tools = passedInternship?.tools || ['React.js', 'Node.js', 'Express', 'MongoDB', 'Python'];

  const [selectedPlanModal, setSelectedPlanModal] = useState(null);

  const durationCards = [
    {
      duration: '1 Month',
      badge: '80% OFF',
      originalPrice: '₹3,999',
      discountPrice: `₹${price1Month}`,
      mode: 'Online',
      subtext: 'Perfect for quick skill development & baseline project experience.',
      popular: false
    },
    {
      duration: '3 Months',
      badge: '80% OFF',
      originalPrice: '₹6,999',
      discountPrice: `₹${price3Month}`,
      mode: 'Online',
      subtext: 'Ideal for in-depth learning, real client projects, and full certification.',
      popular: true
    },
    {
      duration: '6 Months',
      badge: '80% OFF',
      originalPrice: '₹11,999',
      discountPrice: `₹${price6Month}`,
      mode: 'Online',
      subtext: 'Complete professional experience with LOR, performance stipend & PPO track.',
      popular: false
    }
  ];

  return (
    <div className="internship-details-page">
      {/* Section 1: Hero */}
      <section className="details-hero">
        <div className="container">
          <div className="breadcrumb-nav">
            <Link to="/internship">Internships</Link>
            <ChevronRight size={14} />
            <span>{category}</span>
            <ChevronRight size={14} />
            <span className="current-crumb">{title}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-pill"
          >
            <Zap size={14} className="hero-badge-icon" />
            <span>{tag} Internship Program</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="details-hero-title"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="details-hero-description"
          >
            {description}
          </motion.p>

          <div className="hero-skills-row">
            <span className="skills-row-label">Key Stack & Tools Covered:</span>
            <div className="skills-chips-wrap">
              {tools.map((tool, index) => (
                <span key={index} className="detail-skill-chip">
                  <CheckCircle2 size={13} className="chip-icon" />
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Duration Pricing Grid (3 Cards) */}
      <section className="pricing-grid-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Flexible Duration Options</span>
            <h2 className="section-title">Select Your Internship Duration</h2>
            <p className="section-desc">Choose the program duration that fits your learning pace and career goals.</p>
          </div>

          <div className="duration-pricing-grid">
            {durationCards.map((plan, index) => (
              <motion.div
                key={plan.duration}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className={`duration-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && <span className="popular-badge">Most Popular</span>}

                <div className="duration-card-header">
                  <span className="duration-title">{plan.duration}</span>
                  <span className="discount-off-badge">{plan.badge}</span>
                </div>

                <div className="duration-price-box">
                  <span className="original-price">{plan.originalPrice}</span>
                  <span className="discount-price">{plan.discountPrice}</span>
                </div>

                <div className="mode-pill">{plan.mode}</div>
                <p className="duration-subtext">{plan.subtext}</p>

                <div className="duration-features">
                  <div className="duration-feature-item">
                    <Check size={16} className="check-icon" />
                    <span>Verified Certificate of Completion</span>
                  </div>
                  <div className="duration-feature-item">
                    <Check size={16} className="check-icon" />
                    <span>Live mentor Q&A & code reviews</span>
                  </div>
                  <div className="duration-feature-item">
                    <Check size={16} className="check-icon" />
                    <span>{plan.duration === '1 Month' ? 'Basic Portfolio Project' : 'Advanced Client Projects'}</span>
                  </div>
                  {plan.duration !== '1 Month' && (
                    <div className="duration-feature-item">
                      <Check size={16} className="check-icon" />
                      <span>Official Letter of Recommendation (LOR)</span>
                    </div>
                  )}
                </div>

                <button
                  className="btn-enroll-card"
                  onClick={() => setSelectedPlanModal(plan)}
                >
                  <span>ENROLL NOW</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Your Internship Journey (Vertical Timeline) */}
      <section className="timeline-journey-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Structured Roadmap</span>
            <h2 className="section-title">Your Internship Journey</h2>
            <p className="section-desc">7 step-by-step milestones from day one to career growth.</p>
          </div>

          <div className="vertical-timeline-container">
            {journeyTimelineSteps.map((stepItem, index) => (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="timeline-item"
              >
                <div className="timeline-number">{stepItem.step}</div>
                <div className="timeline-content-card">
                  <h3 className="timeline-step-title">{stepItem.title}</h3>
                  <p className="timeline-step-desc">{stepItem.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: What You'll Get (Benefits) */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Program Perks</span>
            <h2 className="section-title">What You'll Get</h2>
            <p className="section-desc">Comprehensive career advantages designed for student success.</p>
          </div>

          <div className="benefits-two-col-grid">
            <div className="benefits-col">
              <div className="benefits-col-header">
                <DollarSign size={20} className="benefits-header-icon" />
                <h3>Performance Benefits</h3>
              </div>
              <div className="benefits-cards-stack">
                {performanceBenefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="benefit-card">
                      <div className="benefit-icon-box"><Icon size={20} /></div>
                      <div>
                        <h4 className="benefit-title">{b.title}</h4>
                        <p className="benefit-desc">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="benefits-col">
              <div className="benefits-col-header">
                <BookOpen size={20} className="benefits-header-icon" />
                <h3>Learning Benefits</h3>
              </div>
              <div className="benefits-cards-stack">
                {learningBenefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="benefit-card">
                      <div className="benefit-icon-box"><Icon size={20} /></div>
                      <div>
                        <h4 className="benefit-title">{b.title}</h4>
                        <p className="benefit-desc">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {selectedPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedPlanModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content enroll-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedPlanModal(null)}>
                <X size={20} />
              </button>

              <div className="modal-header-badge">
                <Zap size={14} className="modal-badge-icon" />
                <span>Internship Enrollment</span>
              </div>

              <h2 className="modal-title">Enroll in {title}</h2>
              <p className="modal-subtitle">
                Selected Plan: <strong>{selectedPlanModal.duration} Duration</strong> at{' '}
                <strong className="modal-highlight-price">{selectedPlanModal.discountPrice}</strong> ({selectedPlanModal.badge})
              </p>

              <div className="enroll-summary-box">
                <div className="summary-row">
                  <span>Program:</span>
                  <strong>{title}</strong>
                </div>
                <div className="summary-row">
                  <span>Duration:</span>
                  <strong>{selectedPlanModal.duration}</strong>
                </div>
                <div className="summary-row">
                  <span>Access Mode:</span>
                  <strong>Online</strong>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <strong className="modal-total-price">{selectedPlanModal.discountPrice}</strong>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-modal-primary"
                  onClick={() => {
                    const chosenPlan = selectedPlanModal;
                    setSelectedPlanModal(null);
                    openModal({
                      title: `${title} (${chosenPlan.duration})`,
                      duration: chosenPlan.duration,
                      price: chosenPlan.discountPrice,
                      category: 'Internship',
                      mode: 'Online'
                    });
                  }}
                >
                  <span>Proceed with Application & Enrollment</span>
                  <ArrowRight size={17} />
                </button>
                <a
                  href="https://wa.me/919917529504?text=Hi%20QorZen%20Technologies,%20I%20want%20to%20enroll%20in%20the%20Internship%20Program"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-secondary"
                >
                  <span>Contact Program Advisor</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternshipDetails;
