import api from './axiosInstance';

export const getInternships = () => api.get('/internships');
export const getInternshipById = (internshipId) => api.get(`/internships/${internshipId}`);
export const applyToInternship = (internshipId, formData) => api.post(`/internships/${internshipId}/apply`, formData);