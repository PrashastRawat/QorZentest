import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import EnquiryForm from '../EnquiryForm/EnquiryForm';
import FloatingContact from '../FloatingContact/FloatingContact';
import EnrollmentModal from '../EnrollmentModal/EnrollmentModal';
import CourseDetailsModal from '../CourseDetailsModal/CourseDetailsModal';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  // Dynamically adapt EnquiryForm copy & backend subject tag based on current route path
  let enquiryProps = {
    badgeText: 'Instant Career Inquiry',
    title: 'Have Questions? Talk to Our Tech Experts',
    subtitle: 'Fill in your details below and our senior counselors will connect with you within 2 hours with customized guidance.',
    subjectTag: 'General Inquiry'
  };

  if (path.startsWith('/services')) {
    enquiryProps = {
      badgeText: 'Enterprise Project Consultation',
      title: 'Accelerate Your Digital Growth With QorZen',
      subtitle: 'Schedule a free architectural strategy session with our principal software engineers & Cloud AI architects.',
      subjectTag: 'B2B Enterprise Services'
    };
  } else if (path.startsWith('/training') || path.startsWith('/course')) {
    enquiryProps = {
      badgeText: 'Certified Program Enrollment',
      title: 'Reserve Your Seat in Upcoming Batches',
      subtitle: 'Get detailed syllabus breakdown, fee structures, 1-on-1 mentorship details, and hands-on lab access.',
      subjectTag: 'Course & Training Inquiry'
    };
  } else if (path.startsWith('/internship')) {
    enquiryProps = {
      badgeText: 'Practical Internship Handoff',
      title: 'Apply for Real-World Engineering Internships',
      subtitle: 'Work on live enterprise client projects, receive mentor code reviews, and earn a verified completion certificate.',
      subjectTag: 'Internship Program'
    };
  }

  // Hide EnquiryForm on Auth & Admin pages to avoid UI clutter
  const shouldHideEnquiry = path.startsWith('/auth') || 
                            path.startsWith('/signin') || 
                            path.startsWith('/signup') || 
                            path.startsWith('/login') || 
                            path.startsWith('/admin');

  return (
    <div className="app-layout-shell">
      <Navbar />
      <main className="app-main-viewport">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Dynamic Route-Aware Lead Capture Form right above Footer */}
      {!shouldHideEnquiry && <EnquiryForm {...enquiryProps} />}

      <Footer />

      {/* Global Fixed Floating WhatsApp & Phone Contact Buttons */}
      <FloatingContact />

      {/* Global Dynamic Course & Internship Enrollment Modal */}
      <EnrollmentModal />

      {/* Global Dynamic Course Details Modal */}
      <CourseDetailsModal />
    </div>
  );
};

export default Layout;
