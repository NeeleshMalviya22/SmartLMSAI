import apiClient from "../apiClient";

export const getModulesApi = async (courseId: string) => {
  const res = await apiClient.get(`modules/course/${courseId}`);
  return res.data;
};

export const createModuleApi = async (data: any) => {
  const res = await apiClient.post("modules", data);
  return res.data;
};

export const updateModuleApi = async (id: string, data: any) => {
  await apiClient.put(`modules/${id}`, data);
};

export const deleteModuleApi = async (id: string) => {
  await apiClient.delete(`modules/${id}`);
};