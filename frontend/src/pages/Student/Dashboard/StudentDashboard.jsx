import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  PlayCircle,
  FileCheck2,
  Video,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { useAuthContext } from '../../../context/AuthContext';
import {
  mockEnrolledCourses,
  mockAssignments,
  mockLiveClasses,
  mockNotifications
} from '../../../data/studentMockData';
import './StudentDashboard.css';

/**
 * StudentDashboard Component
 * Central command hub for the student classroom portal.
 */
const StudentDashboard = () => {
  const { user } = useAuthContext();
  const primaryCourse = mockEnrolledCourses[0];
  const upcomingLive = mockLiveClasses[0];
  const pendingAssignments = mockAssignments.filter((a) => a.status === 'Pending');

  return (
    <div className="student-dash-page">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="student-welcome-banner"
      >
        <div className="welcome-info-col">
          <div className="welcome-pill">
            <Sparkles size={13} />
            <span>{user?.batch || 'QorZen Full Stack & AI Cohort 2026'}</span>
          </div>
          <h1 className="welcome-heading">
            Welcome back, {user?.name || 'Aarav'}! 👋
          </h1>
          <p className="welcome-sub">
            You are making strong progress in your curriculum. You have <strong>1 live class scheduled for today</strong> and <strong>{pendingAssignments.length} pending assignments</strong>.
          </p>
        </div>

        <div className="welcome-actions-col">
          <Link to="/learning" className="btn-resume-learning">
            <PlayCircle size={17} />
            <span>Resume Last Lesson</span>
          </Link>
        </div>
      </motion.div>

      {/* Quick Metrics Row */}
      <div className="stats-metric-grid">
        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <BookOpen size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{mockEnrolledCourses.length}</span>
            <span className="stat-lbl">Courses</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <FileCheck2 size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{user?.completedAssignments || 18}/{user?.totalAssignments || 22}</span>
            <span className="stat-lbl">Assignments</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <Award size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{user?.earnedCertificates || 2}</span>
            <span className="stat-lbl">Certificates</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <Calendar size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{user?.attendanceRate || '94%'}</span>
            <span className="stat-lbl">Attendance</span>
          </div>
        </div>
      </div>

      {/* Two Column Split */}
      <div className="dash-columns-split">
        {/* Left Column: Active Learning & Courses */}
        <div className="dash-main-col">
          {/* Active Course Resume Box */}
          <div className="dash-content-card">
            <div className="card-title-header">
              <h2 className="card-title-text">
                <PlayCircle size={18} color="#8b7050" />
                <span>Continue Learning</span>
              </h2>
              <Link to="/courses" className="card-view-all-link">
                View All Courses ({mockEnrolledCourses.length}) ➔
              </Link>
            </div>

            <div className="course-resume-item">
              <div className="course-resume-top">
                <div>
                  <h3 className="course-item-title">{primaryCourse.title}</h3>
                  <p className="course-item-meta">
                    Instructor: {primaryCourse.instructor} • {primaryCourse.category}
                  </p>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1c1917' }}>
                  {primaryCourse.progress}% Completed
                </span>
              </div>

              {/* Progress Bar */}
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${primaryCourse.progress}%` }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#78716c' }}>
                  <strong>Next Lesson:</strong> {primaryCourse.nextLesson}
                </span>
                <Link
                  to="/learning"
                  className="btn-resume-learning"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                >
                  <span>Start Lesson</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="dash-content-card">
            <div className="card-title-header">
              <h2 className="card-title-text">
                <FileCheck2 size={18} color="#8b7050" />
                <span>Assignments & Practical Labs</span>
              </h2>
              <Link to="/assignments" className="card-view-all-link">
                All Assignments ➔
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {mockAssignments.map((asg) => (
                <div key={asg.id} className="dash-assignment-item">
                  <div className="dash-assignment-info">
                    <h4 className="dash-assignment-title">
                      {asg.title}
                    </h4>
                    <span className="dash-assignment-meta">
                      {asg.courseName} • Due: <strong>{asg.dueDate}</strong>
                    </span>
                  </div>

                  <div className="dash-assignment-actions">
                    <span className={`dash-status-badge ${asg.status.toLowerCase()}`}>
                      {asg.status}
                    </span>
                    <Link to="/assignments" className="dash-view-btn">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Classes & Alerts */}
        <div className="dash-side-col">
          {/* Upcoming Live Class Box */}
          <div className="live-highlight-box">
            <div className="live-badge-row">
              <span className="live-indicator">
                <span style={{ width: '0.35rem', height: '0.35rem', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                Upcoming Live
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#854d0e' }}>
                {upcomingLive.date}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.25rem' }}>
                {upcomingLive.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#78716c', margin: 0 }}>
                Instructor: {upcomingLive.instructor} ({upcomingLive.duration})
              </p>
            </div>

            <a
              href={upcomingLive.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-join-live"
            >
              <Video size={16} />
              <span>Join Live Google Meet</span>
            </a>
          </div>

          {/* Recent Notifications Snippet */}
          <div className="dash-content-card">
            <div className="card-title-header">
              <h2 className="card-title-text">
                <AlertCircle size={18} color="#8b7050" />
                <span>Classroom Alerts</span>
              </h2>
              <Link to="/notifications" className="card-view-all-link">
                View All
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {mockNotifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: '0.65rem 0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor: notif.unread ? '#efe9e3' : '#f9f8f6',
                    border: '0.0625rem solid #d9cfc7'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                    <strong style={{ fontSize: '0.78rem', color: '#1c1917' }}>{notif.title}</strong>
                    <span style={{ fontSize: '0.68rem', color: '#78716c' }}>{notif.time}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#44403c', margin: 0, lineHeight: 1.35 }}>
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
