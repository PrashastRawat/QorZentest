/**
 * ============================================================================
 * BACKEND DEVELOPER GUIDE (Hinglish Guide for MERN / Express Auth):
 * ============================================================================
 *
 * 1. MONGODB USER SCHEMA:
 *    User model me ye fields expect kiye ja rahe hain:
 *    - name (String, required)
 *    - email (String, unique, lowercase, required)
 *    - password (String, hashed using bcryptjs)
 *    - phone (String)
 *    - role (String, enum: ['student', 'admin'], default: 'student')
 *    - avatar (String, default URL)
 *    - enrollmentDate (Date)
 *
 * 2. ENDPOINTS TO CREATE IN NODE/EXPRESS BACKEND:
 *    - POST /api/v1/auth/login       -> { email, password } -> returns { success: true, token, user }
 *    - POST /api/v1/auth/register    -> { fullName, email, phone, password } -> returns { success: true, token, user }
 *    - GET  /api/v1/auth/me          -> verify JWT from Header -> returns { user }
 *    - POST /api/v1/auth/forgot-password -> { email } -> sends reset email/OTP
 *
 * 3. REAL BACKEND INTEGRATION:
 *    Jab Express backend ready ho jaye, mock logic ko comment karke `api.post('/auth/login', ...)` use karein.
 * ============================================================================
 */

import { mockStudentUser } from "../data/studentMockData";
import api from "../api/axiosInstance";
import {
  login as apiLogin,
  googleAuth as apiGoogleAuth,
  adminLogin as apiAdminLogin,
  signup as apiSignup,
} from "../api/authApi";

const TOKEN_KEY = "qorzen_token";
const USER_KEY = "qorzen_user";
const REGISTERED_USERS_KEY = "qorzen_registered_users";

// LocalStorage se registered users fetch karne ka helper (Mock / Offline fallback)
const getRegisteredUsers = () => {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Naya registered user local storage me save karne ka helper
const saveRegisteredUser = (newUser) => {
  const users = getRegisteredUsers();
  const existingIdx = users.findIndex(
    (u) => u.email.toLowerCase() === newUser.email.toLowerCase(),
  );
  if (existingIdx >= 0) {
    users[existingIdx] = newUser;
  } else {
    users.push(newUser);
  }
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

export const authService = {
  /**
   * User Login (Student & Admin)
   * Calls backend API at POST /api/auth/login
   */
  login: async ({ email, password, rememberMe = true }) => {
    try {
      const res = await apiLogin({ email, password });

      const token = res.data?.data?.token || res.data?.token || res.token;
      const user = res.data?.data?.user || res.data?.user || res.user;

      if (!token || !user) {
        throw new Error("Invalid response from server. Please try again.");
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, token);
      storage.setItem(USER_KEY, JSON.stringify(user));

      // Also set in localStorage for cross-tab communication
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return { success: true, token, user };
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials.",
      );
    }
  },

  loginWithGoogle: async (credential) => {
    const res = await apiGoogleAuth(credential);
    const token = res.data?.data?.token;
    const user = res.data?.data?.user;

    if (!token || !user) {
      throw new Error("Google sign-in failed.");
    }

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { success: true, token, user };
  },

  /**
   * User Registration (Sign Up)
   * Calls backend API at POST /api/auth/signup
   */
  register: async ({ fullName, email, phone, password }) => {
    try {
      const res = await apiSignup({ fullName, email, phone, password });

      const token = res.data?.data?.token || res.data?.token || res.token;
      const user = res.data?.data?.user || res.data?.user || res.user;

      if (!token || !user) {
        throw new Error("Invalid response from server. Please try again.");
      }

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return {
        success: true,
        token,
        user,
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again.",
      );
    }
  },

  adminLogin: async ({ email, password }) => {
    try {
      const res = await apiAdminLogin({ email, password });

      const token = res.data?.data?.token || res.data?.token || res.token;
      const user = res.data?.data?.user || res.data?.user || res.user;
      if (!token || !user) {
        throw new Error("Invalid response from server. Please try again.");
      }

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return { success: true, token, user };
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Admin login failed. Please check your credentials.",
      );
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    return { success: true };
  },

  adminLogout: async () => {
    return authService.logout();
  },

  getCurrentUser: () => {
    try {
      const stored =
        localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  getAuthToken: () => {
    return (
      localStorage.getItem(TOKEN_KEY) ||
      sessionStorage.getItem(TOKEN_KEY) ||
      null
    );
  },

  isAuthenticated: () => {
    return !!authService.getAuthToken();
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === "admin";
  },

  resetPassword: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!email) throw new Error("Please enter a valid email address.");
    return {
      success: true,
      message: `Password reset instructions have been dispatched to ${email}.`,
    };
  },

  updateProfile: async (updatedData) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const current = authService.getCurrentUser() || { ...mockStudentUser };
    const merged = { ...current, ...updatedData };

    localStorage.setItem(USER_KEY, JSON.stringify(merged));
    sessionStorage.setItem(USER_KEY, JSON.stringify(merged));

    return { success: true, user: merged };
  },
};

export default authService;
