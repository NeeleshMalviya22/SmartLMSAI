
import { cleanParams } from "../utils/apiUtils";
import apiClient from "./apiClient";

export const createCrudService = (endpoint: string) => ({
  getList: async (params?: any) => {
    const res = await apiClient.get(endpoint, {
      params: cleanParams(params),
    });
    return res.data;
  },

  getAll: async () => {
    const res = await apiClient.get(`${endpoint}/all`);
    return res.data;
  },

  create: async (data: any) => {
    const res = await apiClient.post(endpoint, data);
    return res.data;
  },

  update: async (id: string, data: any) => {
    const res = await apiClient.put(`${endpoint}/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await apiClient.delete(`${endpoint}/${id}`);
    return res.data;
  },

  
});

