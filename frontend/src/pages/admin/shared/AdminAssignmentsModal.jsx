import React, { useState, useEffect } from 'react';
import { X, UploadCloud, FileText, Loader2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import {
  getCourseAssignments,
  createAssignment,
  deleteAssignment,
  getAssignmentSubmissions,
  gradeSubmission,
} from '../../../api/adminApi';

export default function AdminAssignmentsModal({ course, onClose }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', maxMarks: 100 });
  const [briefFile, setBriefFile] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [submissionsByAssignment, setSubmissionsByAssignment] = useState({});
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [gradeDrafts, setGradeDrafts] = useState({});

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await getCourseAssignments(course._id);
      setAssignments(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load assignments', err);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.dueDate) {
      alert('Title, description, and due date are required.');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('description', formData.description);
      fd.append('dueDate', formData.dueDate);
      fd.append('maxMarks', formData.maxMarks || 100);
      if (briefFile) fd.append('brief', briefFile);
      await createAssignment(course._id, fd);
      setFormData({ title: '', description: '', dueDate: '', maxMarks: 100 });
      setBriefFile(null);
      fetchAssignments();
    } catch (err) {
      alert(`Error creating assignment: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this assignment? Blocked if students have already submitted.')) return;
    try {
      await deleteAssignment(id);
      fetchAssignments();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const toggleSubmissions = async (assignmentId) => {
    if (expandedId === assignmentId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(assignmentId);
    if (!submissionsByAssignment[assignmentId]) {
      setLoadingSubmissions(true);
      try {
        const res = await getAssignmentSubmissions(assignmentId);
        setSubmissionsByAssignment((prev) => ({ ...prev, [assignmentId]: res.data?.data || [] }));
      } catch (err) {
        console.error('Failed to load submissions', err);
        setSubmissionsByAssignment((prev) => ({ ...prev, [assignmentId]: [] }));
      } finally {
        setLoadingSubmissions(false);
      }
    }
  };

  const handleGradeChange = (submissionId, field, value) => {
    setGradeDrafts((prev) => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], [field]: value },
    }));
  };

  const handleSaveGrade = async (assignmentId, submissionId) => {
    const draft = gradeDrafts[submissionId];
    if (!draft?.grade) {
      alert('Enter a grade before saving.');
      return;
    }
    try {
      await gradeSubmission(submissionId, { grade: draft.grade, feedback: draft.feedback || '' });
      const res = await getAssignmentSubmissions(assignmentId);
      setSubmissionsByAssignment((prev) => ({ ...prev, [assignmentId]: res.data?.data || [] }));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
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
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Assignments — {course.title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <Loader2 className="animate-spin" />
          </div>
        ) : assignments.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#78716c' }}>No assignments yet for this course.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {assignments.map((asg) => (
              <div key={asg._id} style={{ border: '1px solid #d9cfc7', borderRadius: '0.75rem', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong>{asg.title}</strong>
                    <p style={{ fontSize: '0.78rem', color: '#78716c', margin: '0.2rem 0' }}>
                      Due: {new Date(asg.dueDate).toLocaleDateString()} · Max Marks: {asg.maxMarks}
                    </p>
                    {asg.briefUrl && (
                      <a
                        href={asg.briefUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <FileText size={13} /> View brief
                      </a>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => toggleSubmissions(asg._id)}
                      style={{ background: 'none', border: '1px solid #d9cfc7', borderRadius: '0.4rem', padding: '0.3rem 0.5rem', cursor: 'pointer', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      Submissions {expandedId === asg._id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                    <button onClick={() => handleDelete(asg._id)} style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {expandedId === asg._id && (
                  <div style={{ marginTop: '0.75rem', borderTop: '1px solid #efe9e3', paddingTop: '0.75rem' }}>
                    {loadingSubmissions && !submissionsByAssignment[asg._id] ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (submissionsByAssignment[asg._id] || []).length === 0 ? (
                      <p style={{ fontSize: '0.78rem', color: '#78716c' }}>No submissions yet.</p>
                    ) : (
                      submissionsByAssignment[asg._id].map((sub) => (
                        <div key={sub._id} style={{ padding: '0.5rem 0', borderBottom: '1px dashed #efe9e3' }}>
                          <p style={{ fontSize: '0.8rem', margin: 0 }}>
                            <strong>{sub.studentId?.userId?.name || 'Unknown student'}</strong>{' '}
                            ({sub.studentId?.userId?.email || '—'}) — status: {sub.status}
                          </p>
                          {sub.fileUrl && (
                            <a href={sub.fileUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem' }}>
                              View submission file
                            </a>
                          )}
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <input
                              type="text"
                              placeholder="Grade (e.g. 85/100)"
                              defaultValue={sub.grade || ''}
                              onChange={(e) => handleGradeChange(sub._id, 'grade', e.target.value)}
                              style={{ padding: '0.35rem', fontSize: '0.78rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem', width: '9rem' }}
                            />
                            <input
                              type="text"
                              placeholder="Feedback"
                              defaultValue={sub.feedback || ''}
                              onChange={(e) => handleGradeChange(sub._id, 'feedback', e.target.value)}
                              style={{ padding: '0.35rem', fontSize: '0.78rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem', flex: 1, minWidth: '10rem' }}
                            />
                            <button
                              onClick={() => handleSaveGrade(asg._id, sub._id)}
                              style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#1c1917', color: '#fff', border: 'none', borderRadius: '0.4rem', cursor: 'pointer' }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem' }}>+ New Assignment</h4>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
            required
            style={{ padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem' }}
          />
          <textarea
            placeholder="Description / instructions"
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            required
            style={{ padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem', fontFamily: 'inherit' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData((p) => ({ ...p, dueDate: e.target.value }))}
              required
              style={{ flex: 1, minWidth: '10rem', padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem' }}
            />
            <input
              type="number"
              placeholder="Max Marks"
              value={formData.maxMarks}
              onChange={(e) => setFormData((p) => ({ ...p, maxMarks: e.target.value }))}
              style={{ width: '8rem', padding: '0.5rem', border: '1px solid #d9cfc7', borderRadius: '0.4rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Brief file (PDF/ZIP, optional)</label>
            <input
              type="file"
              accept=".pdf,.zip"
              onChange={(e) => setBriefFile(e.target.files[0] || null)}
              style={{ display: 'block', marginTop: '0.25rem' }}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', backgroundColor: '#1c1917', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
            <span>Add Assignment</span>
          </button>
        </form>
      </div>
    </div>
  );
}