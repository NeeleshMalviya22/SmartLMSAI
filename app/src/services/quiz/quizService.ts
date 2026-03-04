import apiClient from "../apiClient";

// ✅ get quizzes with search, pagination, sorting
export const getQuizzesApi = async (params?: any) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params || {}).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );

  const res = await apiClient.get("quizzes", { params: cleanedParams });
  return res.data;
};

// ✅ get all quizzes (optional dropdown usage)
export const getAllQuizzesApi = async () => {
  const res = await apiClient.get("quizzes/all");
  return res.data;
};

// ✅ create quiz
export const createQuizApi = async (data: any) => {
  const res = await apiClient.post("quizzes", data);
  return res.data;
};

// ✅ update quiz
export const updateQuizApi = async (id: string, data: any) => {
  const res = await apiClient.put(`quizzes/${id}`, data);
  return res.data;
};

// ✅ delete quiz
export const deleteQuizApi = async (id: string) => {
  const res = await apiClient.delete(`quizzes/${id}`);
  return res.data;
};