import api from "./axiosInstance";

export const submitContact = (data) => api.post("/contacts", data);
export const getSubmissions = () => api.get("/contacts");
export const deleteSubmission = (id) => api.delete(`/contacts/${id}`);
