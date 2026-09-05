import React from 'react';
import {
  Mail,
  ShieldCheck,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import PasswordSecuritySection from '../../../components/Profile/PasswordSecuritySection';

const StudentProfile = () => {
  const { user } = useAuthContext();

  const studentName = user?.name || 'Aarav Sharma';
  const studentEmail = user?.email || 'student@qorzen.in';
  const studentPhone = user?.phone || 'Not on file';
  const studentBatch = user?.batchTiming || 'Weekdays (Mon, Tue, Wed, Thur)';
  const studentId = user?.id || 'STU-94821';
  const enrollmentCohort = user?.batch || 'Full Stack & AI Cohort 2026';

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
            Verified Student Records
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#78716c', margin: '0.2rem 0 0 0', lineHeight: 1.5 }}>
            To update your contact number, please reach out to Student Support below.
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

          {/* Phone Number Field (read-only; update via Student Support) */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.35rem' }}>
              Phone Number
            </span>
            <div style={{ padding: '0.75rem 0.95rem', borderRadius: '0.5rem', border: '0.0625rem solid #e7ded7', backgroundColor: '#faf8f5', fontSize: '0.9rem', fontWeight: 700, color: '#1c1917' }}>
              {studentPhone}
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
          {/* <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>
              Enrolled Academic Cohort
            </span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1c1917', margin: '0.15rem 0 0 0' }}>
              {enrollmentCohort}
            </h4>
          </div> */}

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

      <PasswordSecuritySection />
    </div>
  );
};

export default StudentProfile;