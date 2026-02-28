import apiClient from "../apiClient";

export const getCoursesApi = async (params?: any) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params || {}).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );

  const res = await apiClient.get("courses", { params: cleanedParams });
  return res.data;
};

export const getAllCoursesApi = async () => {
  const res = await apiClient.get("courses/all");
  return res.data;
};

export const createCourseApi = async (data: any) => {
  const res = await apiClient.post("courses", data);
  return res.data;
};

export const updateCourseApi = async (id: string, data: any) => {
  const res = await apiClient.put(`courses/${id}`, data);
  return res.data;
};

export const deleteCourseApi = async (id: string) => {
  const res = await apiClient.delete(`courses/${id}`);
  return res.data;
};