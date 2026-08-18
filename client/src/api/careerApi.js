import api from "./axiosInstance";

export const getCareers = () => api.get("/careers");
export const getCareer = (id) => api.get(`/careers/${id}`);
export const createCareer = (data) => api.post("/careers", data);
export const updateCareer = (id, data) => api.put(`/careers/${id}`, data);
export const deleteCareer = (id) => api.delete(`/careers/${id}`);