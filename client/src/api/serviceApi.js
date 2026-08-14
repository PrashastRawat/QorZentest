import api from "./axiosInstance";

export const getServices = () => api.get("/services");
export const getService = (id) => api.get(`/services/${id}`);
export const createService = (formData) =>
  api.post("/services", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);
