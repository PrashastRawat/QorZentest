import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  Calendar,
} from "lucide-react";
import { useAuthContext } from "../../../context/AuthContext";
import {
  getEnrolledCourses,
  getEnrolledInternships,
  getAssignments,
  getLiveClasses,
  getNotifications,
} from "../../../api/studentApi";
import "./StudentDashboard.css";

/**
 * StudentDashboard Component
 * Central command hub for the student classroom portal.
 */
const StudentDashboard = () => {
  const { user } = useAuthContext();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledInternships, setEnrolledInternships] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [coursesRes, internshipsRes, assignmentsRes, liveRes, notifRes] =
          await Promise.all([
            getEnrolledCourses(),
            getEnrolledInternships(),
            getAssignments(),
            getLiveClasses(),
            getNotifications(),
          ]);

        setEnrolledCourses(coursesRes.data);
        setEnrolledInternships(internshipsRes.data);
        setAssignments(assignmentsRes.data);
        setLiveClasses(liveRes.data);
        setNotifications(notifRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="student-dash-page">Loading your dashboard...</div>;
  }

  if (error) {
    return (
      <div className="student-dash-page">Something went wrong: {error}</div>
    );
  }

  const primaryEnrollment = enrolledCourses[0];
  const primaryCourse = primaryEnrollment?.courseId;
  const upcomingLive = liveClasses[0];
  const pendingAssignments = assignments.filter((a) => a.status === "pending");

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
            <span>{user?.batch || "QorZen Student"}</span>
          </div>
          <h1 className="welcome-heading">
            Welcome back, {user?.name || "Student"}! 👋
          </h1>
          <p className="welcome-sub">
            You have{" "}
            <strong>
              {liveClasses.length} live class
              {liveClasses.length !== 1 ? "es" : ""} scheduled
            </strong>{" "}
            and{" "}
            <strong>
              {pendingAssignments.length} pending assignment
              {pendingAssignments.length !== 1 ? "s" : ""}
            </strong>
            .
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
            <span className="stat-val">{enrolledCourses.length}</span>
            <span className="stat-lbl">Courses</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <Award size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">{enrolledInternships.length}</span>
            <span className="stat-lbl">Internships</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <FileCheck2 size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">
              {
                assignments.filter(
                  (a) => a.status === "submitted" || a.status === "graded",
                ).length
              }
              /{assignments.length}
            </span>
            <span className="stat-lbl">Assignments</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <Award size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">0</span>
            <span className="stat-lbl">Certificates</span>
          </div>
        </div>

        <div className="stat-metric-card">
          <div className="stat-icon-wrap">
            <Calendar size={20} />
          </div>
          <div className="stat-data-col">
            <span className="stat-val">—</span>
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
                View All Courses ({enrolledCourses.length}) ➔
              </Link>
            </div>

            {primaryCourse ? (
              <div className="course-resume-item">
                <div className="course-resume-top">
                  <div>
                    <h3 className="course-item-title">{primaryCourse.title}</h3>
                    <p className="course-item-meta">
                      Instructor: {primaryCourse.instructor}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      color: "#1c1917",
                    }}
                  >
                    {primaryEnrollment.progress || 0}% Completed
                  </span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${primaryEnrollment.progress || 0}%` }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginTop: "0.25rem",
                  }}
                >
                  <Link
                    to="/learning"
                    className="btn-resume-learning"
                    style={{ padding: "0.45rem 0.85rem", fontSize: "0.78rem" }}
                  >
                    <span>Start Lesson</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <p className="dash-empty-text">
                You're not enrolled in any courses yet.{" "}
                <Link to="/courses">Browse courses</Link>
              </p>
            )}
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

            {assignments.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {assignments.map((asg) => (
                  <div key={asg._id} className="dash-assignment-item">
                    <div className="dash-assignment-info">
                      <h4 className="dash-assignment-title">{asg.title}</h4>
                      <span className="dash-assignment-meta">
                        {asg.courseName} • Due:{" "}
                        <strong>
                          {new Date(asg.dueDate).toLocaleDateString()}
                        </strong>
                      </span>
                    </div>

                    <div className="dash-assignment-actions">
                      <span className={`dash-status-badge ${asg.status}`}>
                        {asg.status}
                      </span>
                      <Link to="/assignments" className="dash-view-btn">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="dash-empty-text">No assignments yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: Live Classes & Alerts */}
        <div className="dash-side-col">
          {/* Upcoming Live Class Box */}
          {upcomingLive ? (
            <div className="live-highlight-box">
              <div className="live-badge-row">
                <span className="live-indicator">
                  <span
                    style={{
                      width: "0.35rem",
                      height: "0.35rem",
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                    }}
                  />
                  Upcoming Live
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#854d0e",
                  }}
                >
                  {upcomingLive.date}
                </span>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#1c1917",
                    marginBottom: "0.25rem",
                  }}
                >
                  {upcomingLive.title}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "#78716c", margin: 0 }}>
                  Instructor: {upcomingLive.instructor} ({upcomingLive.duration}
                  )
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
          ) : (
            <div className="dash-content-card">
              <p className="dash-empty-text">
                No live classes scheduled right now.
              </p>
            </div>
          )}

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

            {notifications.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                }}
              >
                {notifications.slice(0, 3).map((notif) => (
                  <div
                    key={notif._id}
                    style={{
                      padding: "0.65rem 0.75rem",
                      borderRadius: "0.5rem",
                      backgroundColor: notif.unread ? "#efe9e3" : "#f9f8f6",
                      border: "0.0625rem solid #d9cfc7",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.15rem",
                      }}
                    >
                      <strong style={{ fontSize: "0.78rem", color: "#1c1917" }}>
                        {notif.title}
                      </strong>
                      <span style={{ fontSize: "0.68rem", color: "#78716c" }}>
                        {notif.time}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#44403c",
                        margin: 0,
                        lineHeight: 1.35,
                      }}
                    >
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="dash-empty-text">No new alerts.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;