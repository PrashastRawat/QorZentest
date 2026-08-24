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

import { mockStudentUser } from '../data/studentMockData';
import api from '../api/axiosInstance';

const TOKEN_KEY = 'qorzen_token';
const USER_KEY = 'qorzen_user';
const REGISTERED_USERS_KEY = 'qorzen_registered_users';

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
  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === newUser.email.toLowerCase());
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
   * 
   * // BACKEND NOTE (Hinglish):
   * // Backend connect karte waqt is pure function ko replace karein:
   * // const res = await api.post('/auth/login', { email, password });
   * // localStorage.setItem(TOKEN_KEY, res.data.token);
   * // localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
   * // return res.data;
   */
  login: async ({ email, password, rememberMe = true }) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();

    if (!cleanEmail || !cleanPassword) {
      throw new Error('Please enter both email address and password.');
    }

    // 1. Admin Demo Login check
    if (
      (cleanEmail === 'admin@qorzen-technologies.in' || cleanEmail === 'admin@qorzen.in' || cleanEmail === 'admin')
    ) {
      if (cleanPassword !== 'admin123' && cleanPassword !== 'Admin@2026' && cleanPassword !== 'password123') {
        throw new Error('Invalid administrator password. Please try again.');
      }

      const adminPayload = {
        id: 'ADM-001',
        name: 'Master Administrator',
        email: cleanEmail.includes('@') ? cleanEmail : 'admin@qorzen-technologies.in',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=500&auto=format&fit=crop'
      };

      const token = `qorzen_jwt_admin_${Date.now()}`;
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, token);
      storage.setItem(USER_KEY, JSON.stringify(adminPayload));
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(adminPayload));

      return { success: true, token, user: adminPayload };
    }

    // 2. Demo Student Account
    if (cleanEmail === 'student@qorzen.in' || cleanEmail === 'aarav.sharma@student.qorzen.in') {
      if (cleanPassword !== 'student123' && cleanPassword !== 'password123') {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }

      const studentPayload = { ...mockStudentUser };
      const token = `qorzen_jwt_student_${Date.now()}`;
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(TOKEN_KEY, token);
      storage.setItem(USER_KEY, JSON.stringify(studentPayload));
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(studentPayload));

      return { success: true, token, user: studentPayload };
    }

    // 3. Registered Student Account Check
    const registeredUsers = getRegisteredUsers();
    const matchedUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!matchedUser) {
      throw new Error('Invalid email or password. Please verify your credentials or register for an account.');
    }

    if (matchedUser.password !== cleanPassword) {
      throw new Error('Invalid email or password. Please check your credentials and try again.');
    }

    const { password: _, ...safeUserPayload } = matchedUser;
    const token = `qorzen_jwt_student_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(USER_KEY, JSON.stringify(safeUserPayload));
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(safeUserPayload));

    return {
      success: true,
      token,
      user: safeUserPayload
    };
  },

  /**
   * User Registration (Sign Up)
   * 
   * // BACKEND NOTE (Hinglish):
   * // Naye user ko MongoDB me save karne ke liye POST /api/v1/auth/register call karein:
   * // const res = await api.post('/auth/register', { fullName, email, phone, password });
   * // return res.data;
   */
  register: async ({ fullName, email, phone, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const cleanEmail = email?.trim().toLowerCase();
    const cleanPassword = password?.trim();
    const cleanName = fullName?.trim();

    if (!cleanEmail || !cleanPassword || !cleanName) {
      throw new Error('Please fill in all required fields (Full Name, Email, Password).');
    }

    if (cleanPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const registeredUsers = getRegisteredUsers();
    const alreadyExists = registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail);

    if (alreadyExists || cleanEmail === 'student@qorzen.in') {
      throw new Error('An account with this email address already exists. Please Sign In instead.');
    }

    const newUserPayload = {
      ...mockStudentUser,
      id: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
      name: cleanName,
      email: cleanEmail,
      phone: phone?.trim() || '+91 98765 43210',
      role: 'student',
      password: cleanPassword,
      enrollmentDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    saveRegisteredUser(newUserPayload);

    const { password: _, ...safeUser } = newUserPayload;
    const token = `qorzen_jwt_student_${Date.now()}`;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(safeUser));

    return {
      success: true,
      token,
      user: safeUser
    };
  },

  adminLogin: async ({ email, password }) => {
    return authService.login({ email, password, rememberMe: true });
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
      const stored = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  getAuthToken: () => {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
  },

  isAuthenticated: () => {
    return !!authService.getAuthToken();
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },

  resetPassword: async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!email) throw new Error('Please enter a valid email address.');
    return { success: true, message: `Password reset instructions have been dispatched to ${email}.` };
  },

  updateProfile: async (updatedData) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const current = authService.getCurrentUser() || { ...mockStudentUser };
    const merged = { ...current, ...updatedData };

    localStorage.setItem(USER_KEY, JSON.stringify(merged));
    sessionStorage.setItem(USER_KEY, JSON.stringify(merged));

    return { success: true, user: merged };
  }
};

export default authService;
