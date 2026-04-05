import apiClient from "../apiClient";

export interface AskCourseRequest {
  courseId: string;
  question: string;
}

export interface AskCourseResponse {
  answer: string;
  excerpt?: string;
  sourceDocument?: string;
}

interface ApiWrapped<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const askCourseApi = async (
  request: AskCourseRequest
): Promise<ApiWrapped<AskCourseResponse>> => {
  const res = await apiClient.post<ApiWrapped<AskCourseResponse>>(
    "ask-course",
    request
  );
  return res.data;
};
