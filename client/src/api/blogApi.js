import api from "./axiosInstance";

export const getBlogs = () => api.get("/blogs");
export const getBlog = (id) => api.get(`/blogs/${id}`);
export const createBlog = (formData) =>
  api.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
