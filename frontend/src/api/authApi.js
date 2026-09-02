import api from './axiosInstance';

export const login = (data) => api.post('/auth/login', data);
export const adminLogin = (data) => api.post('/auth/admin/login', data);
export const signup = (data) => api.post('/auth/signup', data);
export const getMe = () => api.get('/auth/me');
export const updateProfile = (data) => api.put('/auth/profile', data);
export const logout = () => api.post('/auth/logout', {});
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (data) => api.post('/auth/reset-password', data);
export const googleAuth = (credential) => api.post('/auth/google', { credential });