import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import '../../Student/Login/StudentLogin.css';

const AdminLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const [formData, setFormData] = useState({
    email: 'admin@qorzen-technologies.in',
    password: 'Admin@123',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
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
              <span>Control Panel Entry</span>
            </div>
            <h1 className="student-login-title">Admin Sign In</h1>
            <p className="student-login-subtitle">
              Enter your credentials to access the website management portal.
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
              <label htmlFor="adminEmail" className="student-form-label">
                Administrator Email Address
              </label>
              <div className="student-input-wrap">
                <Mail size={16} className="student-input-icon" />
                <input
                  id="adminEmail"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@qorzen-technologies.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="student-input-field"
                />
              </div>
            </div>

            <div className="student-form-group">
              <label htmlFor="adminPassword" className="student-form-label">
                Password
              </label>
              <div className="student-input-wrap">
                <Lock size={16} className="student-input-icon" />
                <input
                  id="adminPassword"
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

            {/* Remember Me */}
            <div className="student-remember-row" style={{ justifyContent: 'flex-start' }}>
              <label className="student-remember-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="student-remember-checkbox"
                />
                <span>Keep me signed in</span>
              </label>
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
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
