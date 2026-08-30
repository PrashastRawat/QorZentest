import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  CheckCircle2,
  Clock,
  X,
  FileText,
  Sparkles,
  Loader2
} from 'lucide-react';
import { getAssignments, submitAssignment } from '../../../api/studentApi';

const StudentAssignments = () => {
  const [assignmentsList, setAssignmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSubmitModal, setActiveSubmitModal] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await getAssignments();
      setAssignmentsList(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSubmit = (asg) => {
    setActiveSubmitModal(asg);
    setSubmissionFile(null);
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    if (!submissionFile) {
      alert('Please choose a file (PDF or ZIP) to submit.');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('file', submissionFile);
      await submitAssignment(activeSubmitModal._id, fd);
      setActiveSubmitModal(null);
      fetchAssignments(); // re-fetch so status reflects the real backend state
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#78716c' }}>Loading your assignments...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#991b1b' }}>Something went wrong: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Practical Evaluation</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
          Assignments & Project Labs
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Submit your code repositories and practical lab tasks for direct code reviews from senior engineers.
        </p>
      </div>

      {assignmentsList.length === 0 && (
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          No assignments have been posted for your courses yet.
        </p>
      )}

      {/* Assignment List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {assignmentsList.map((asg) => (
          <div
            key={asg._id}
            style={{
              backgroundColor: '#ffffff',
              border: '0.0625rem solid #d9cfc7',
              borderRadius: '0.875rem',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              boxShadow: '0 0.125rem 0.375rem rgba(28, 25, 23, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#8b7050', textTransform: 'uppercase' }}>
                  {asg.courseName}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1c1917', marginTop: '0.15rem' }}>
                  {asg.title}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '0.375rem',
                    backgroundColor: asg.status === 'pending' ? '#fee2e2' : '#dcfce7',
                    color: asg.status === 'pending' ? '#991b1b' : '#166534',
                    textTransform: 'capitalize'
                  }}
                >
                  {asg.status}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c' }}>
                  /{asg.maxMarks}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#44403c', lineHeight: 1.45, margin: 0 }}>
              {asg.description}
            </p>

            {asg.briefUrl && (
              <a
                href={asg.briefUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.8rem', color: '#1c1917', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', width: 'fit-content' }}
              >
                <FileText size={14} />
                <span>View assignment brief</span>
              </a>
            )}

            {asg.feedback && (
              <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#f0fdf4', border: '0.0625rem solid #bbf7d0', borderRadius: '0.5rem', fontSize: '0.78rem', color: '#166534' }}>
                <strong>Mentor Feedback:</strong> {asg.feedback} {asg.grade ? `(Score: ${asg.grade})` : ''}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '0.0625rem solid #efe9e3', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#78716c', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={13} />
                Due Date: <strong>{asg.dueDate ? new Date(asg.dueDate).toLocaleDateString() : '—'}</strong>
              </span>

              {asg.status === 'pending' ? (
                <button
                  onClick={() => handleOpenSubmit(asg)}
                  style={{
                    padding: '0.45rem 0.95rem',
                    backgroundColor: '#1c1917',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <UploadCloud size={14} />
                  <span>Submit Assignment</span>
                </button>
              ) : (
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={15} />
                  <span>{asg.status === 'graded' ? 'Graded' : 'Submitted — awaiting review'}</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Assignment Modal */}
      <AnimatePresence>
        {activeSubmitModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(0.25rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              zIndex: 99999
            }}
            onClick={() => setActiveSubmitModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                backgroundColor: '#ffffff',
                border: '0.0625rem solid #d9cfc7',
                borderRadius: '1rem',
                padding: '1.5rem',
                width: '100%',
                maxWidth: '28rem'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917' }}>Submit Assignment</h3>
                <button onClick={() => setActiveSubmitModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c' }}>
                  <X size={18} />
                </button>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#78716c', marginBottom: '1rem' }}>
                <strong>{activeSubmitModal.title}</strong> ({activeSubmitModal.courseName})
              </p>

              <form onSubmit={handleConfirmSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.25rem' }}>
                    Upload File (PDF or ZIP) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.zip"
                    required
                    onChange={(e) => setSubmissionFile(e.target.files[0] || null)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: '0.0625rem solid #d9cfc7',
                      fontSize: '0.82rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  {submissionFile && (
                    <p style={{ fontSize: '0.75rem', color: '#78716c', marginTop: '0.35rem' }}>
                      Selected: {submissionFile.name}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveSubmitModal(null)}
                    style={{ padding: '0.55rem 1rem', borderRadius: '0.5rem', border: '0.0625rem solid #d9cfc7', backgroundColor: '#efe9e3', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ padding: '0.55rem 1.15rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#1c1917', color: '#ffffff', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                    <span>{submitting ? 'Uploading...' : 'Confirm Submission'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentAssignments;