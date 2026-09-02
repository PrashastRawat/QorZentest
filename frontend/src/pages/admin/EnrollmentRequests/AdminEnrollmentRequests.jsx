import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, CheckCircle2, XCircle, Clock, Upload, Sparkles, Trash2 } from 'lucide-react';
import {
  getEnrollmentRequests,
  confirmEnrollmentRequest,
  rejectEnrollmentRequest,
  deleteEnrollmentRequest
} from '../../../api/adminApi';
import '../shared/AdminCrudPage.css';

const STATUS_TABS = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'rejected', label: 'Rejected' }
];

const STATUS_STYLES = {
  pending: { bg: '#fef3c7', color: '#92400e', icon: Clock },
  confirmed: { bg: '#dcfce7', color: '#166534', icon: CheckCircle2 },
  rejected: { bg: '#fee2e2', color: '#991b1b', icon: XCircle }
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const Icon = style.icon;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.25rem 0.6rem',
        borderRadius: 'var(--radius-full, 999px)',
        fontSize: '0.72rem',
        fontWeight: 700,
        textTransform: 'capitalize',
        backgroundColor: style.bg,
        color: style.color,
        whiteSpace: 'nowrap'
      }}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

const th = {
  textAlign: 'left',
  padding: '0.75rem 1rem',
  fontSize: '0.72rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  color: 'var(--text-secondary, #78716c)',
  borderBottom: '0.0625rem solid var(--border-medium, #d9cfc7)',
  whiteSpace: 'nowrap'
};

const td = {
  padding: '0.85rem 1rem',
  fontSize: '0.85rem',
  color: 'var(--text-primary, #1c1917)',
  borderBottom: '0.0625rem solid var(--border-light, #efe9e3)',
  verticalAlign: 'top'
};

/**
 * Admin Enrollment Requests — table view.
 * Lists WhatsApp/Razorpay enrollment requests, lets the admin confirm
 * (optionally attaching a payment screenshot, uploaded via the backend's
 * existing Cloudinary flow) or reject a pending request.
 */
export default function AdminEnrollmentRequests() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [proofFiles, setProofFiles] = useState({}); // { [requestId]: File }
  const [expandedRow, setExpandedRow] = useState(null); // requestId showing its confirm/reject controls

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getEnrollmentRequests(statusFilter);
      const data = res.data?.data || res.data || [];
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn('[AdminEnrollmentRequests] GET failed:', err.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleFileChange = (id, file) => {
    setProofFiles((prev) => ({ ...prev, [id]: file || null }));
  };

  const handleConfirm = async (id) => {
    setSubmittingId(id);
    try {
      const file = proofFiles[id];
      let payload = {};
      if (file) {
        const fd = new FormData();
        fd.append('paymentProof', file);
        payload = fd;
      }
      await confirmEnrollmentRequest(id, payload);
      setProofFiles((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setExpandedRow(null);
      fetchRequests();
    } catch (err) {
      alert(`Error confirming request: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmittingId(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this enrollment request?')) return;
    setSubmittingId(id);
    try {
      await rejectEnrollmentRequest(id);
      fetchRequests();
    } catch (err) {
      alert(`Error rejecting request: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmittingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this enrollment request? This cannot be undone.')) return;
    setSubmittingId(id);
    try {
      await deleteEnrollmentRequest(id);
      fetchRequests();
    } catch (err) {
      alert(`Error deleting request: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmittingId(null);
    }
  };

  const totalConfirmedAmount = requests
    .filter((r) => r.status === 'confirmed')
    .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  return (
    <div className="admin-crud-container">
      {/* Header */}
      <div className="global-section-header" style={{ marginBottom: '2rem' }}>
        <div
          className="showcase-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            backgroundColor: 'var(--secondary-light)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-medium)',
            fontSize: '0.82rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'var(--text-primary)'
          }}
        >
          <Sparkles size={14} color="var(--deep-accent)" />
          <span>Payment Confirmation Queue</span>
        </div>
        <h1 className="section-title" style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0' }}>
          Enrollment Requests
        </h1>
        <p className="section-desc" style={{ color: 'var(--text-secondary)' }}>
          Confirm WhatsApp payments (with a screenshot) or reject pending enrollment requests.
        </p>
      </div>

      {/* Status Filter Tabs + running total for the current filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={statusFilter === tab.value ? 'btn-purple-gradient' : 'btn-admin-edit'}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary, #78716c)' }}>
          Confirmed total: ₹{totalConfirmedAmount.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading-spinner-box">
          <Loader2 size={26} color="#c9b59c" className="animate-spin" />
        </div>
      ) : requests.length === 0 ? (
        <div className="admin-empty-card">
          <p>No enrollment requests found{statusFilter ? ` with status "${statusFilter}"` : ''}.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', border: '0.0625rem solid var(--border-medium, #d9cfc7)', borderRadius: '0.75rem', backgroundColor: '#fff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Student</th>
                <th style={th}>Item</th>
                <th style={th}>Type</th>
                <th style={th}>Method</th>
                <th style={th}>Amount</th>
                <th style={th}>Request Code</th>
                <th style={th}>Batch</th>
                <th style={th}>Status</th>
                <th style={th}>Proof</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                const isSubmitting = submittingId === req._id;
                const selectedFile = proofFiles[req._id];
                const isExpanded = expandedRow === req._id;

                return (
                  <React.Fragment key={req._id}>
                    <tr>
                      <td style={td}>
                        {req.student?.name || 'Unknown'}
                        <br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #78716c)' }}>
                          {req.student?.email || 'no email'}
                        </span>
                      </td>
                      <td style={td}>{req.itemTitle}</td>
                      <td style={td}>{req.itemType}</td>
                      <td style={td}>{req.method}</td>
                      <td style={td}>₹{Number(req.amount).toLocaleString('en-IN')}</td>
                      <td style={td}>{req.requestCode}</td>
                      <td style={td}>{req.batchTiming || '—'}</td>
                      <td style={td}><StatusBadge status={req.status} /></td>
                      <td style={td}>
                        {req.paymentProof?.url ? (
                          <a
                            href={req.paymentProof.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--deep-accent)', textDecoration: 'underline', fontSize: '0.8rem' }}
                          >
                            View
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-secondary, #78716c)' }}>—</span>
                        )}
                      </td>
                      <td style={td}>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          {req.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => setExpandedRow(isExpanded ? null : req._id)}
                              className="btn-admin-edit"
                              style={{ whiteSpace: 'nowrap' }}
                            >
                              {isExpanded ? 'Close' : 'Review'}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDelete(req._id)}
                            disabled={isSubmitting}
                            className="btn-admin-delete"
                            style={{ whiteSpace: 'nowrap' }}
                            aria-label="Delete enrollment request"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td colSpan={10} style={{ ...td, backgroundColor: 'var(--secondary-light, #f9f8f6)' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '28rem' }}>
                            <div className="file-input-wrapper">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(req._id, e.target.files[0])}
                                disabled={isSubmitting}
                              />
                            </div>
                            {selectedFile && (
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                Selected: {selectedFile.name}
                              </p>
                            )}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                type="button"
                                onClick={() => handleConfirm(req._id)}
                                disabled={isSubmitting}
                                className="btn-purple-gradient"
                                style={{ flex: 1, justifyContent: 'center' }}
                              >
                                {isSubmitting ? (
                                  <Loader2 size={16} className="animate-spin" />
                                ) : (
                                  <Upload size={16} />
                                )}
                                <span>Confirm</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReject(req._id)}
                                disabled={isSubmitting}
                                className="btn-admin-delete"
                                style={{ flex: 1, justifyContent: 'center' }}
                              >
                                <XCircle size={14} />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}