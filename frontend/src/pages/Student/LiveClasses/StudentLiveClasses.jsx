import React from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Calendar,
  Clock,
  ExternalLink,
  PlayCircle,
  Users,
  Sparkles
} from 'lucide-react';
import { mockLiveClasses } from '../../../data/studentMockData';

const StudentLiveClasses = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Interactive Sessions</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
          Live Classes & Recordings
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Join real-time instructor-led masterclasses, live doubt sessions, and access past class archives.
        </p>
      </div>

      {/* Grid of Live Sessions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
        {mockLiveClasses.map((item, idx) => {
          const isRecorded = item.status === 'Recorded';

          return (
            <motion.div
              key={item.id}
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
                      backgroundColor: isRecorded ? '#efe9e3' : '#fee2e2',
                      color: isRecorded ? '#44403c' : '#dc2626'
                    }}
                  >
                    {item.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#78716c', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={13} />
                    {item.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#78716c', margin: 0 }}>
                  Instructor: <strong>{item.instructor}</strong> • {item.batch}
                </p>
              </div>

              <div style={{ padding: '0.65rem 0.85rem', backgroundColor: '#f9f8f6', borderRadius: '0.5rem', border: '0.0625rem solid #efe9e3', fontSize: '0.75rem', color: '#44403c', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} color="#8b7050" />
                <span>{item.date}</span>
              </div>

              <div style={{ paddingTop: '0.5rem', borderTop: '0.0625rem solid #efe9e3' }}>
                {!isRecorded ? (
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
                    <span>Join Live Session</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <button
                    onClick={() => alert('Opening recorded classroom session player...')}
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
                      cursor: 'pointer'
                    }}
                  >
                    <PlayCircle size={15} color="#8b7050" />
                    <span>Watch Recording</span>
                  </button>
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
