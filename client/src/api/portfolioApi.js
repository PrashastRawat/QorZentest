import api from "./axiosInstance";

export const getPortfolio = () => api.get("/portfolio");
export const getPortfolioItem = (id) => api.get(`/portfolio/${id}`);
export const createPortfolioItem = (data) => api.post("/portfolio", data);
export const updatePortfolioItem = (id, data) => api.put(`/portfolio/${id}`, data);
export const deletePortfolioItem = (id) => api.delete(`/portfolio/${id}`);
