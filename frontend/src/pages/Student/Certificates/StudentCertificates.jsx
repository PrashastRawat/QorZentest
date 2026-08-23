import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { mockCertificates } from '../../../data/studentMockData';

const StudentCertificates = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Accredited Credentials</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
          Earned Certifications
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Industry-recognized certificates of completion with cryptographic credential verification identifiers.
        </p>
      </div>

      {/* Grid of Certificates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
        {mockCertificates.map((cert) => (
          <div
            key={cert.id}
            style={{
              backgroundColor: '#ffffff',
              border: '0.0625rem solid #d9cfc7',
              borderRadius: '1rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
              boxShadow: '0 0.125rem 0.5rem rgba(28, 25, 23, 0.05)',
              position: 'relative'
            }}
          >
            {/* Top Verified Ribbon */}
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
                {cert.issueDate}
              </span>
            </div>

            {/* Title & Info */}
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                {cert.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#78716c', margin: 0 }}>
                Issued by: <strong>{cert.issuer}</strong> • Standing: <strong>{cert.grade}</strong>
              </p>
            </div>

            {/* Credential Code Box */}
            <div style={{ padding: '0.75rem', backgroundColor: '#f9f8f6', borderRadius: '0.5rem', border: '0.0625rem solid #efe9e3', fontSize: '0.75rem' }}>
              <span style={{ color: '#78716c', display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Credential ID
              </span>
              <code style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1c1917' }}>
                {cert.credentialId}
              </code>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '0.0625rem solid #efe9e3' }}>
              <button
                onClick={() => alert(`Downloading certificate PDF for ${cert.credentialId}...`)}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  backgroundColor: '#1c1917',
                  color: '#ffffff',
                  borderRadius: '0.5rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}
              >
                <Download size={14} />
                <span>Download PDF</span>
              </button>

              <button
                onClick={() => alert(`Verification link copied to clipboard: https://verify.qorzen.in/cert/${cert.credentialId}`)}
                style={{
                  padding: '0.55rem 0.85rem',
                  backgroundColor: '#efe9e3',
                  color: '#1c1917',
                  borderRadius: '0.5rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: '0.0625rem solid #d9cfc7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}
              >
                <ExternalLink size={14} />
                <span>Verify</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCertificates;
