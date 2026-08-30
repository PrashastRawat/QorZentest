import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { getEnrolledTrainings } from '../../../api/studentApi';

const StudentTrainings = () => {
  const [enrolledTrainings, setEnrolledTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const res = await getEnrolledTrainings();
        setEnrolledTrainings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load trainings');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#78716c' }}>Loading your trainings...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#991b1b' }}>Something went wrong: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', width: 'fit-content', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Enrolled Trainings</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917' }}>My Trainings</h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Access your enrolled training programs and track your progress.
        </p>
      </div>

      {enrolledTrainings.length === 0 && (
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          You're not enrolled in any trainings yet. <Link to="/trainings">Browse trainings</Link>
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
        {enrolledTrainings.map((enrollment, idx) => {
          const training = enrollment.trainingId;
          if (!training) return null; // guard against a deleted training still referenced

          const progress = enrollment.progress || 0;

          return (
            <motion.div
              key={training._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              style={{
                backgroundColor: '#ffffff',
                border: '0.0625rem solid #d9cfc7',
                borderRadius: '1rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 0.125rem 0.5rem rgba(28, 25, 23, 0.05)'
              }}
            >
              <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                {training.category && (
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      padding: '0.2rem 0.6rem',
                      backgroundColor: '#efe9e3',
                      color: '#44403c',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      borderRadius: '0.375rem'
                    }}
                  >
                    {training.category}
                  </span>
                )}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', lineHeight: 1.3 }}>
                  {training.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#78716c', margin: 0 }}>
                  {training.description}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                    <span style={{ color: '#78716c' }}>{training.mode || 'Online'}</span>
                    <span style={{ color: '#1c1917' }}>{progress}% Completed</span>
                  </div>
                  <div style={{ width: '100%', height: '0.45rem', backgroundColor: '#efe9e3', borderRadius: '624.9375rem', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#1c1917' }} />
                  </div>
                </div>
              </div>

              <div style={{ padding: '0.85rem 1.15rem', borderTop: '0.0625rem solid #efe9e3', backgroundColor: '#f9f8f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#78716c', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={13} />
                  {training.duration || '—'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentTrainings;