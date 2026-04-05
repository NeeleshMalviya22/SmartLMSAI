import type { LucideIcon } from "lucide-react";

export type Role = "admin" | "learner";

export interface User {
  id?: number;
  name: string;
  role: Role;
  token?: string;
  email?: string;
}

export interface AuthData extends User {
  token: string;
}

export interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: Role[];
  section: "overview" | "content" | "settings";
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  isActive?: boolean;
  createdOn?: string;
}

export interface Module {
  moduleId: string;   // ✅ GUID
  title: string;
  courseId: string;   // ✅ GUID
  description?: string;
  isActive?: boolean;
  createdOn?: string;
  tittle?: string;
}

export interface DocumentItem {
  id: number;
  fileName: string;
  moduleId: string;
  moduleName?: string;
  createdOn?: string;
}

export interface Learner {
  id: number;
  name: string;
  email: string;
  courseTitle?: string;
  isActive?: boolean;
  createdOn?: string;
}

export interface Quiz {
  quizId: number;
  title: string;
  moduleTitle: string;
  passingScore: number;
}

export interface QuestionOption {
  optionId: number;
  optionText: string;
  isCorrect: boolean;
}

export interface Question {
  questionId: number;
  questionText: string;
  questionType: string;
  options?: QuestionOption[];
}
