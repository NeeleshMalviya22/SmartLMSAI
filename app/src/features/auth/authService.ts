import axios from "axios";

const API_URL = "https://localhost:7293/api/auth";

export const registerApi = async (form: any) => {
  const payload = {
    fullName: form.name,  
    email: form.email,
    password: form.password,
    role: "Learner"
  };

  return axios.post(`${API_URL}/register`, payload);
};

export const loginApi = async (form: any) => {
  return axios.post(`${API_URL}/login`, form);
};
