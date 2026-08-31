import api from './axiosInstance';

// GET /api/courses is a public route (no auth required)
export const getPublicCourses = () => api.get('/courses');

// GET /api/trainings is a public route (no auth required)
export const getPublicTrainings = () => api.get('/trainings');

// GET /api/categories?scope=course|training is a public route (no auth
// required) — returns categories in admin-configured order, with trending
// flags, for the public CourseCategoryBrowser tab bar.
export const getPublicCategories = (scope) =>
  api.get('/categories', { params: { scope } });