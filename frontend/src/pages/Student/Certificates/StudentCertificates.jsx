import React, { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { getCertificates } from '../../../api/studentApi';

const StudentCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const res = await getCertificates();
        setCertificates(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load certificates');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#78716c' }}>Loading your certificates...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#991b1b' }}>Something went wrong: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Accredited Credentials</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
          Earned Certifications
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Certificates of completion issued to you, with verification identifiers.
        </p>
      </div>

      {certificates.length === 0 && (
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          No certificates have been issued to you yet. They'll appear here once one is issued for a completed course.
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
        {certificates.map((cert, idx) => (
          <div
            key={cert.credentialId || idx}
            style={{
              backgroundColor: '#ffffff',
              border: '0.0625rem solid #d9cfc7',
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
              boxShadow: '0 0.125rem 0.5rem rgba(28, 25, 23, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.25rem 0.65rem',
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  borderRadius: '0.375rem'
                }}
              >
                <ShieldCheck size={14} />
                <span>Verified Credential</span>
              </span>

              <span style={{ fontSize: '0.75rem', color: '#78716c' }}>
                {cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString() : '—'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917', lineHeight: 1.3, margin: 0 }}>
              {cert.courseId?.title || 'Course Certificate'}
            </h3>

            <div style={{ padding: '0.75rem', backgroundColor: '#f9f8f6', borderRadius: '0.5rem', border: '0.0625rem solid #efe9e3', fontSize: '0.75rem' }}>
              <span style={{ color: '#78716c', display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Credential ID
              </span>
              <code style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1c1917' }}>
                {cert.credentialId}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCertificates;