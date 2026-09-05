import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session state on mount / page refresh. The JWT lives in an
  // httpOnly cookie now — there's no token for JS to read, so we ask the
  // backend who's logged in via GET /auth/me (cookie sent automatically).
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const cachedUser = authService.getCurrentUser();
      if (cachedUser && isMounted) setUser(cachedUser);

      const confirmedUser = await authService.restoreSession();
      if (isMounted) {
        setUser(confirmedUser);
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Unified Sign In (Student & Admin)
   */
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await authService.login({ email, password });
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (credential) => {
    setLoading(true);
    try {
      const result = await authService.loginWithGoogle(credential);
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
    const userData = authData?.user ||
      authData || { name: "User", role: "student" };
    localStorage.setItem("qorzen_user", JSON.stringify(userData));
    setUser(userData);
  };

  /**
   * Unified Sign Out
   */
  const logout = async () => {
    await authService.logout();
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

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student" || (!isAdmin && isAuthenticated);

  // Re-asks the backend who's logged in — used after changing/setting a
  // password so `user.hasPassword` reflects reality without a full page reload.
  const refreshUser = async () => {
    const confirmedUser = await authService.restoreSession();
    setUser(confirmedUser);
    return confirmedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "student",
        loading,
        isAuthenticated,
        isAdmin,
        isStudent,
        login,
        loginWithGoogle,
        register,
        loginAdmin,
        logout,
        adminLogout,
        saveAuth,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Export default useAuth hook for direct imports
export const useAuth = useAuthContext;
export default useAuthContext;
