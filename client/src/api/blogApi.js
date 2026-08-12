import api from "./axiosInstance";

export const getBlogs = () => api.get("/blogs");
export const getBlog = (id) => api.get(`/blogs/${id}`);
export const createBlog = (data) => api.post("/blogs", data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
