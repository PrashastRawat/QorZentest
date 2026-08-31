import React, { useState, useEffect } from 'react';
import { X, Loader2, FileText } from 'lucide-react';
import { getInternshipApplications, updateInternshipApplicationStatus } from '../../../api/adminApi';

const STATUS_OPTIONS = ['pending', 'contacted', 'enrolled', 'rejected'];

const STATUS_COLORS = {
  pending: { bg: '#fef3c7', text: '#92400e' },
  contacted: { bg: '#dbeafe', text: '#1e40af' },
  enrolled: { bg: '#dcfce7', text: '#166534' },
  rejected: { bg: '#fee2e2', text: '#991b1b' },
};

export default function AdminInternshipApplicationsModal({ internship, onClose }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internship]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getInternshipApplications(internship._id);
      setApplications(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load applications', err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    setUpdatingId(applicationId);
    try {
      const res = await updateInternshipApplicationStatus(applicationId, { status });
      // Backend tells us if "enrolled" couldn't actually be synced (e.g. guest applicant)
      if (status === 'enrolled' && res.data?.syncedToStudent === false) {
        alert(
          `${res.data.message || 'Status updated, but this application has no linked student account.'}`
        );
      }
      fetchApplications();
    } catch (err) {
      alert(`Error updating status: ${err.response?.data?.message || err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 99999 }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem', width: '100%', maxWidth: '42rem', maxHeight: '85vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
            Applications — {internship.title}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Loader2 className="animate-spin" />
          </div>
        ) : applications.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#78716c' }}>No applications yet for this internship.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {applications.map((app) => {
              const colors = STATUS_COLORS[app.status] || STATUS_COLORS.pending;
              return (
                <div
                  key={app._id}
                  style={{ border: '1px solid #d9cfc7', borderRadius: '0.75rem', padding: '0.85rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div>
                      <strong>{app.name}</strong>
                      <p style={{ fontSize: '0.78rem', color: '#78716c', margin: '0.2rem 0' }}>
                        {app.email} {app.phone ? `· ${app.phone}` : ''}
                      </p>
                      <p style={{ fontSize: '0.78rem', color: '#78716c', margin: '0.2rem 0' }}>
                        {app.selectedDuration} · ₹{app.selectedPrice}
                      </p>
                      {app.cvUrl && (
                        <a
                          href={app.cvUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <FileText size={13} /> View CV
                        </a>
                      )}
                      {!app.studentId && (
                        <p style={{ fontSize: '0.72rem', color: '#b45309', marginTop: '0.3rem' }}>
                          Guest applicant — no account linked. Marking "enrolled" won't add them to Manage Students until they have an account.
                        </p>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        backgroundColor: colors.bg,
                        color: colors.text,
                        textTransform: 'capitalize',
                      }}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        disabled={updatingId === app._id || app.status === s}
                        onClick={() => handleStatusChange(app._id, s)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.3rem 0.7rem',
                          borderRadius: '0.4rem',
                          border: '1px solid #d9cfc7',
                          backgroundColor: app.status === s ? '#f5f0ea' : '#fff',
                          cursor: app.status === s ? 'default' : 'pointer',
                          textTransform: 'capitalize',
                          fontWeight: 600,
                        }}
                      >
                        {updatingId === app._id ? '...' : s}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
