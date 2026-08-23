import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Customer Layout & Pages
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import ServiceDetail from '../pages/Services/ServiceDetail';
import AITools from '../pages/Training/AITools/AITools';
import Technical from '../pages/Training/Technical/Technical';
import NonTechnical from '../pages/Training/NonTechnical/NonTechnical';
import Networking from '../pages/Training/Networking/Networking';
import CorporateTraining from '../pages/Training/CorporateTraining/CorporateTraining';
import OnlineBusiness from '../pages/Course/OnlineBusiness/OnlineBusiness';
import InternshipsList from '../pages/Internship/InternshipsList';
import InternshipDetails from '../pages/Internship/InternshipDetails';
import AboutUs from '../pages/Resource/AboutUs/AboutUs';
import Blog from '../pages/Resource/Blog/Blog';
import News from '../pages/Resource/News/News';
import Events from '../pages/Resource/Events/Events';
import PrivacyPolicy from '../pages/Legal/DataProtectionPolicy';
import TermsAndConditions from '../pages/Legal/TermsAndConditions';

// Unified Authentication Pages
import SignIn from '../pages/Auth/SignIn/SignIn';
import SignUp from '../pages/Auth/SignUp/SignUp';

// Student Classroom Portal Setup (Mock Auth & Protected Routes)
import StudentProtectedRoute from './StudentProtectedRoute';
import StudentLayout from '../components/StudentPortal/StudentLayout';
import StudentDashboard from '../pages/Student/Dashboard/StudentDashboard';
import StudentCourses from '../pages/Student/Courses/StudentCourses';
import StudentLearning from '../pages/Student/Learning/StudentLearning';
import StudentAssignments from '../pages/Student/Assignments/StudentAssignments';
import StudentLiveClasses from '../pages/Student/LiveClasses/StudentLiveClasses';
import StudentProgress from '../pages/Student/Progress/StudentProgress';
import StudentCertificates from '../pages/Student/Certificates/StudentCertificates';
import StudentNotifications from '../pages/Student/Notifications/StudentNotifications';
import StudentProfile from '../pages/Student/Profile/StudentProfile';
// Protected Admin Control Panel Setup
import ProtectedRoute from '../components/Layout/ProtectedRoute';
import AdminLayout from '../components/Layout/AdminLayout';
import AdminLogin from '../pages/Auth/AdminLogin/AdminLogin';
import Dashboard from '../pages/admin/Dashboard';
import AdminCrudPage from '../pages/admin/shared/AdminCrudPage';
import AdminProfile from '../pages/admin/Profile/AdminProfile';
/**
 * Centralized Application Routes Architecture with Automated Subdomain Routing
 * 
 * Subdomain Detection Flow:
 * - admin.qorzen-technologies.in -> Automatically opens Admin Login / Admin Dashboard
 * - classroom.qorzen-technologies.in -> Automatically opens Student Login / Classroom Dashboard
 * - qorzen-technologies.in / localhost -> Full multi-app routing
 */
const AppRoutes = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
  const isAdminSubdomain = hostname.startsWith('admin.') || hostname === 'admin.localhost';
  const isClassroomSubdomain = hostname.startsWith('classroom.') || hostname === 'classroom.localhost';

  return (
    <Routes>
      {/* ================= AUTOMATED SUBDOMAIN ENTRYPOINTS ================= */}
      {isAdminSubdomain && (
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      )}
      {isClassroomSubdomain && (
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      )}

      {/* ================= 1. UNIFIED AUTHENTICATION (STUDENT & PUBLIC) ================= */}
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />

      {/* ================= 2. PROTECTED STUDENT CLASSROOM PORTAL ================= */}
      <Route
        element={
          <StudentProtectedRoute>
            <StudentLayout />
          </StudentProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/courses" element={<StudentCourses />} />
        <Route path="/learning" element={<StudentLearning />} />
        <Route path="/assignments" element={<StudentAssignments />} />
        <Route path="/live-classes" element={<StudentLiveClasses />} />
        <Route path="/progress" element={<StudentProgress />} />
        <Route path="/certificates" element={<StudentCertificates />} />
        <Route path="/notifications" element={<StudentNotifications />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Route>



      {/* ================= 3. STANDALONE ADMIN LOGIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ================= 4. PROTECTED ADMIN CONTROL PANEL ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="services"
          element={
            <AdminCrudPage
              title="Services"
              fields={['title', 'categoryLabel', 'tagline', 'description']}
            />
          }
        />
        <Route
          path="portfolio"
          element={
            <AdminCrudPage
              title="Portfolio Case Studies"
              fields={['title', 'client', 'category', 'description']}
            />
          }
        />
        <Route
          path="courses"
          element={
            <AdminCrudPage
              title="Courses & Programs"
              fields={['title', 'category', 'duration', 'description']}
            />
          }
        />
        <Route
          path="blog"
          element={
            <AdminCrudPage
              title="Blog Articles"
              fields={['title', 'author', 'category', 'description']}
            />
          }
        />
        <Route
          path="testimonials"
          element={
            <AdminCrudPage
              title="Client Testimonials"
              fields={['name', 'role', 'text']}
            />
          }
        />
        <Route
          path="careers"
          element={
            <AdminCrudPage
              title="Careers & Roles"
              fields={['title', 'department', 'location', 'type']}
            />
          }
        />
        <Route
          path="submissions"
          element={
            <AdminCrudPage
              title="Form Submissions"
              fields={['name', 'email', 'service', 'message']}
            />
          }
        />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* ================= 5. PUBLIC CUSTOMER LAYOUT & WEBSITE ================= */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServiceDetail />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/training/ai-tools" element={<AITools />} />
        <Route path="/training/technical" element={<Technical />} />
        <Route path="/training/non-technical" element={<NonTechnical />} />
        <Route path="/training/networking" element={<Networking />} />
        <Route path="/training/corporate-training" element={<CorporateTraining />} />
        <Route path="/course/ai-tools" element={<AITools />} />
        <Route path="/course/online-business" element={<OnlineBusiness />} />
        <Route path="/internship" element={<InternshipsList />} />
        <Route path="/internship/enroll" element={<InternshipDetails />} />
        <Route path="/internship/enroll/:id" element={<InternshipDetails />} />
        <Route path="/resource/about-us" element={<AboutUs />} />
        <Route path="/resource/blog" element={<Blog />} />
        <Route path="/resource/news" element={<News />} />
        <Route path="/resource/events" element={<Events />} />
        <Route path="/resource/*" element={<Blog />} />

        {/* Legal Policies */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        {/* Fallback Route for Public Layout */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
