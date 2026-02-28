import localforage from "localforage";

const AUTH_KEY = "authData";

// Save login info
export const saveAuth = async (data: any) => {
  await localforage.setItem(AUTH_KEY, data);
};

// Get login info
export const getAuth = async () => {
  return await localforage.getItem<any>(AUTH_KEY);
};

// Get only token
export const getToken = async () => {
  const auth = await getAuth();
  return auth?.token || null;
};

// Get role
export const getRole = async () => {
  const auth = await getAuth();
  return auth?.role || null;
};

// Logout (clear data)
export const clearAuth = async () => {
  await localforage.removeItem(AUTH_KEY);
};

export const isLoggedIn = async (): Promise<boolean> => {
  const token = await getToken();
  return !!token; 
};