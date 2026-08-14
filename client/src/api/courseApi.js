import api from "./axiosInstance";

export const getCourses = () => api.get("/courses");
export const getCourse = (id) => api.get(`/courses/${id}`);
export const getMyCourses = () => api.get("/courses/my/purchased");
export const createCourse = (data) => api.post("/courses", data);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const createOrder = (id) => api.post(`/courses/${id}/create-order`);
export const verifyPayment = (id, data) => api.post(`/courses/${id}/verify-payment`, data);