import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * AuthState defines the structure of the authentication context.
 * It manages the current user's role, their associated school,
 * and provides a method to log out.
 */
interface AuthState {
  role: string | null;
  setRole: (role: string | null) => void;
  school: any | null;
  setSchool: (school: any | null) => void;
  logout: () => void;
}

// Default context values before initialization
const AuthContext = createContext<AuthState>({
  role: null,
  setRole: () => {},
  school: null,
  setSchool: () => {},
  logout: () => {},
});

/**
 * AuthProvider wraps the application to provide authentication state globally.
 */
export const AuthProvider = ({ children }: any) => {
  const [role, setRole] = useState<string | null>(null);
  const [school, setSchool] = useState<any | null>(null);

  // Clears the user's session data upon logout
  const logout = useCallback(() => {
    setRole(null);
    setSchool(null);
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, school, setSchool, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/** Custom hook to access the authentication context. */
export const useAuth = () => useContext(AuthContext);
