import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';

/**
 * Drop into any profile page (Student, Admin). Reads `user.hasPassword` to
 * decide whether to show a "Set Password" form (Google sign-in, no password
 * yet — no current-password field needed) or a "Change Password" form
 * (local user, or a Google user who already set one — current password required).
 */
const PasswordSecuritySection = () => {
  const { user, refreshUser } = useAuthContext();
  const hasPassword = !!user?.hasPassword;
  const isGoogleUser = user?.authProvider === 'google';

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (hasPassword && !currentPassword) {
      setError('Please enter your current password.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.changePassword({
        currentPassword: hasPassword ? currentPassword : undefined,
        newPassword,
      });
      setSuccess(res.message || (hasPassword ? 'Password updated successfully.' : 'Password set successfully.'));
      resetForm();
      await refreshUser();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', border: '0.0625rem solid #d9cfc7', borderRadius: '1rem', padding: 'clamp(1.15rem, 3vw, 1.75rem)', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 0.125rem 0.5rem rgba(28, 25, 23, 0.04)', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.6rem', backgroundColor: '#efe9e3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <KeyRound size={17} color="#8b7050" />
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
            {hasPassword ? 'Change Password' : 'Set a Password'}
          </h3>
          <p style={{ fontSize: '0.78rem', color: '#78716c', margin: '0.15rem 0 0 0' }}>
            {hasPassword
              ? 'Update the password used to sign in.'
              : isGoogleUser
                ? "You signed up with Google and don't have a password yet. Set one so you can also sign in with your email."
                : 'Set a password for your account.'}
          </p>
        </div>
      </div>

      {error && (
        <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#fef2f2', border: '0.0625rem solid #fecaca', color: '#b91c1c', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#dcfce7', border: '0.0625rem solid #bbf7d0', color: '#166534', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {hasPassword && (
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.35rem' }}>
              Current Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{ width: '100%', padding: '0.75rem 2.5rem', fontSize: '0.88rem', border: '0.0625rem solid #d9cfc7', borderRadius: '0.5rem', outline: 'none', backgroundColor: '#f9f8f6', color: '#1c1917', boxSizing: 'border-box' }}
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#a8a29e' }} aria-label="Toggle visibility">
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.35rem' }}>
              New Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                placeholder="At least 8 characters"
                style={{ width: '100%', padding: '0.75rem 2.5rem', fontSize: '0.88rem', border: '0.0625rem solid #d9cfc7', borderRadius: '0.5rem', outline: 'none', backgroundColor: '#f9f8f6', color: '#1c1917', boxSizing: 'border-box' }}
              />
              <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#a8a29e' }} aria-label="Toggle visibility">
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.35rem' }}>
              Confirm New Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#a8a29e' }} />
              <input
                type={showNew ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                placeholder="Re-enter new password"
                style={{ width: '100%', padding: '0.75rem 2.5rem', fontSize: '0.88rem', border: '0.0625rem solid #d9cfc7', borderRadius: '0.5rem', outline: 'none', backgroundColor: '#f9f8f6', color: '#1c1917', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1c1917',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Saving...' : hasPassword ? 'Update Password' : 'Set Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSecuritySection;