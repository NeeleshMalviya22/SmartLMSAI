import localforage from "localforage";
import type { AuthData, Role } from "../types/types";

const AUTH_KEY = "authData";

// Save login info
export const saveAuth = async (data: AuthData): Promise<void> => {
  await localforage.setItem<AuthData>(AUTH_KEY, data);
};

// Get login info
export const getAuth = async (): Promise<AuthData | null> => {
  return await localforage.getItem<AuthData>(AUTH_KEY);
};

// Get only token
export const getToken = async (): Promise<string | null> => {
  const auth = await getAuth();
  return auth?.token ?? null;
};

// Normalize role string to our role enum
const normalizeRole = (role?: string | null): Role | null => {
  if (!role) return null;
  const r = role.toLowerCase();
  if (r === "trainer" || r === "admin") return "admin";
  if (r === "learner") return "learner";
  return null;
};

// Get role
export const getRole = async (): Promise<Role | null> => {
  const auth = await getAuth();
  return normalizeRole(auth?.role ?? null);
};

// Logout (clear data)
export const clearAuth = async (): Promise<void> => {
  await localforage.removeItem(AUTH_KEY);
};

export const isLoggedIn = async (): Promise<boolean> => {
  const token = await getToken();
  return !!token; 
};