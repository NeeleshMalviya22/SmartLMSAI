import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getAuth, saveAuth } from "../utils/authStorage";
import type { AuthData, Role, User } from "../types/types";

interface AuthContextValue {
  user: User | null;
  role: Role | null;
  loading: boolean;
  isTrainer: () => boolean;
  isLearner: () => boolean;
  loginMock: (role: Role) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mockUsers: Record<Role, AuthData> = {
  admin: { id: 1, name: "John Trainer", role: "admin", token: "mock-admin-token" },
  learner: { id: 2, name: "Jane Learner", role: "learner", token: "mock-learner-token" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const data = await getAuth();
      if (data) {
        const roleLower = data.role?.toLowerCase();
        const mappedRole: Role | null =
          roleLower === "learner"
            ? "learner"
            : roleLower === "trainer" || roleLower === "admin"
            ? "admin"
            : null;

        if (mappedRole) {
          setUser({ id: data.id, name: data.name, role: mappedRole, email: data.email });
          setRole(mappedRole);
        } else {
          setUser(null);
          setRole(null);
          await clearAuth();
        }
      }
      setLoading(false);
    };

    void loadUser();
  }, []);

  const loginMock = React.useCallback(async (loginRole: Role) => {
    const auth = mockUsers[loginRole];
    await saveAuth(auth);
    setUser({ id: auth.id, name: auth.name, role: auth.role, email: auth.email });
    setRole(auth.role);
    navigate("/");
  }, [navigate]);

  const logout = React.useCallback(async () => {
    await clearAuth();
    setUser(null);
    setRole(null);
    navigate("/login");
  }, [navigate]);

  const isTrainer = React.useCallback(() => role === "admin", [role]);
  const isLearner = React.useCallback(() => role === "learner", [role]);

  const value = useMemo(
    () => ({ user, role, loading, isTrainer, isLearner, loginMock, logout }),
    [user, role, loading, isTrainer, isLearner, loginMock, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
