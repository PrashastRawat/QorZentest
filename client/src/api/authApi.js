import api from "./axiosInstance";

export const login = (data) => api.post("/auth/login", data);
export const adminLogin = (data) => api.post("/auth/admin/login", data);
export const getMe = () => api.get("/auth/me");
