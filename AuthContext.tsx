import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthState {
  role: string | null;
  setRole: (role: string | null) => void;
  school: any | null;
  setSchool: (school: any | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  role: null,
  setRole: () => {},
  school: null,
  setSchool: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [role, setRole] = useState<string | null>(null);
  const [school, setSchool] = useState<any | null>(null);

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

export const useAuth = () => useContext(AuthContext);