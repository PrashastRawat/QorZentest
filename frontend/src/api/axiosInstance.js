/**
 * ============================================================================
 * BACKEND DEVELOPER NOTE (Hinglish Guide):
 * ============================================================================
 * 1. Base URL: Yahan apna backend API URL set karo (.env file me VITE_API_BASE_URL="http://localhost:5000/api").
 * 2. Auth: JWT ab an httpOnly cookie (`qorzen_token`) me store hota hai, JS se
 *    kabhi accessible nahi — cookie browser khud automatically har request pe
 *    bhej deta hai jab tak `credentials: 'include'` set ho.
 * 3. CORS: Apne Express backend me `app.use(cors({ origin: 'http://localhost:5173', credentials: true }))` enable rakhein.
 * ============================================================================
 */

const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

// isFormData = true means the body is FormData (file upload) — skip Content-Type
// so the browser can set 'multipart/form-data; boundary=...' itself
const getHeaders = (customHeaders = {}, isFormData = false) => {
  return {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...customHeaders
  };
};

// Response handle karo aur backend error message frontend UI ko pass karo
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `HTTP Error ${response.status}`);
    error.response = { status: response.status, data };
    throw error;
  }
  return { data, status: response.status };
};

// Axios jaisa lightweight fetch wrapper (GET, POST, PUT, DELETE)
// credentials: 'include' -> httpOnly auth cookie auto-attach hota hai har request pe
const api = {
  get: (url, config = {}) =>
    fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      credentials: 'include',
      headers: getHeaders(config.headers)
    }).then(handleResponse),

  post: (url, body = {}, config = {}) => {
    const isFormData = body instanceof FormData;
    return fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      credentials: 'include',
      headers: getHeaders(config.headers, isFormData),
      body: isFormData ? body : JSON.stringify(body)
    }).then(handleResponse);
  },

  put: (url, body = {}, config = {}) => {
    const isFormData = body instanceof FormData;
    return fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      credentials: 'include',
      headers: getHeaders(config.headers, isFormData),
      body: isFormData ? body : JSON.stringify(body)
    }).then(handleResponse);
  },

  delete: (url, config = {}) =>
    fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: getHeaders(config.headers)
    }).then(handleResponse)
};

export default api;