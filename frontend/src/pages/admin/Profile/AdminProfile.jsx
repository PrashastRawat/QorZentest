import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  User
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import PasswordSecuritySection from '../../../components/Profile/PasswordSecuritySection';

const AdminProfile = () => {
  const { user, updateUser } = useAuthContext();
  const [formData, setFormData] = useState({
    name: user?.name || 'Master Administrator',
    email: user?.email || 'admin@qorzen-technologies.in',
    phone: user?.phone || '+91 98765 43210'
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (updateUser) {
      await updateUser(formData);
    }
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '48rem', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>System Authority</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.75rem)', fontWeight: 800, color: '#1c1917', marginTop: '0.35rem' }}>
          Master Administrator Profile
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#78716c', margin: 0, lineHeight: 1.45 }}>
          Manage your master credentials, root authorization status, and system contact details.
        </p>
      </div>

      {/* Success Alert */}
      {savedSuccess && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#dcfce7', border: '0.0625rem solid #bbf7d0', borderRadius: '0.5rem', color: '#166534', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} />
          <span>Administrator settings saved successfully.</span>
        </div>
      )}

      {/* Profile Card Form */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', border: '0.0625rem solid #d9cfc7', borderRadius: '1rem', padding: 'clamp(1.15rem, 3vw, 1.75rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '0 0.125rem 0.5rem rgba(28, 25, 23, 0.04)', width: '100%', boxSizing: 'border-box' }}>
        {/* Avatar Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=500&auto=format&fit=crop"
            alt="Master Administrator"
            style={{ width: '4rem', height: '4rem', borderRadius: '50%', objectFit: 'cover', border: '0.15rem solid #1c1917', flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917', margin: 0, wordBreak: 'break-word' }}>{formData.name}</h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
              <ShieldCheck size={14} color="#16a34a" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16a34a' }}>Root Authority (ADM-001)</span>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.35rem' }}>
              Full Administrator Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.88rem', border: '0.0625rem solid #d9cfc7', borderRadius: '0.5rem', outline: 'none', backgroundColor: '#f9f8f6', color: '#1c1917', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.35rem' }}>
              Primary Root Email
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.88rem', border: '0.0625rem solid #d9cfc7', borderRadius: '0.5rem', backgroundColor: '#efe9e3', color: '#78716c', cursor: 'not-allowed', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.35rem' }}>
            System Contact Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', fontSize: '0.88rem', border: '0.0625rem solid #d9cfc7', borderRadius: '0.5rem', outline: 'none', backgroundColor: '#f9f8f6', color: '#1c1917', boxSizing: 'border-box' }}
          />
        </div>

        {/* Security Access Badges */}
        <div style={{ padding: '1rem', backgroundColor: '#f9f8f6', border: '0.0625rem dashed #d9cfc7', borderRadius: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <Lock size={15} color="#8b7050" />
            <strong style={{ fontSize: '0.82rem', color: '#1c1917' }}>Access Control Privileges</strong>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#78716c', margin: 0, lineHeight: 1.4 }}>
            You hold unrestricted administrative control across all system scopes including database mutations, student cohort registrations, payment overrides, and live website publishing.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5rem' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1c1917',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s ease',
              width: 'auto'
            }}
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Administrator Settings'}</span>
          </button>
        </div>
      </form>

      <PasswordSecuritySection />
    </div>
  );
};

export default AdminProfile;
