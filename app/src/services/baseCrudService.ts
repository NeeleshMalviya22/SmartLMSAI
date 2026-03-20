
import { cleanParams } from "../utils/apiUtils";
import apiClient from "./apiClient";

export const createCrudService = <T extends object>(
  endpoint: string,
  endpoints?: {
    list?: string;
    all?: string;
    get?: (id: string | number) => string;
    create?: string;
    update?: (id: string | number) => string;
    delete?: (id: string | number) => string;
  }
) => ({
  getList: async (params?: Record<string, unknown>) => {
    const url = endpoints?.list || endpoint;
    const res = await apiClient.get(url, {
      params: cleanParams(params),
    });
    return res.data as { items: T[]; totalCount: number };
  },

  getAll: async () => {
    const url = endpoints?.all || `${endpoint}/all`;
    const res = await apiClient.get(url);
    return res.data as T[];
  },

  create: async (data: T) => {
    const url = endpoints?.create || endpoint;
    const res = await apiClient.post(url, data);
    return res.data as T;
  },

  update: async (id: string, data: Partial<T>) => {
    const url = endpoints?.update ? endpoints.update(id) : `${endpoint}/${id}`;
    const res = await apiClient.put(url, data);
    return res.data as T;
  },

  delete: async (id: string) => {
    const url = endpoints?.delete ? endpoints.delete(id) : `${endpoint}/${id}`;
    const res = await apiClient.delete(url);
    return res.data;
  },
});

