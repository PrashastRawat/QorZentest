import api from "./axiosInstance";

export const getPortfolio = () => api.get("/portfolio");
export const getPortfolioItem = (id) => api.get(`/portfolio/${id}`);
export const createPortfolioItem = (formData) =>
  api.post("/portfolio", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updatePortfolioItem = (id, data) => api.put(`/portfolio/${id}`, data);
export const deletePortfolioItem = (id) => api.delete(`/portfolio/${id}`);
