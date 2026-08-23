import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session state on mount / page refresh
  useEffect(() => {
    try {
      const activeToken = authService.getAuthToken();
      const activeUser = authService.getCurrentUser();

      if (activeToken && activeUser) {
        setToken(activeToken);
        setUser(activeUser);
      }
    } catch (err) {
      console.warn('[AuthContext] Error initializing session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Unified Sign In (Student & Admin)
   */
  const login = async ({ email, password, rememberMe = true }) => {
    setLoading(true);
    try {
      const result = await authService.login({ email, password, rememberMe });
      setToken(result.token);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  /**
   * User Registration (New Student Sign Up)
   */
  const register = async (registrationData) => {
    setLoading(true);
    try {
      const result = await authService.register(registrationData);
      setToken(result.token);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Direct Admin Login (admin.qorzen-technologies.in / admin-login)
   */
  const loginAdmin = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await authService.adminLogin({ email, password });
      setToken(result.token);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Legacy Token/User Saver for Backward Compatibility
   */
  const saveAuth = (authData) => {
    const authToken = authData?.token || (typeof authData === 'string' ? authData : 'mock_token');
    const userData = authData?.user || authData || { name: 'User', role: 'student' };
    localStorage.setItem('qorzen_token', authToken);
    localStorage.setItem('qorzen_user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  /**
   * Unified Sign Out
   */
  const logout = async () => {
    await authService.logout();
    setToken(null);
    setUser(null);
  };

  const adminLogout = async () => {
    return logout();
  };

  /**
   * Update User Profile in State
   */
  const updateUser = async (updatedFields) => {
    const res = await authService.updateProfile(updatedFields);
    if (res.user) {
      setUser(res.user);
    }
    return res;
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student' || (!isAdmin && isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || 'student',
        loading,
        isAuthenticated,
        isAdmin,
        isStudent,
        login,
        register,
        loginAdmin,
        logout,
        adminLogout,
        saveAuth,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Export default useAuth hook for direct imports
export const useAuth = useAuthContext;
export default useAuthContext;
