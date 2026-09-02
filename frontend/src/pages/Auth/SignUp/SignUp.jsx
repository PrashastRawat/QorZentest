import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { Sparkles, Mail, Lock, User, Phone, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import './SignUp.css';
const SignUp = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuthContext();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  // Unified Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);
    setError('');

    // Payload prepped for MERN backend API (e.g. POST /api/auth/register)
    console.log('Ready for Node/Express API', {
      endpoint: '/api/auth/register',
      payload: formData,
      timestamp: new Date().toISOString()
    });

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle(credentialResponse.credential);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="auth-card signup-card"
      >
        <div className="auth-header">
          <div className="auth-brand-badge">
            <Sparkles size={14} className="auth-badge-icon" />
            <span>Join QorZen</span>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Get instant access to AI tools, training modules & internships.</p>
        </div>

        {error && (
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Prominent Google OAuth Button */}
        <GoogleLogin
          onSuccess={handleGoogleSignUp}
          onError={() => setError('Google sign-in failed.')}
        />
        {/* Legacy custom Google button retained for styling reference.
        <button type="button" className="btn-google-auth" onClick={handleGoogleSignUp}>
          <svg className="google-svg-logo" viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button> */}

        <div className="auth-divider">
          <span>or sign up with email</span>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name</label>
            <div className="input-input-icon-wrap">
              <User size={18} className="input-icon" />
              <input
                id="fullName"
                type="text"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Rahul Sharma"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-input-icon-wrap">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number (Optional)</label>
            <div className="input-input-icon-wrap">
              <Phone size={18} className="input-icon" />
              <input
                id="phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Create Password</label>
            <div className="input-input-icon-wrap" style={{ position: 'relative' }}>
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="new-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)'
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span>I agree to QorZen's <Link to="/terms-and-conditions" target="_blank">Terms of Service</Link> and <Link to="/privacy-policy" target="_blank">Privacy Policy</Link></span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn-auth-submit">
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer-note">
          <p>Already have an account? <Link to="/auth/signin">Sign In</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
