import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { Sparkles, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import { navigateToDashboard } from '../../../utils/navigation';
import './SignIn.css';


const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuthContext();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    setLoading(true);
    setError('');

    // Logging payload prepped for MERN backend API (e.g. POST /api/auth/login)
    console.log('Ready for Node/Express API', {
      endpoint: '/api/auth/login',
      payload: formData,
      timestamp: new Date().toISOString()
    });

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });

      // If user came from a specific protected route, return them there; otherwise return to main website
      const fromPath = location.state?.from?.pathname;
      if (fromPath) {
        navigate(fromPath, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (credentialResponse) => {
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
        className="auth-card"
      >
        <div className="auth-header">
          <div className="auth-brand-badge">
            <Sparkles size={14} className="auth-badge-icon" />
            <span>QorZen Portal</span>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your training dashboard and resources.</p>
        </div>

        {error && (
          <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Prominent Google OAuth Button */}
        <GoogleLogin
          onSuccess={handleGoogleSignIn}
          onError={() => setError('Google sign-in failed.')}
        />

        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="auth-form">
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
            <div className="label-flex">
              <label className="form-label" htmlFor="password">Password</label>
              <a href="#" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert('Password reset instructions have been dispatched to your email.'); }}>Forgot password?</a>
            </div>
            <div className="input-input-icon-wrap" style={{ position: 'relative' }}>
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="current-password"
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
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn-auth-submit">
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer-note" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', alignItems: 'center' }}>
          <p>Don't have an account yet? <Link to="/auth/signup">Sign Up Free</Link></p>
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-medium)', width: '100%', textAlign: 'center' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Are you an administrator? <Link to="/admin/login" style={{ fontWeight: '800', color: 'var(--text-primary)', textDecoration: 'underline' }}>Login as Admin</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
