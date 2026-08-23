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
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// --- Courses & Internships ---
export const getCourses = () => api.get('/courses');
export const createCourse = (data) => api.post('/courses', data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// --- Blog & Insights ---
export const getBlogs = () => api.get('/blogs');
export const createBlog = (data) => api.post('/blogs', data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// --- Testimonials & Reviews ---
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (data) => api.post('/testimonials', data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// --- Careers & Job Openings ---
export const getJobs = () => api.get('/jobs');
export const createJob = (data) => api.post('/jobs', data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

// --- Contact Form & Enrollment Submissions ---
export const getSubmissions = () => api.get('/submissions');
export const deleteSubmission = (id) => api.delete(`/submissions/${id}`);
