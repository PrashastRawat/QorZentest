import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Sparkles,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';

const StudentProfile = () => {
  const { user, updateUser } = useAuthContext();
  const [formData, setFormData] = useState({
    name: user?.name || 'Aarav Sharma',
    phone: user?.phone || '+91 98765 43210',
    batchTiming: user?.batchTiming || 'Weekdays (Mon, Tue, Wed, Thur)'
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateUser(formData);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '45rem' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Account Settings</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
          Student Profile
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Manage your personal contact details, verified student ID, and enrolled cohort preferences.
        </p>
      </div>

      {/* Success Alert */}
      {savedSuccess && (
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#dcfce7', border: '0.0625rem solid #bbf7d0', borderRadius: '0.5rem', color: '#166534', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} />
          <span>Profile changes saved successfully.</span>
        </div>
      )}

      {/* Profile Card Form */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', border: '0.0625rem solid #d9cfc7', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Avatar Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop'}
            alt={user?.name || 'Student'}
            style={{ width: '4rem', height: '4rem', borderRadius: '50%', objectFit: 'cover', border: '0.125rem solid #1c1917' }}
          />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917' }}>{user?.name || 'Aarav Sharma'}</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8b7050' }}>Student ID: {user?.id || 'STU-94821'}</span>
          </div>
        </div>

        {/* Input Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.25rem' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '0.0625rem solid #d9cfc7', fontSize: '0.85rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.25rem' }}>
              Email Address (Verified)
            </label>
            <input
              type="email"
              disabled
              value={user?.email || 'student@qorzen.in'}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '0.0625rem solid #d9cfc7', backgroundColor: '#efe9e3', color: '#78716c', fontSize: '0.85rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.25rem' }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '0.0625rem solid #d9cfc7', fontSize: '0.85rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.25rem' }}>
              Batch Timing
            </label>
            <select
              value={formData.batchTiming}
              onChange={(e) => setFormData({ ...formData, batchTiming: e.target.value })}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '0.5rem', border: '0.0625rem solid #d9cfc7', fontSize: '0.85rem', boxSizing: 'border-box', backgroundColor: '#ffffff' }}
            >
              <option value="Weekdays (Mon, Tue, Wed, Thur)">Weekdays (Mon, Tue, Wed, Thur)</option>
              <option value="Weekends (Sat, Sun Intensive)">Weekends (Sat, Sun Intensive)</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.65rem 1.25rem',
              backgroundColor: '#1c1917',
              color: '#ffffff',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <Save size={15} />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
