import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  ExternalLink,
  User,
  Mail,
  Phone,
  FileUp,
} from "lucide-react";
import { getInternshipById, applyToInternship } from "../../api/internshipApi";
import {
  createEnrollmentRequest,
  getPaymentConfig,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../api/studentApi";
import { useAuthContext } from "../../context/AuthContext";
import "./InternshipDetails.css";

const ADMIN_EMAIL = "prashastdev@gmail.com";

const journeyTimelineSteps = [
  {
    step: "01",
    title: "Enrollment Process",
    desc: "Select your preferred duration tier (1, 3, or 6 Months) and submit your registration details.",
  },
  {
    step: "02",
    title: "Offer Letter",
    desc: "Receive your official QorZen Internship Offer Letter within 24 hours of verification.",
  },
  {
    step: "03",
    title: "Introduction Session",
    desc: "Join the live orientation with your technical mentor, industry team leads, and co-interns.",
  },
  {
    step: "04",
    title: "Elementary Task",
    desc: "Complete an initial baseline assignment to benchmark your current skill set and tool proficiency.",
  },
  {
    step: "05",
    title: "Live Projects",
    desc: "Work on actual corporate client deliverables, software repos, or real-time business campaigns.",
  },
  {
    step: "06",
    title: "Certification & LOR",
    desc: "Receive your QorZen Verified Internship Certificate and official Letter of Recommendation (LOR).",
  },
  {
    step: "07",
    title: "Career Growth",
    desc: "Access PPO (Pre-Placement Offer) conversion tracks, resume reviews, and corporate referrals.",
  },
];

const performanceBenefits = [
  {
    icon: DollarSign,
    title: "Stipend & Rewards",
    desc: "Performance-based monthly stipend incentives for top-performing interns.",
  },
  {
    icon: UserCheck,
    title: "Job Opportunity & PPO",
    desc: "Direct placement pathways and full-time hiring opportunities with QorZen network partners.",
  },
  {
    icon: ShieldCheck,
    title: "1-on-1 Mentorship",
    desc: "Weekly code reviews and direct guidance from senior architects and tech leaders.",
  },
];

const learningBenefits = [
  {
    icon: BookOpen,
    title: "Real Live Projects",
    desc: "Hands-on production codebase experience instead of artificial theoretical assignments.",
  },
  {
    icon: Award,
    title: "Verified Certification",
    desc: "Industry-recognized QorZen Internship Certificate with QR verification.",
  },
  {
    icon: CheckCircle2,
    title: "Official LOR",
    desc: "Customized Letter of Recommendation for university credits and job applications.",
  },
];

const WHATSAPP_NUMBER = "919917529504";


const InternshipDetails = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const internshipId = params.id || searchParams.get('id');

  const { user } = useAuthContext();   // <-- HERE: top level, alongside the useState calls

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

    const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedApplication, setSubmittedApplication] = useState(null);

  // Post-application payment step: pick Razorpay (instant) or WhatsApp/Email (manual, admin confirms)
  const [razorpayEnabled, setRazorpayEnabled] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [enrollError, setEnrollError] = useState(null);
  const [enrollRequest, setEnrollRequest] = useState(null); // the created EnrollmentRequest, once made

  useEffect(() => {
    if (submittedApplication) {
      getPaymentConfig()
        .then((res) =>
          setRazorpayEnabled(res.data?.data?.razorpayEnabled || false),
        )
        .catch(() => setRazorpayEnabled(false));
    }
  }, [submittedApplication]);

  useEffect(() => {
    let cancelled = false;
    const fetchInternship = async () => {
      if (!internshipId) {
        setFetchError("No internship specified.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setFetchError(null);
        const res = await getInternshipById(internshipId);
        if (!cancelled) setInternship(res.data.data);
      } catch (err) {
        if (!cancelled) {
          setFetchError(
            err.response?.status === 404
              ? "This internship could not be found. It may have been removed."
              : "Could not load this internship. Please try again shortly.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchInternship();
    return () => {
      cancelled = true;
    };
  }, [internshipId]);

  if (loading) {
    return (
      <div className="internship-details-page">
        <div
          className="container"
          style={{ padding: "4rem 0", textAlign: "center" }}
        >
          <p>Loading internship...</p>
        </div>
      </div>
    );
  }

  if (fetchError || !internship) {
    return (
      <div className="internship-details-page">
        <div
          className="container"
          style={{ padding: "4rem 0", textAlign: "center" }}
        >
          <h2>{fetchError || "Internship not found"}</h2>
          <Link to="/internship">Back to all internships</Link>
        </div>
      </div>
    );
  }

  const {
    title,
    category,
    tag,
    description,
    price1Month,
    price3Month,
    price6Month,
    tools = [],
  } = internship;

  // Real (charged) prices come straight from the DB fields above and are
  // NEVER modified — same rule as Course/Training. The struck-through
  // "original" price shown here is a pure marketing display: it's
  // reverse-computed so that it always shows exactly 80% OFF against the
  // real price (original = real ÷ 0.2 = real × 5), not a hardcoded number.
  const formatINR = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  const originalFromReal = (realPrice) =>
    formatINR(Math.round((realPrice || 0) * 5));

  const durationCards = [
    {
      duration: "1 Month",
      badge: "80% OFF",
      originalPrice: originalFromReal(price1Month),
      discountPrice: formatINR(price1Month),
      mode: "Online",
      subtext:
        "Perfect for quick skill development & baseline project experience.",
      popular: false,
    },
    {
      duration: "3 Months",
      badge: "80% OFF",
      originalPrice: originalFromReal(price3Month),
      discountPrice: formatINR(price3Month),
      mode: "Online",
      subtext:
        "Ideal for in-depth learning, real client projects, and full certification.",
      popular: true,
    },
    {
      duration: "6 Months",
      badge: "80% OFF",
      originalPrice: originalFromReal(price6Month),
      discountPrice: formatINR(price6Month),
      mode: "Online",
      subtext:
        "Complete professional experience with LOR, performance stipend & PPO track.",
      popular: false,
    },
  ];

  const openApplyModal = (plan) => {
    setSubmitError(null);
    setSubmittedApplication(null);
    setFormData({ name: "", email: "", phone: "" });
    setCvFile(null);
    setEnrollError(null);
    setEnrollRequest(null);
    setSelectedPlanModal(plan);
  };

  const closeApplyModal = () => {
    setSelectedPlanModal(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Same allowed types as the server's uploadResume filter — checked here
  // too so a wrong file type is caught the moment it's picked, not after
  // a failed submit round-trip.
  const ALLOWED_CV_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

  const handleCvChange = (e) => {
    const file = e.target.files[0] || null;
    if (!file) {
      setCvFile(null);
      setCvError(null);
      return;
    }
    const nameLower = file.name.toLowerCase();
    const hasAllowedExtension = ALLOWED_CV_EXTENSIONS.some((ext) =>
      nameLower.endsWith(ext),
    );
    const hasAllowedType = ALLOWED_CV_TYPES.includes(file.type);
    if (!hasAllowedExtension && !hasAllowedType) {
      setCvFile(null);
      setCvError("Please upload your CV in PDF or DOC format.");
      e.target.value = "";
      return;
    }
    setCvFile(file);
    setCvError(null);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!user) {
      setSubmitError("AUTH_REQUIRED");
      return;
    }

    if (!cvFile) {
      setSubmitError("Please attach your CV to apply.");
      return;
    }
    // ...rest unchanged

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("selectedDuration", selectedPlanModal.duration);
      data.append("cv", cvFile);

      const res = await applyToInternship(internship._id, data);
      setSubmittedApplication(res.data.data);
    } catch (err) {
      setSubmitError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppUrl = () => {
    const message =
      `Hi QorZen! I just applied for the ${title} (${selectedPlanModal?.duration}).\n` +
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const buildMailtoUrl = () => {
    const subject = `Internship Enrollment: ${title} (${selectedPlanModal?.duration})`;
    const body =
      `Hi QorZen,\n\nI just applied for the ${title} (${selectedPlanModal?.duration}).\n` +
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`;
    return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Manual path: logs an enrollment request (so admin sees & can confirm it),
  // then opens WhatsApp or the mail client. Still opens the link even if the
  // student isn't logged in (request just won't be tracked in that case).
   const handleManualContact = async (channel) => {
    setEnrollError(null);
    try {
      const res = await createEnrollmentRequest({
        itemType: 'internship',
        itemId: internship._id,
        applicationId: submittedApplication._id,
        method: 'whatsapp',
        contactChannel: channel,
      });
      setEnrollRequest(res.data.data);
      window.open(channel === 'whatsapp' ? buildWhatsAppUrl() : buildMailtoUrl(), '_blank', 'noopener,noreferrer');
    } catch (err) {
      if (err.response?.status === 401) {
        setEnrollError('AUTH_REQUIRED');
      } else {
        console.error('Enrollment request failed:', err);
        setEnrollError(err.response?.data?.message || 'Something went wrong. Please try again.');
      }
    }
  };
  // Razorpay path: create the enrollment request, open checkout, verify on success —
  // access is granted automatically, no admin step needed (mirrors course/training flow).
  const handlePayOnline = async () => {
    setEnrollError(null);
    setPaymentInProgress(true);
    try {
      const reqRes = await createEnrollmentRequest({
        itemType: "internship",
        itemId: internship._id,
        applicationId: submittedApplication._id,
        method: "razorpay",
      });
      const enrollmentRequestId = reqRes.data.data._id;
      const amount = reqRes.data.data.amount;

      const orderRes = await createRazorpayOrder({
        amount,
        enrollmentRequestId,
      });
      const { orderId } = orderRes.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: orderId,
        amount: amount * 100,
        currency: "INR",
        name: "QorZen",
        description: `Internship enrollment: ${title}`,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              enrollmentRequestId,
            });
            setEnrollRequest({ ...reqRes.data.data, status: "confirmed" });
          } catch (verifyErr) {
            setEnrollError(
              "Payment verification failed. Please contact support.",
            );
          } finally {
            setPaymentInProgress(false);
          }
        },
        modal: { ondismiss: () => setPaymentInProgress(false) },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      setEnrollError(
        err.response?.status === 401
          ? "AUTH_REQUIRED"
          : err.response?.data?.message ||
              "Something went wrong. Please try again.",
      );
      setPaymentInProgress(false);
    }
  };

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

      {/* Section 2: Duration Pricing Grid */}
      <section className="pricing-grid-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Flexible Duration Options</span>
            <h2 className="section-title">Select Your Internship Duration</h2>
            <p className="section-desc">
              Choose the program duration that fits your learning pace and
              career goals.
            </p>
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
                className={`duration-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <span className="popular-badge">Most Popular</span>
                )}

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
                    <span>Live mentor Q&amp;A &amp; code reviews</span>
                  </div>
                  <div className="duration-feature-item">
                    <Check size={16} className="check-icon" />
                    <span>
                      {plan.duration === "1 Month"
                        ? "Basic Portfolio Project"
                        : "Advanced Client Projects"}
                    </span>
                  </div>
                  {plan.duration !== "1 Month" && (
                    <div className="duration-feature-item">
                      <Check size={16} className="check-icon" />
                      <span>Official Letter of Recommendation (LOR)</span>
                    </div>
                  )}
                </div>

                <button
                  className="btn-enroll-card"
                  onClick={() => openApplyModal(plan)}
                >
                  <span>ENROLL NOW</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Journey Timeline */}
      <section className="timeline-journey-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Structured Roadmap</span>
            <h2 className="section-title">Your Internship Journey</h2>
            <p className="section-desc">
              7 step-by-step milestones from day one to career growth.
            </p>
          </div>

          <div className="vertical-timeline-container">
            {journeyTimelineSteps.map((stepItem, index) => (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
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

      {/* Section 4: Benefits */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-subtitle">Program Perks</span>
            <h2 className="section-title">What You'll Get</h2>
            <p className="section-desc">
              Comprehensive career advantages designed for student success.
            </p>
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
                      <div className="benefit-icon-box">
                        <Icon size={20} />
                      </div>
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
                      <div className="benefit-icon-box">
                        <Icon size={20} />
                      </div>
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

      {/* Application Modal — talks directly to /api/internships, not EnrollmentModal */}
      <AnimatePresence>
        {selectedPlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={closeApplyModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content enroll-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={closeApplyModal}>
                <X size={20} />
              </button>

              {!submittedApplication ? (
                <>
                  <div className="modal-header-badge">
                    <Zap size={14} className="modal-badge-icon" />
                    <span>Internship Application</span>
                  </div>

                  <h2 className="modal-title">Apply for {title}</h2>
                  <p className="modal-subtitle">
                    Selected Plan:{" "}
                    <strong>{selectedPlanModal.duration} Duration</strong> at{" "}
                    <strong className="modal-highlight-price">
                      {selectedPlanModal.discountPrice}
                    </strong>{" "}
                    ({selectedPlanModal.badge})
                  </p>

                                    {submitError && (
                    <div className="enrollment-error-banner" role="alert">
                      {submitError === "AUTH_REQUIRED" ? (
                        <span>
                          Please sign in to apply for this internship.{" "}
                          <a href="/signin" className="enrollment-error-link">
                            Sign In
                          </a>
                        </span>
                      ) : (
                        <span>{submitError}</span>
                      )}
                    </div>
                  )}

                  <div className="enroll-summary-box">
                    <div className="summary-row">
                      <span>Program:</span>
                      <strong>{title}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Duration:</span>
                      <strong>{selectedPlanModal.duration}</strong>
                    </div>
                    <div className="summary-row total">
                      <span>Total Amount:</span>
                      <strong className="modal-total-price">
                        {selectedPlanModal.discountPrice}
                      </strong>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmitApplication}
                    className="enrollment-entry-form"
                  >
                    <div className="form-field-wrap">
                      <label htmlFor="name">Full Name</label>
                      <div className="input-with-icon">
                        <User size={16} className="field-icon" />
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          placeholder="Enter your full name..."
                          value={formData.name}
                          onChange={handleFormChange}
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
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleFormChange}
                          className="input"
                        />
                      </div>
                    </div>

                    <div className="form-field-wrap">
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-with-icon">
                        <Phone size={16} className="field-icon" />
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="input"
                        />
                      </div>
                    </div>

                    <div className="form-field-wrap">
                      <label htmlFor="cv">Upload CV (PDF/DOC) *</label>
                      <div className="input-with-icon">
                        <FileUp size={16} className="field-icon" />
                        <input
                          id="cv"
                          type="file"
                          name="cv"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          required
                          onChange={handleCvChange}
                          className="input"
                        />
                      </div>
                      {cvError && (
                        <p
                          className="field-error-text"
                          style={{
                            color: "#b91c1c",
                            fontSize: "0.78rem",
                            marginTop: "0.3rem",
                          }}
                        >
                          {cvError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-modal-primary"
                    >
                      <span>
                        {isSubmitting
                          ? "Submitting Application..."
                          : "Confirm & Submit Application"}
                      </span>
                      <ArrowRight size={17} />
                    </button>
                  </form>

                  <a
                    href="https://wa.me/919917529504?text=Hi%20QorZen%20Technologies,%20I%20want%20to%20enroll%20in%20the%20Internship%20Program"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-modal-secondary"
                  >
                    <span>Contact Program Advisor</span>
                    <ExternalLink size={15} />
                  </a>
                </>
              ) : (
                <div className="enrollment-success-view">
                  <div className="success-icon-badge">
                    <CheckCircle2 size={42} className="check-svg" />
                  </div>

                  <h2 className="success-title">Application Submitted!</h2>
                  <p className="success-subtitle">
                    Thank you,{" "}
                    <strong className="text-highlight">{formData.name}</strong>.
                    Your application for{" "}
                    <strong className="text-highlight">{title}</strong> (
                    {selectedPlanModal.duration}) has been received.
                  </p>

                  <div className="order-summary-box">
                    <div className="summary-item-row">
                      <span>Selected Program:</span>
                      <strong>{title}</strong>
                    </div>
                    <div className="summary-item-row">
                      <span>Duration:</span>
                      <strong>{selectedPlanModal.duration}</strong>
                    </div>
                    <div className="summary-item-row">
                      <span>Fee:</span>
                      <strong>{selectedPlanModal.discountPrice}</strong>
                    </div>
                    <div className="summary-item-row">
                      <span>Contact Email:</span>
                      <strong>{formData.email}</strong>
                    </div>
                  </div>

                  {enrollRequest?.status === "confirmed" ? (
                    <p className="next-steps-text">
                      Payment successful! Your access has been granted — check
                      your dashboard and email for onboarding details.
                    </p>
                  ) : (
                    <>
                      <p className="next-steps-text">
                        Pay online to enroll instantly, or reach out on WhatsApp
                        / email and our team will confirm your payment and send
                        your offer letter within 24 hours.
                      </p>

                      {enrollError && (
                        <div
                          className="enrollment-error-banner"
                          role="alert"
                          style={{ marginBottom: "0.6rem" }}
                        >
                          {enrollError === "AUTH_REQUIRED" ? (
                            <span>
                              Please sign in to pay online.{" "}
                              <a
                                href="/signin"
                                className="enrollment-error-link"
                              >
                                Sign In
                              </a>
                            </span>
                          ) : (
                            <span>{enrollError}</span>
                          )}
                        </div>
                      )}

                      <button
                        onClick={handlePayOnline}
                        disabled={!razorpayEnabled || paymentInProgress}
                        className="btn-confirm-enrollment"
                        style={{
                          marginBottom: "0.6rem",
                          ...(razorpayEnabled
                            ? {}
                            : { opacity: 0.5, cursor: "not-allowed" }),
                        }}
                      >
                        <span>
                          {razorpayEnabled
                            ? paymentInProgress
                              ? "Processing..."
                              : "Pay Online & Enroll Instantly"
                            : "Online Payment Not Available (Coming Soon)"}
                        </span>
                        <ArrowRight size={16} />
                      </button>

                      <a
                        href={buildWhatsAppUrl()}
                        onClick={(e) => {
                          e.preventDefault();
                          handleManualContact("whatsapp");
                        }}
                        className="btn-confirm-enrollment"
                        style={{
                          marginBottom: "0.6rem",
                          textDecoration: "none",
                        }}
                      >
                        <span>Continue on WhatsApp for payment</span>
                        <ArrowRight size={16} />
                      </a>

                      <a
                        href={buildMailtoUrl()}
                        onClick={(e) => {
                          e.preventDefault();
                          handleManualContact("email");
                        }}
                        className="btn-confirm-enrollment"
                        style={{
                          marginBottom: "0.6rem",
                          textDecoration: "none",
                        }}
                      >
                        <span>Continue via Email</span>
                        <ArrowRight size={16} />
                      </a>
                    </>
                  )}

                  <button onClick={closeApplyModal} className="btn-done-close">
                    Return to Internships
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternshipDetails;
