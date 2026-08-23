import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCheck2,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  FileText,
  Sparkles
} from 'lucide-react';
import { mockAssignments } from '../../../data/studentMockData';

const StudentAssignments = () => {
  const [assignmentsList, setAssignmentsList] = useState(mockAssignments);
  const [activeSubmitModal, setActiveSubmitModal] = useState(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOpenSubmit = (asg) => {
    setActiveSubmitModal(asg);
    setSubmissionLink('');
    setSubmissionNotes('');
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setAssignmentsList((prev) =>
        prev.map((item) =>
          item.id === activeSubmitModal.id
            ? { ...item, status: 'Submitted', grade: 'Under Mentor Review' }
            : item
        )
      );
      setSubmitting(false);
      setActiveSubmitModal(null);
    }, 600);
  };

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

      {/* Assignment List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {assignmentsList.map((asg) => (
          <div
            key={asg.id}
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
                    backgroundColor: asg.status === 'Submitted' ? '#dcfce7' : '#fee2e2',
                    color: asg.status === 'Submitted' ? '#166534' : '#991b1b'
                  }}
                >
                  {asg.status}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#78716c' }}>
                  {asg.marks}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#44403c', lineHeight: 1.45, margin: 0 }}>
              {asg.description}
            </p>

            {asg.feedback && (
              <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#f0fdf4', border: '0.0625rem solid #bbf7d0', borderRadius: '0.5rem', fontSize: '0.78rem', color: '#166534' }}>
                <strong>Mentor Feedback:</strong> {asg.feedback} (Score: {asg.grade})
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '0.0625rem solid #efe9e3', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#78716c', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={13} />
                Due Date: <strong>{asg.dueDate}</strong>
              </span>

              {asg.status === 'Pending' ? (
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
                  <span>Submitted Successfully</span>
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
                    GitHub Repository / Project Demo URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/username/project-repo"
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.5rem',
                      border: '0.0625rem solid #d9cfc7',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1c1917', display: 'block', marginBottom: '0.25rem' }}>
                    Student Notes / Implementation Summary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any instructions or test credentials for the mentor reviewer..."
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.5rem',
                      border: '0.0625rem solid #d9cfc7',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit'
                    }}
                  />
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
                    style={{ padding: '0.55rem 1.15rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#1c1917', color: '#ffffff', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                  >
                    {submitting ? 'Submitting Code...' : 'Confirm Submission'}
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
