import apiClient from "../apiClient";

export const getLearnersApi = async (params?: any) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params || {}).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );

  const res = await apiClient.get("modules", { params: cleanedParams });
  return res.data;
};
