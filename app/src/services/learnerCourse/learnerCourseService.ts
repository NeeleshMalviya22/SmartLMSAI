import apiClient from "../apiClient";

export interface ModuleProgressItem {
  moduleId: string;
  title: string;
  description?: string;
  orderIndex: number;
  status: string;
  hasQuiz: boolean;
  quizId?: string;
}

export interface CourseProgress {
  courseId: string;
  courseTitle: string;
  description?: string;
  isEnrolled: boolean;
  totalModules: number;
  completedModules: number;
  progressPercent: number;
  allModulesCompleted: boolean;
  quizAvailable: boolean;
  modules: ModuleProgressItem[];
}

export interface QuizOption {
  optionId: string;
  optionText: string;
}

export interface QuizQuestion {
  questionId: string;
  questionText: string;
  questionType: string;
  orderIndex: number;
  options: QuizOption[];
}

export interface QuizData {
  quizId: string;
  title: string;
  description?: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  attemptId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  passingScore: number;
}

interface ApiWrapped<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const getLearnerCoursesApi = async (): Promise<ApiWrapped<CourseProgress[]>> => {
  const res = await apiClient.get<ApiWrapped<CourseProgress[]>>("learner/courses");
  return res.data;
};

export const getCourseDetailsApi = async (courseId: string): Promise<ApiWrapped<CourseProgress>> => {
  const res = await apiClient.get<ApiWrapped<CourseProgress>>(`learner/courses/${courseId}`);
  return res.data;
};

export const enrollCourseApi = async (courseId: string): Promise<ApiWrapped<boolean>> => {
  const res = await apiClient.post<ApiWrapped<boolean>>(`learner/enroll/${courseId}`);
  return res.data;
};

export const markModuleCompleteApi = async (moduleId: string): Promise<ApiWrapped<boolean>> => {
  const res = await apiClient.post<ApiWrapped<boolean>>(`learner/modules/${moduleId}/complete`);
  return res.data;
};

export const getQuizApi = async (quizId: string): Promise<ApiWrapped<QuizData>> => {
  const res = await apiClient.get<ApiWrapped<QuizData>>(`learner/quiz/${quizId}`);
  return res.data;
};

export const submitQuizApi = async (
  quizId: string,
  answers: { questionId: string; selectedOptionId: string }[]
): Promise<ApiWrapped<QuizResult>> => {
  const res = await apiClient.post<ApiWrapped<QuizResult>>("learner/quiz/submit", {
    quizId,
    answers,
  });
  return res.data;
};
