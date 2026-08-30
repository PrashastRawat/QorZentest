import api from './axiosInstance';

// GET /api/services is a public route (no auth required)
export const getPublicServices = () => api.get('/services');

// GET /api/services/:id is a public route — accepts either a slug or a Mongo _id
export const getServiceBySlug = (slug) => api.get(`/services/${slug}`);
