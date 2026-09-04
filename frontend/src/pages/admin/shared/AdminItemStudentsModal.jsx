import React, { useState, useEffect } from 'react';
import { X, Loader2, Award, User } from 'lucide-react';
import { getManageStudentsDirectory, issueCertificate } from '../../../api/adminApi';

const CERT_COLORS = {
  issued: { bg: '#dcfce7', text: '#166534' },
  eligible: { bg: '#fef3c7', text: '#92400e' },
  in_progress: { bg: '#e5e7eb', text: '#374151' },
};

/**
 * "Students" bigger window — shows every student enrolled in ONE specific
 * course/training/internship. Pulls the existing admin directory endpoint
 * (which already has every student's programs[]) and filters to this item,
 * instead of adding a new backend endpoint.
 */
export default function AdminItemStudentsModal({ item, itemType, onClose }) {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // opens the per-student card

  useEffect(() => {
    fetchDirectory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const fetchDirectory = async () => {
    try {
      setLoading(true);
      const res = await getManageStudentsDirectory();
      const directory = res.data?.data || [];
      const itemId = item._id || item.id;
      const matched = directory
        .map((student) => {
          const program = student.programs.find(
            (p) => p.type === itemType && String(p.id) === String(itemId)
          );
          return program ? { ...student, program } : null;
        })
        .filter(Boolean);
      setStudents(matched);
    } catch (err) {
      console.error('Failed to load enrolled students', err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', zIndex: 100000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem',
          width: '100%', maxWidth: '50rem', maxHeight: '85vh', overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
            Enrolled Students — {item.title} ({students.length})
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <Loader2 className="animate-spin" />
          </div>
        ) : students.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#78716c' }}>No students enrolled yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {students.map((s) => (
              <button
                key={s.studentId}
                type="button"
                onClick={() => setSelectedStudent(s)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  border: '1px solid #d9cfc7', borderRadius: '0.75rem', padding: '0.75rem 0.9rem',
                  background: '#fff', cursor: 'pointer', textAlign: 'left', width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <User size={18} color="#8b7050" />
                  <div>
                    <strong style={{ fontSize: '0.88rem' }}>{s.name}</strong>
                    <p style={{ fontSize: '0.75rem', color: '#78716c', margin: 0 }}>{s.email}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{s.program.progress || 0}%</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedStudent && (
        <StudentCard student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}

function StudentCard({ student, onClose }) {
  const [cert, setCert] = useState(student.program.certificateStatus);
  const [issuing, setIssuing] = useState(false);
  const certStyle = cert ? CERT_COLORS[cert] || CERT_COLORS.in_progress : null;

  const handleGrantCertificate = async () => {
    setIssuing(true);
    try {
      await issueCertificate(student.studentId, student.program.id);
      setCert('issued');
    } catch (err) {
      alert(`Error issuing certificate: ${err.response?.data?.message || err.message}`);
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', zIndex: 100001
      }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem', width: '100%', maxWidth: '24rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>{student.name}</h4>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#78716c', margin: '0.2rem 0' }}>{student.email}</p>
        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>
          <strong>Progress:</strong> {student.program.progress || 0}%
        </p>
        {student.program.assignmentsTotal !== null && (
          <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>
            <strong>Assignments:</strong> {student.program.assignmentsCompleted}/{student.program.assignmentsTotal}
          </p>
        )}
        {student.program.attendancePercent !== null && (
          <p style={{ fontSize: '0.8rem', margin: '0.5rem 0' }}>
            <strong>Attendance:</strong> {student.program.attendancePercent}%
          </p>
        )}

        {cert && (
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
              backgroundColor: certStyle.bg, color: certStyle.text, marginTop: '0.4rem'
            }}
          >
            <Award size={12} />
            {cert === 'in_progress' ? 'In Progress' : cert === 'eligible' ? 'Eligible' : 'Issued'}
          </span>
        )}

        <div style={{ marginTop: '1rem' }}>
          <button
            type="button"
            onClick={handleGrantCertificate}
            disabled={cert !== 'eligible' || issuing}
            className="btn-purple-gradient"
            style={{ width: '100%', justifyContent: 'center', opacity: cert === 'eligible' ? 1 : 0.5 }}
          >
            {issuing ? <Loader2 size={16} className="animate-spin" /> : <Award size={16} />}
            <span>{cert === 'issued' ? 'Certificate Issued' : 'Grant Certificate'}</span>
          </button>
          {cert === null && (
            <p style={{ fontSize: '0.7rem', color: '#78716c', marginTop: '0.4rem' }}>
              Certificates aren't tracked for {student.program.type} yet — course only, currently.
            </p>
          )}
          {cert === 'in_progress' && (
            <p style={{ fontSize: '0.7rem', color: '#78716c', marginTop: '0.4rem' }}>
              Not eligible yet — needs 100% progress and all assignments completed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}