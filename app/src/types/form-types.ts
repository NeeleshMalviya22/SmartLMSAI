export interface LearnerFormValues {
  name: string;
  email: string;
  courseId: number;
  isActive: boolean;
}

export interface ModuleFormValues {
  courseId: number;
  title: string;
  description?: string;
  order: number;
  documents?: File[];
}

export interface QuestionOption {
  optionText: string;
  isCorrect: boolean;
  points?: number;
}

export interface QuestionFormValues {
  quizId: number;
  questionText: string;
  questionType: "MCQ" | "TRUE_FALSE";
  orderIndex: number;
  options?: QuestionOption[];
  correctAnswer?: "true" | "false";
}

export interface QuizFormValues {
  title: string;
  moduleId: number;
  passingScore: number;
  isActive: boolean;
}

export interface DocumentFormValues {
  moduleId: number;
  file: File;
}
