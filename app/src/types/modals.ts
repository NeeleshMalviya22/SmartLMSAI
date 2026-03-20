import type { Course, Module } from "./types";
import type {
  LearnerFormValues,
  ModuleFormValues,
  QuestionFormValues,
  QuizFormValues,
  DocumentFormValues,
} from "./form-types";
import type { BaseModalProps } from "./common-modal";

// Course Modal
export interface CreateCourseModalProps extends BaseModalProps<Partial<Course>> {}

// Learner Modal
export interface CreateLearnerModalProps extends BaseModalProps<LearnerFormValues> {
  courses?: Course[];
}

// Module Modal
export interface CreateModuleModalProps extends BaseModalProps<ModuleFormValues> {
  courses: Course[];
}

// Question Modal
export interface CreateQuestionModalProps extends BaseModalProps<QuestionFormValues> {
  quizId: number;
}

// Quiz Modal
export interface CreateQuizModalProps extends BaseModalProps<QuizFormValues> {
  modules?: Module[];
}

// Document Modal
export interface CreateDocumentModalProps extends BaseModalProps<DocumentFormValues> {
  modules?: Module[];
}

