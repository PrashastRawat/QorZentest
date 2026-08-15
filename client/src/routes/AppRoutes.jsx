import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "../components/layout/ProtectedRoute";

import Home from "../pages/public/Home";
import Services from "../pages/public/Services";
import ServiceDetail from "../pages/public/ServiceDetail";
import Training from "../pages/Training/Training";
import Portfolio from "../pages/public/Portfolio";
import About from "../pages/public/About";
import Blog from "../pages/public/Blog";
import BlogDetail from "../pages/public/BlogDetail";
import Career from "../pages/public/Career";
import Contact from "../pages/public/Contact";
import Signup from "../pages/public/Signup";
import Login from "../pages/public/Login";
import Courses from "../pages/public/Courses";
import CourseDetail from "../pages/public/CourseDetail";

import AdminLayout from "../components/layout/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ManageServices from "../pages/admin/ManageServices";
import ManagePortfolio from "../pages/admin/ManagePortfolio";
import ManageBlog from "../pages/admin/ManageBlog";
import ManageTestimonials from "../pages/admin/ManageTestimonials";
import Submissions from "../pages/admin/Submissions";
import ManageCareers from "../pages/admin/ManageCareers";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route
          path="/training"
          element={<Navigate to="/training/technical" replace />}
        />
        <Route path="/training/:type" element={<Training />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/services" element={<ManageServices />} />
          <Route path="/admin/portfolio" element={<ManagePortfolio />} />
          <Route path="/admin/blog" element={<ManageBlog />} />
          <Route path="/admin/testimonials" element={<ManageTestimonials />} />
          <Route path="/admin/submissions" element={<Submissions />} />
          <Route path="/admin/careers" element={<ManageCareers />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black">404</h1>
        <p className="mt-3 text-slate-500">Page not found.</p>
      </div>
    </div>
  );
}
