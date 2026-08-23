import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Award,
  CheckCircle2,
  Calendar,
  BookOpen,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import { mockEnrolledCourses } from '../../../data/studentMockData';

const StudentProgress = () => {
  const { user } = useAuthContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Performance Telemetry</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917', marginTop: '0.25rem' }}>
          Learning Progress & Analytics
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Comprehensive evaluation of your module completion rate, batch attendance, and lab grades.
        </p>
      </div>

      {/* Progress Cards Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.25rem', backgroundColor: '#ffffff', border: '0.0625rem solid #d9cfc7', borderRadius: '0.875rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>Overall Attendance</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', margin: '0.25rem 0 0.5rem 0' }}>
            {user?.attendanceRate || '94%'}
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <TrendingUp size={13} /> 9% above cohort average
          </span>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: '#ffffff', border: '0.0625rem solid #d9cfc7', borderRadius: '0.875rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>Grade Point Average</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', margin: '0.25rem 0 0.5rem 0' }}>
            {user?.overallGrade || 'A+'} (94.2%)
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#78716c' }}>
            Distinction Level Standing
          </span>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: '#ffffff', border: '0.0625rem solid #d9cfc7', borderRadius: '0.875rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#78716c', textTransform: 'uppercase' }}>Completed Lab Exercises</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', margin: '0.25rem 0 0.5rem 0' }}>
            18 / 22 Labs
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#78716c' }}>
            4 remaining for certification
          </span>
        </div>
      </div>

      {/* Course-by-Course Breakdown */}
      <div style={{ backgroundColor: '#ffffff', border: '0.0625rem solid #d9cfc7', borderRadius: '1rem', padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1c1917', marginBottom: '1rem' }}>
          Enrolled Programs Progress Matrix
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockEnrolledCourses.map((c) => (
            <div
              key={c.id}
              style={{
                padding: '1rem',
                border: '0.0625rem solid #efe9e3',
                borderRadius: '0.75rem',
                backgroundColor: '#f9f8f6'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1c1917' }}>{c.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#78716c' }}>{c.instructor}</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1c1917' }}>
                  {c.progress}%
                </span>
              </div>

              <div style={{ width: '100%', height: '0.5rem', backgroundColor: '#d9cfc7', borderRadius: '624.9375rem', overflow: 'hidden' }}>
                <div style={{ width: `${c.progress}%`, height: '100%', backgroundColor: '#1c1917' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
