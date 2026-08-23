import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  X,
  Loader2
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import authService from '../../../services/authService';
import './StudentLogin.css';

/**
 * StudentLogin Component
 * Dedicated authentication page for the QorZen Student Classroom Portal.
 * Supports Email, Password, Remember Me, Forgot Password modal, and 1-Click Demo Login.
 */
const StudentLogin = () => {
  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination if user was redirected from protected route
  const from = location.state?.from?.pathname || '/dashboard';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState('');

  // If already authenticated, redirect straight to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid student email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleAutofillDemo = () => {
    setFormData({
      email: 'student@qorzen.in',
      password: 'password123',
      rememberMe: true
    });
    setError('');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetSuccess('');
    try {
      const res = await authService.resetPassword(resetEmail);
      setResetSuccess(res.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="student-login-page">
      <div className="student-login-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="student-login-card"
        >
          {/* Header */}
          <div className="student-login-header">
            <img src="/logo.jpeg" alt="QorZen Logo" className="student-logo-img" />
            <div className="student-brand-badge">
              <Sparkles size={13} color="#c9b59c" />
              <span>Student Classroom Portal</span>
            </div>
            <h1 className="student-login-title">Student Sign In</h1>
            <p className="student-login-subtitle">
              Enter your credentials to access your enrolled courses, live labs, and assignments.
            </p>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="student-error-alert" style={{ marginBottom: '1rem' }}>
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="student-auth-form">
            <div className="student-form-group">
              <label htmlFor="studentEmail" className="student-form-label">
                Registered Email Address
              </label>
              <div className="student-input-wrap">
                <Mail size={16} className="student-input-icon" />
                <input
                  id="studentEmail"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="student@qorzen.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="student-input-field"
                />
              </div>
            </div>

            <div className="student-form-group">
              <label htmlFor="studentPassword" className="student-form-label">
                Password
              </label>
              <div className="student-input-wrap">
                <Lock size={16} className="student-input-icon" />
                <input
                  id="studentPassword"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="student-input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="student-password-toggle"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="student-remember-row">
              <label className="student-remember-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="student-remember-checkbox"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setResetEmail(formData.email);
                  setShowForgotModal(true);
                }}
                className="student-forgot-btn"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="student-login-submit-btn"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Classroom</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="reset-modal-overlay" onClick={() => setShowForgotModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="reset-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917' }}>Reset Password</h3>
                <button
                  onClick={() => setShowForgotModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}
                >
                  <X size={18} />
                </button>
              </div>

              {!resetSuccess ? (
                <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <p style={{ fontSize: '0.82rem', color: '#78716c', lineHeight: 1.45 }}>
                    Enter your enrolled student email to receive a password reset recovery link.
                  </p>
                  <div className="student-input-wrap">
                    <Mail size={16} className="student-input-icon" />
                    <input
                      type="email"
                      required
                      placeholder="student@qorzen.in"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="student-input-field"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="student-login-submit-btn"
                  >
                    {resetLoading ? 'Sending Link...' : 'Send Recovery Link'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={36} color="#16a34a" style={{ margin: '0 auto 0.75rem auto' }} />
                  <p style={{ fontSize: '0.85rem', color: '#1c1917', fontWeight: 700 }}>{resetSuccess}</p>
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="student-login-submit-btn"
                    style={{ marginTop: '1rem' }}
                  >
                    Back to Sign In
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentLogin;
