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
 * 2. AUTH MODEL: cookie-only. The backend signs a JWT and sets it as an
 *    httpOnly cookie (`qorzen_token`) — it never appears in a JSON response
 *    and is never touched by frontend JS (so it can't be read by XSS, and
 *    isn't sitting in localStorage). Every fetch from axiosInstance.js sends
 *    `credentials: 'include'` so the browser attaches the cookie automatically.
 *    Session restore on page refresh goes through GET /api/auth/me, which
 *    reads the cookie server-side and returns the current user.
 * ============================================================================
 */

import { mockStudentUser } from "../data/studentMockData";
import {
  login as apiLogin,
  googleAuth as apiGoogleAuth,
  adminLogin as apiAdminLogin,
  signup as apiSignup,
  getMe as apiGetMe,
  logout as apiLogout,
} from "../api/authApi";

// Only ever caches the (non-sensitive) user object for instant UI on
// refresh — never a token. The cookie is the actual source of auth truth;
// this cache is just optimistic display data until /me confirms it.
const USER_KEY = "qorzen_user";

const cacheUser = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // ignore storage failures (private browsing, quota, etc.)
  }
};

const clearCachedUser = () => {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const authService = {
  login: async ({ email, password }) => {
    try {
      const res = await apiLogin({ email, password });
      const user = res.data?.data?.user || res.data?.user || res.user;

      if (!user) {
        throw new Error("Invalid response from server. Please try again.");
      }

      cacheUser(user);
      return { success: true, user };
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
    const user = res.data?.data?.user;

    if (!user) {
      throw new Error("Google sign-in failed.");
    }

    cacheUser(user);
    return { success: true, user };
  },

  register: async ({ fullName, email, phone, password }) => {
    try {
      const res = await apiSignup({ fullName, email, phone, password });
      const user = res.data?.data?.user || res.data?.user || res.user;

      if (!user) {
        throw new Error("Invalid response from server. Please try again.");
      }

      cacheUser(user);
      return { success: true, user };
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
      const user = res.data?.data?.user || res.data?.user || res.user;

      if (!user) {
        throw new Error("Invalid response from server. Please try again.");
      }

      cacheUser(user);
      return { success: true, user };
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Admin login failed. Please check your credentials.",
      );
    }
  },

  logout: async () => {
    try {
      await apiLogout();
    } catch {
      // even if the network call fails, drop the local cache below
    }
    clearCachedUser();
    return { success: true };
  },

  adminLogout: async () => {
    return authService.logout();
  },

  /**
   * Asks the backend who's logged in, using the httpOnly cookie. This is
   * the real session check — call on app mount instead of trusting the
   * locally cached user.
   */
  restoreSession: async () => {
    try {
      const res = await apiGetMe();
      const user = res.data?.user || res.data?.data?.user;
      if (user) {
        cacheUser(user);
        return user;
      }
      clearCachedUser();
      return null;
    } catch {
      clearCachedUser();
      return null;
    }
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
    cacheUser(merged);
    return { success: true, user: merged };
  },
};

export default authService;