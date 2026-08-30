import api from './axiosInstance';

// GET /api/courses is a public route (no auth required)
export const getPublicCourses = () => api.get('/courses');

// GET /api/trainings is a public route (no auth required)
export const getPublicTrainings = () => api.get('/trainings');