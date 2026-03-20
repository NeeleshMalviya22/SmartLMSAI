import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL || "https://localhost:7293/api"}/auth`;

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export const registerApi = async (form: RegisterForm) => {
  const payload = {
    fullName: form.name,
    email: form.email,
    password: form.password,
    role: "Learner",
  };

  return axios.post(`${API_URL}/register`, payload);
};

export const loginApi = async (form: LoginForm) => {
  return axios.post(`${API_URL}/login`, form);
};
