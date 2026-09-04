/**
 * ============================================================================
 * BACKEND DEVELOPER GUIDE (Hinglish Guide for Admin Panel CRUD APIs):
 * ============================================================================
 * 
 * Ye file Admin Panel ke sabhi module (Services, Projects, Courses, Blogs, 
 * Testimonials, Careers, Submissions) ke endpoints define karti hai.
 * 
 * Express backend me router banate waqt in routes ko handle karein:
 * 
 * 1. SERVICES:
 *    - GET    /api/services          -> returns array of services
 *    - POST   /api/services          -> body: { title, category, description, icon }
 *    - DELETE /api/services/:id      -> deletes service by id
 * 
 * 2. PORTFOLIO / PROJECTS:
 *    - GET    /api/projects          -> returns array of projects
 *    - POST   /api/projects          -> body: { title, client, category, metric, image, description }
 *    - DELETE /api/projects/:id      -> deletes project by id
 * 
 * 3. COURSES:
 *    - GET    /api/courses           -> returns array of courses
 *    - POST   /api/courses           -> body: { title, category, duration, price, description }
 *    - DELETE /api/courses/:id       -> deletes course by id
 * 
 * 4. BLOGS:
 *    - GET    /api/blogs             -> returns array of blogs
 *    - POST   /api/blogs             -> body: { title, category, author, date, readTime, content }
 *    - DELETE /api/blogs/:id         -> deletes blog by id
 * 
 * 5. TESTIMONIALS:
 *    - GET    /api/testimonials      -> returns array of reviews
 *    - POST   /api/testimonials      -> body: { name, role, company, quote, rating, avatar }
 *    - DELETE /api/testimonials/:id  -> deletes testimonial by id
 * 
 * 6. CAREERS / JOB OPENINGS:
 *    - GET    /api/jobs              -> returns array of jobs
 *    - POST   /api/jobs              -> body: { title, department, location, type, experience }
 *    - DELETE /api/jobs/:id          -> deletes job by id
 * 
 * 7. FORM SUBMISSIONS / LEADS:
 *    - GET    /api/submissions       -> returns contact form & enrollment leads
 *    - DELETE /api/submissions/:id   -> deletes submission lead by id
 * ============================================================================
 */

import api from './axiosInstance';

// --- Services Management ---
export const getServices = () => api.get('/services');
export const createService = (data) => api.post('/services', data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// --- Portfolio Projects ---
export const getProjects = () => api.get('/portfolio');
export const createProject = (data) => api.post('/portfolio', data);
export const deleteProject = (id) => api.delete(`/portfolio/${id}`);

// --- Courses & Internships ---
export const getCourses = () => api.get('/courses');
export const createCourse = (data) => api.post('/courses', data);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// --- Blog & Insights ---
export const getBlogs = () => api.get('/blogs');
export const createBlog = (data) => api.post('/blogs', data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// --- Testimonials & Reviews ---
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (data) => api.post('/testimonials', data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// --- Internships & Programs ---
export const getInternships = () => api.get('/internships');
export const createInternship = (data) => api.post('/internships', data);
export const updateInternship = (id, data) => api.put(`/internships/${id}`, data);
export const deleteInternship = (id) => api.delete(`/internships/${id}`);
export const getInternshipApplications = (internshipId) => api.get(`/internships/${internshipId}/applications`);
export const updateInternshipApplicationStatus = (applicationId, data) =>
	api.put(`/internships/applications/${applicationId}/status`, data);

// --- Careers & Job Openings ---
// NOTE: these used to be aliased to /internships ("backward compatibility"),
// which was wrong — Career is its own model/endpoint. Fixed to point at the
// real /careers endpoint. Kept the legacy getJobs/createJob/deleteJob names
// too since AdminCrudPage.jsx already imports them.
export const getCareers = () => api.get('/careers');
export const createCareer = (data) => api.post('/careers', data);
export const updateCareer = (id, data) => api.put(`/careers/${id}`, data);
export const deleteCareer = (id) => api.delete(`/careers/${id}`);
export const getJobs = getCareers;
export const createJob = createCareer;
export const deleteJob = deleteCareer;

// --- Contact Form & Enrollment Submissions ---
export const getSubmissions = () => api.get('/submissions');
export const deleteSubmission = (id) => api.delete(`/submissions/${id}`);

// --- Training Programs ---
export const getTrainings = () => api.get('/trainings');
export const createTraining = (data) => api.post('/trainings', data);
export const updateTraining = (id, data) => api.put(`/trainings/${id}`, data);
export const deleteTraining = (id) => api.delete(`/trainings/${id}`);

// --- Enrollment Requests ---
export const getEnrollmentRequests = (status) =>
	api.get(status ? `/enrollment-requests?status=${status}` : '/enrollment-requests');
export const confirmEnrollmentRequest = (id, data) => api.put(`/enrollment-requests/${id}/confirm`, data);
export const rejectEnrollmentRequest = (id) => api.put(`/enrollment-requests/${id}/reject`);
export const deleteEnrollmentRequest = (id) => api.delete(`/enrollment-requests/${id}`);

// --- Course Assignments (admin) ---
export const getCourseAssignments = (courseId) => api.get(`/assignments/course/${courseId}`);
export const createAssignment = (courseId, formData) => api.post(`/assignments/course/${courseId}`, formData);
export const updateAssignment = (id, formData) => api.put(`/assignments/${id}`, formData);
export const deleteAssignment = (id) => api.delete(`/assignments/${id}`);
export const getAssignmentSubmissions = (assignmentId) => api.get(`/assignments/${assignmentId}/submissions`);
export const gradeSubmission = (submissionId, data) => api.put(`/assignments/submissions/${submissionId}/grade`, data);

export const getLiveClassesForItem = (itemType, itemId) => api.get(`/live-classes/item/${itemType}/${itemId}`);
export const createLiveClass = (data) => api.post('/live-classes', data);
export const deleteLiveClass = (id) => api.delete(`/live-classes/${id}`);
export const getLiveClassRoster = (liveClassId) => api.get(`/live-classes/${liveClassId}/roster`);
export const markAttendance = (liveClassId, records) => api.put(`/live-classes/${liveClassId}/attendance`, { records });
export const getRevenueSummary = () => api.get('/enrollment-requests/stats/revenue');

// --- Manage Students Directory (admin) ---
export const getManageStudentsDirectory = () => api.get('/student/admin/directory');
export const issueCertificate = (studentId, courseId) =>
  api.put(`/student/admin/students/${studentId}/certificate`, { courseId });
// --- Category order/trending manager (admin) ---
export const getAdminCategories = (scope) => api.get('/categories', { params: { scope } });
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
export const reorderCategories = (order) => api.put('/categories/reorder', { order });