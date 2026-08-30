import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  PlayCircle,
  CheckCircle2,
  FileDown,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { getEnrolledCourses, getCourseLessons, markLessonCompleted } from '../../../api/studentApi';
import './StudentLearning.css';

const StudentLearning = () => {
  const [searchParams] = useSearchParams();
  const courseIdFromUrl = searchParams.get('courseId');

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null); // the Course object we're learning
  const [lessons, setLessons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marking, setMarking] = useState(false);

  // Step 1: figure out which course to load (from URL, or default to first enrolled course)
  useEffect(() => {
    const resolveCourse = async () => {
      try {
        setLoading(true);
        const res = await getEnrolledCourses();
        setEnrolledCourses(res.data);

        let courseId = courseIdFromUrl;
        let course = null;

        if (courseId) {
          const match = res.data.find((e) => e.courseId?._id === courseId);
          course = match?.courseId || null;
        }

        if (!course && res.data.length > 0) {
          course = res.data[0].courseId;
        }

        if (!course) {
          setError('You are not enrolled in any courses yet.');
          setLoading(false);
          return;
        }

        setActiveCourse(course);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your courses');
        setLoading(false);
      }
    };

    resolveCourse();
  }, [courseIdFromUrl]);

  // Step 2: once we know the course, fetch its lessons (with completion status merged in)
  useEffect(() => {
    if (!activeCourse) return;

    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await getCourseLessons(activeCourse._id);
        setLessons(res.data);
        setCurrentIndex(0);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [activeCourse]);

  const currentLesson = lessons[currentIndex];

  const handleMarkComplete = async () => {
    if (!currentLesson || currentLesson.isCompleted || marking) return;

    try {
      setMarking(true);
      await markLessonCompleted(currentLesson._id);

      // Update local state so the UI reflects completion immediately,
      // instead of re-fetching the whole lesson list again
      setLessons((prev) =>
        prev.map((l, idx) => (idx === currentIndex ? { ...l, isCompleted: true } : l))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark lesson complete');
    } finally {
      setMarking(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (loading) {
    return <div className="learning-classroom-shell">Loading your lessons...</div>;
  }

  if (error) {
    return (
      <div className="learning-classroom-shell">
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          {error} <Link to="/courses">Browse your courses</Link>
        </p>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="learning-classroom-shell">
        <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
          This course doesn't have any lessons yet.
        </p>
      </div>
    );
  }

  return (
    <div className="learning-classroom-shell">
      {/* Top Header */}
      <div className="learning-top-header">
        <div>
          <span className="learning-course-tag">
            Course: {activeCourse?.title}
          </span>
          <h1 className="learning-lesson-title">
            {currentLesson.title}
          </h1>
        </div>

        <button
          onClick={handleMarkComplete}
          disabled={currentLesson.isCompleted || marking}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.15rem',
            backgroundColor: currentLesson.isCompleted ? '#dcfce7' : '#1c1917',
            color: currentLesson.isCompleted ? '#166534' : '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: currentLesson.isCompleted ? 'default' : 'pointer',
            opacity: marking ? 0.6 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          <CheckCircle2 size={16} />
          <span>{currentLesson.isCompleted ? 'Completed' : marking ? 'Saving...' : 'Mark as Completed'}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="learning-content-grid">
        {/* Left Col: Video Player & Lesson Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Responsive 16:9 Video Box */}
          <div className="learning-video-container">
            <video
              controls
              src={currentLesson.videoUrl}
              className="learning-video-element"
            />
          </div>

          {/* Lesson Overview & Download Assets */}
          <div className="learning-details-box">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
              Lesson Overview
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#44403c', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Duration: {currentLesson.duration || 'N/A'}
            </p>

            {/* Next / Previous Lesson Controls */}
            <div className="learning-nav-controls">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="btn-lesson-nav"
              >
                <ArrowLeft size={15} />
                <span>Previous Lesson</span>
              </button>

              <span style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 600 }}>
                Lesson {currentIndex + 1} of {lessons.length}
              </span>

              <button
                onClick={handleNext}
                disabled={currentIndex === lessons.length - 1}
                className="btn-lesson-nav"
              >
                <span>Next Lesson</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Curriculum Playlist */}
        <div className="curriculum-sidebar-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
              Module Curriculum ({lessons.length})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {lessons.map((les, idx) => {
              const isSelected = currentIndex === idx;
              const isDone = les.isCompleted;

              return (
                <div
                  key={les._id}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    padding: '0.75rem 0.85rem',
                    borderRadius: '0.5rem',
                    backgroundColor: isSelected ? '#1c1917' : isDone ? '#f9f8f6' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#1c1917',
                    border: '0.0625rem solid',
                    borderColor: isSelected ? '#1c1917' : '#d9cfc7',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ marginTop: '0.15rem' }}>
                    {isDone ? (
                      <CheckCircle2 size={16} color={isSelected ? '#c9b59c' : '#16a34a'} />
                    ) : (
                      <PlayCircle size={16} color={isSelected ? '#c9b59c' : '#78716c'} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3 }}>
                      {les.title}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: isSelected ? '#d6d3d1' : '#78716c' }}>
                      {les.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLearning;