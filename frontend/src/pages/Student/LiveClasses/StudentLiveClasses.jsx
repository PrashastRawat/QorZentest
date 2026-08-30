import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Calendar,
  Clock,
  ExternalLink,
  PlayCircle,
  Sparkles
} from 'lucide-react';
import { getLiveClasses } from '../../../api/studentApi';

const statusStyles = {
  Live: { bg: '#fee2e2', color: '#dc2626' },
  Upcoming: { bg: '#efe9e3', color: '#44403c' },
  Ended: { bg: '#efe9e3', color: '#78716c' },
  Recorded: { bg: '#efe9e3', color: '#44403c' },
};

const StudentLiveClasses = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        setLoading(true);
        const res = await getLiveClasses();
        setLiveClasses(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load live classes');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveClasses();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#78716c' }}>Loading live classes...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#991b1b' }}>Something went wrong: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Interactive Sessions</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
          Live Classes & Recordings
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Join real-time instructor-led sessions for the courses and trainings you're enrolled in.
        </p>
      </div>

      {liveClasses.length === 0 && (
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          No live classes have been scheduled yet for your courses or trainings.
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
        {liveClasses.map((item, idx) => {
          const style = statusStyles[item.status] || statusStyles.Upcoming;
          const canJoin = item.status === 'Live' || item.status === 'Upcoming';
          const scheduled = new Date(item.scheduledAt);

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              style={{
                backgroundColor: '#ffffff',
                border: '0.0625rem solid #d9cfc7',
                borderRadius: '0.875rem',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 0.125rem 0.375rem rgba(28, 25, 23, 0.04)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: style.bg,
                      color: style.color
                    }}
                  >
                    {item.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#78716c', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={13} />
                    {item.durationMinutes} min
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#78716c', margin: 0 }}>
                  {item.itemType === 'course' ? 'Course' : 'Training'}: <strong>{item.itemTitle}</strong>
                </p>
              </div>

              <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#f9f8f6', borderRadius: '0.5rem', border: '0.0625rem solid #efe9e3', fontSize: '0.75rem', color: '#44403c', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} color="#8b7050" />
                <span>{scheduled.toLocaleString()}</span>
              </div>

              <div style={{ paddingTop: '0.5rem', borderTop: '0.0625rem solid #efe9e3' }}>
                {canJoin ? (
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      backgroundColor: '#1c1917',
                      color: '#ffffff',
                      borderRadius: '0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      textDecoration: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <Video size={15} />
                    <span>{item.status === 'Live' ? 'Join Live Session' : 'Join When Live'}</span>
                    <ExternalLink size={13} />
                  </a>
                ) : item.recordingUrl ? (
                  <a
                    href={item.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      backgroundColor: '#efe9e3',
                      color: '#1c1917',
                      borderRadius: '0.5rem',
                      border: '0.0625rem solid #d9cfc7',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      textDecoration: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <PlayCircle size={15} color="#8b7050" />
                    <span>Watch Recording</span>
                  </a>
                ) : (
                  <p style={{ fontSize: '0.78rem', color: '#a8a29e', textAlign: 'center', margin: 0 }}>
                    Session ended — no recording available
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentLiveClasses;