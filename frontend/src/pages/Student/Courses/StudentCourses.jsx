import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  PlayCircle,
  Clock,
  CheckCircle2,
  Tag,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { getEnrolledCourses } from '../../../api/studentApi';

const StudentCourses = () => {
  const [filter, setFilter] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await getEnrolledCourses();
        setEnrolledCourses(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#78716c' }}>Loading your courses...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#991b1b' }}>Something went wrong: {error}</div>;
  }

  // Derive a status label from progress, since we don't store a separate status field
  const getStatus = (progress) => (progress >= 100 ? 'Completed' : 'In Progress');

  const filtered = filter === 'All'
    ? enrolledCourses
    : enrolledCourses.filter((enrollment) => getStatus(enrollment.progress || 0) === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.65rem', backgroundColor: '#efe9e3', border: '0.0625rem solid #d9cfc7', borderRadius: '624.9375rem', width: 'fit-content', fontSize: '0.75rem', fontWeight: 700 }}>
          <Sparkles size={13} color="#8b7050" />
          <span>Enrolled Programs</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917' }}>My Enrolled Courses</h1>
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          Access your enrolled curriculum, track module completion, and continue learning where you left off.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['All', 'In Progress', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '624.9375rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: '0.0625rem solid #d9cfc7',
              backgroundColor: filter === status ? '#1c1917' : '#ffffff',
              color: filter === status ? '#ffffff' : '#1c1917',
              transition: 'all 0.2s ease'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          {enrolledCourses.length === 0
            ? <>You're not enrolled in any courses yet. <Link to="/courses">Browse courses</Link></>
            : 'No courses match this filter.'}
        </p>
      )}

      {/* Courses Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
        {filtered.map((enrollment, idx) => {
          const course = enrollment.courseId;
          if (!course) return null; // guard against a deleted course still referenced in enrollment

          const progress = enrollment.progress || 0;
          const totalModules = course.lessons?.length || 0;

          return (
            <motion.div
              key={course._id}
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
              {/* Thumbnail */}
              <div style={{ position: 'relative', height: '9.5rem', width: '100%' }}>
                <img
                  src={course.thumbnail?.url}
                  alt={course.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {course.category && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      padding: '0.2rem 0.6rem',
                      backgroundColor: 'rgba(28, 25, 23, 0.85)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      borderRadius: '0.375rem',
                      backdropFilter: 'blur(0.25rem)'
                    }}
                  >
                    {course.category}
                  </span>
                )}
              </div>

              {/* Body Info */}
              <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', lineHeight: 1.3 }}>
                  {course.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#78716c', margin: 0 }}>
                  Instructor: <strong>{course.instructor}</strong>
                </p>

                {/* Progress bar */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                    <span style={{ color: '#78716c' }}>
                      {totalModules} Module{totalModules !== 1 ? 's' : ''}
                    </span>
                    <span style={{ color: '#1c1917' }}>{progress}% Completed</span>
                  </div>
                  <div style={{ width: '100%', height: '0.45rem', backgroundColor: '#efe9e3', borderRadius: '624.9375rem', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#1c1917' }} />
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <div style={{ padding: '0.85rem 1.15rem', borderTop: '0.0625rem solid #efe9e3', backgroundColor: '#f9f8f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#78716c', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={13} />
                  {course.duration || '—'}
                </span>

                <Link
                  to="/learning"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    backgroundColor: '#1c1917',
                    color: '#ffffff',
                    borderRadius: '0.5rem',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textDecoration: 'none'
                  }}
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentCourses;