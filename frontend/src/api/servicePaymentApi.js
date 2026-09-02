import api from './axiosInstance';

// All service-payment endpoints are admin-only (protected + authorize('admin')
// on the backend), so every call here relies on the JWT auto-attached by
// axiosInstance's getHeaders().

// GET /api/service-payments -> list of all recorded service project payments
export const getServicePayments = () => api.get('/service-payments');

// GET /api/service-payments/:id -> single record
export const getServicePaymentById = (id) => api.get(`/service-payments/${id}`);

// POST /api/service-payments -> record a new service project + payment
// body: { projectTitle, clientName, clientEmail, clientPhone, clientCompany,
//         notes, amount, method, status, paidAt, service? }
export const createServicePayment = (data) => api.post('/service-payments', data);

// PUT /api/service-payments/:id -> update an existing record
export const updateServicePayment = (id, data) => api.put(`/service-payments/${id}`, data);

// DELETE /api/service-payments/:id
export const deleteServicePayment = (id) => api.delete(`/service-payments/${id}`);

// GET /api/service-payments/stats/revenue -> { totalRevenue, paidCount }
// Services-only total; the combined dashboard total comes from
// adminApi.getRevenueSummary(), which already merges this stream in.
export const getServiceRevenueSummary = () => api.get('/service-payments/stats/revenue');