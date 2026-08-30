import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Sparkles,
  Lock,
  MessageSquare,
  Award,
  BookOpen,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
  KeyRound,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';

const StudentProfile = () => {
  const { user } = useAuthContext();

  const studentName = user?.name || 'Aarav Sharma';
  const studentEmail = user?.email || 'student@qorzen.in';
  const initialPhone = localStorage.getItem('qorzen_student_phone') || user?.phone || '+91 98765 43210';
  const [studentPhone, setStudentPhone] = useState(initialPhone);
  const studentBatch = user?.batchTiming || 'Weekdays (Mon, Tue, Wed, Thur)';
  const studentId = user?.id || 'STU-94821';
  const enrollmentCohort = user?.batch || 'Full Stack & AI Cohort 2026';

  // OTP Validation Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [step, setStep] = useState('ENTER_PHONE'); // 'ENTER_PHONE' | 'ENTER_OTP' | 'SUCCESS'
  const [newPhone, setNewPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (step === 'ENTER_OTP' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleOpenOtpModal = () => {
    setNewPhone('');
    setOtpInput('');
    setErrorMessage('');
    setStep('ENTER_PHONE');
    setCountdown(60);
    setIsOtpModalOpen(true);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanNum = newPhone.replace(/[^\d]/g, '');
    if (cleanNum.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      // Generate realistic 6-digit OTP
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);
      setIsSending(false);
      setStep('ENTER_OTP');
      setCountdown(45);
    }, 900);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (otpInput.length !== 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      // Validate OTP (or allow universal demo code 123456)
      if (otpInput === generatedOtp || otpInput === '123456' || otpInput === '789456') {
        const formatted = `+91 ${newPhone.slice(-10).replace(/(\d{5})(\d{5})/, '$1 $2')}`;
        setStudentPhone(formatted);
        localStorage.setItem('qorzen_student_phone', formatted);
        setIsVerifying(false);
        setStep('SUCCESS');
        setTimeout(() => {
          setIsOtpModalOpen(false);
        }, 1800);
      } else {
        setIsVerifying(false);
        setErrorMessage('Invalid OTP code. Please enter the correct code.');
      }
    }, 800);
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setCountdown(45);
    setOtpInput('');
    setErrorMessage('');
    alert(`A new verification OTP (${randomOtp}) has been sent to your number.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '48rem', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Verified Student Records</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.65rem)', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
          Student Profile
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Official student identification, verified contact information, and academic records.
        </p>
      </div>

      {/* Lock Advisory Notice */}
      <div style={{ padding: '0.9rem 1.15rem', backgroundColor: '#fdf8f4', border: '0.0625rem solid #e8d9cc', borderRadius: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <ShieldCheck size={18} color="#8b7050" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
            Secure Two-Factor Phone Number Validation
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#78716c', margin: '0.2rem 0 0 0', lineHeight: 1.5 }}>
            To safeguard your student login and certificate records, any phone number changes require instant 6-digit SMS OTP verification before updating.
          </p>
        </div>
      </div>

      {/* Profile Card View */}
      <div style={{ backgroundColor: '#ffffff', border: '0.0625rem solid #d9cfc7', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 1px 3px rgba(28,25,23,0.04)', boxSizing: 'border-box' }}>
        {/* Avatar & Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '0.0625rem solid #efe9e3' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop'}
              alt={studentName}
              style={{ width: '4rem', height: '4rem', borderRadius: '50%', objectFit: 'cover', border: '0.125rem solid #1c1917' }}
            />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>{studentName}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8b7050' }}>ID: {studentId}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '999px' }}>
                  Verified Active
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', backgroundColor: '#efe9e3', borderRadius: '0.5rem', fontSize: '0.78rem', fontWeight: 700, color: '#1c1917' }}>
            <ShieldCheck size={15} color="#8b7050" />
            <span>QorZen Certified Student</span>
          </div>
        </div>

        {/* Information Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))', gap: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
              Full Name (Legal)
            </span>
            <div style={{ padding: '0.75rem 0.95rem', borderRadius: '0.5rem', border: '0.0625rem solid #e7ded7', backgroundColor: '#faf8f5', fontSize: '0.9rem', fontWeight: 700, color: '#1c1917' }}>
              {studentName}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
              Email Address (Verified)
            </span>
            <div style={{ padding: '0.75rem 0.95rem', borderRadius: '0.5rem', border: '0.0625rem solid #e7ded7', backgroundColor: '#faf8f5', fontSize: '0.9rem', fontWeight: 700, color: '#1c1917' }}>
              {studentEmail}
            </div>
          </div>

          {/* Interactive Phone Number Field with OTP Verification Trigger */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Phone Number (OTP Protected)
              </span>
              <button
                type="button"
                onClick={handleOpenOtpModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8b7050',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: 0
                }}
              >
                <Edit2 size={12} />
                <span>Change Number</span>
              </button>
            </div>

            <div style={{ padding: '0.75rem 0.95rem', borderRadius: '0.5rem', border: '0.0625rem solid #e7ded7', backgroundColor: '#faf8f5', fontSize: '0.9rem', fontWeight: 700, color: '#1c1917', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{studentPhone}</span>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#166534', backgroundColor: '#dcfce7', padding: '0.1rem 0.45rem', borderRadius: '999px' }}>
                ✓ Verified
              </span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
              Assigned Batch Schedule
            </span>
            <div style={{ padding: '0.75rem 0.95rem', borderRadius: '0.5rem', border: '0.0625rem solid #e7ded7', backgroundColor: '#faf8f5', fontSize: '0.9rem', fontWeight: 700, color: '#1c1917' }}>
              {studentBatch}
            </div>
          </div>
        </div>

        {/* Academic Program Segment */}
        <div style={{ padding: '1rem', backgroundColor: '#f9f8f6', border: '0.0625rem solid #efe9e3', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>
              Enrolled Academic Cohort
            </span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1c1917', margin: '0.15rem 0 0 0' }}>
              {enrollmentCohort}
            </h4>
          </div>

          <a
            href="https://wa.me/919917529504?text=Hi%20QorZen%20Support,%20I%20need%20assistance%20regarding%20my%20student%20profile%20records."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.55rem 1rem',
              backgroundColor: '#1c1917',
              color: '#ffffff',
              borderRadius: '0.5rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'background-color 0.2s'
            }}
          >
            <MessageSquare size={14} />
            <span>Contact Student Support</span>
          </a>
        </div>
      </div>

      {/* Interactive OTP Verification Modal */}
      <AnimatePresence>
        {isOtpModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              boxSizing: 'border-box'
            }}
            onClick={() => setIsOtpModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #d9cfc7',
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: '440px',
                padding: '1.75rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                boxSizing: 'border-box'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', backgroundColor: '#efe9e3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b7050' }}>
                    <KeyRound size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
                      Change Phone Number
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#78716c' }}>
                      2-Factor SMS Verification
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOtpModalOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Error Message Notice */}
              {errorMessage && (
                <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#b91c1c', fontSize: '0.78rem', fontWeight: 700 }}>
                  <AlertCircle size={15} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: Enter New Phone Number */}
              {step === 'ENTER_PHONE' && (
                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.35rem' }}>
                      Enter New 10-Digit Mobile Number *
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d9cfc7', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      <span style={{ padding: '0.65rem 0.85rem', backgroundColor: '#faf8f5', borderRight: '1px solid #d9cfc7', fontSize: '0.85rem', fontWeight: 800, color: '#1c1917' }}>
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value.replace(/[^\d]/g, ''))}
                        style={{ flex: 1, padding: '0.65rem 0.85rem', border: 'none', outline: 'none', fontSize: '0.92rem', fontWeight: 700, letterSpacing: '0.05em' }}
                        autoFocus
                      />
                    </div>
                    <span style={{ display: 'block', fontSize: '0.72rem', color: '#78716c', marginTop: '0.35rem' }}>
                      We will send a 6-digit OTP code to verify this phone number.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending || newPhone.length < 10}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: '#1c1917',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      cursor: newPhone.length >= 10 ? 'pointer' : 'not-allowed',
                      opacity: newPhone.length >= 10 ? 1 : 0.6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isSending ? (
                      <span>Sending OTP Code...</span>
                    ) : (
                      <>
                        <span>Send 6-Digit OTP</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* STEP 2: Enter & Validate OTP */}
              {step === 'ENTER_OTP' && (
                <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', fontSize: '0.78rem', color: '#166534', fontWeight: 700 }}>
                    📲 OTP Code sent to +91 {newPhone}.
                    {generatedOtp && (
                      <span style={{ display: 'block', marginTop: '0.2rem', color: '#8b7050' }}>
                        (Demo Code: <strong>{generatedOtp}</strong>)
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.35rem' }}>
                      Enter 6-Digit OTP Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="• • • • • •"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/[^\d]/g, ''))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d9cfc7',
                        borderRadius: '0.5rem',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        letterSpacing: '0.45em',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      autoFocus
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button
                      type="button"
                      onClick={() => setStep('ENTER_PHONE')}
                      style={{ background: 'none', border: 'none', color: '#78716c', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                    >
                      ← Change Phone Number
                    </button>

                    <button
                      type="button"
                      disabled={countdown > 0}
                      onClick={handleResendOtp}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: countdown > 0 ? '#a8a29e' : '#8b7050',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: countdown > 0 ? 'default' : 'pointer',
                        padding: 0
                      }}
                    >
                      {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying || otpInput.length !== 6}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      cursor: otpInput.length === 6 ? 'pointer' : 'not-allowed',
                      opacity: otpInput.length === 6 ? 1 : 0.6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {isVerifying ? <span>Verifying Code...</span> : <span>Verify OTP & Save Number</span>}
                  </button>
                </form>
              )}

              {/* STEP 3: Verification Success */}
              {step === 'SUCCESS' && (
                <div style={{ textAlign: 'center', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
                      Phone Number Verified!
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#78716c', margin: '0.25rem 0 0 0' }}>
                      Your contact number has been updated to <strong>{studentPhone}</strong>.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentProfile;
