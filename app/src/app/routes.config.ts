import { lazy } from "react";
import type { ReactNode } from "react";
import type { Role } from "../types/types";

const CourseManagement = lazy(() => import("../pages/Admin/CourseManagement"));
const ModuleManagement = lazy(() => import("../pages/Admin/ModuleManagement"));
const QuizManagement = lazy(() => import("../pages/Admin/QuizManagement"));
const QuizQuestionsManagement = lazy(() => import("../pages/Admin/QuizQuestionsManagement"));
const LearnersManagement = lazy(() => import("../pages/Admin/LearnersManagement"));
const DocumentManagement = lazy(() => import("../pages/Admin/DocumentManagement"));
const UserProgress = lazy(() => import("../pages/Admin/UserProgress"));

const AskYourCourse = lazy(() => import("../pages/Learner/AskYourCourse"));
const CourseViewer = lazy(() => import("../pages/Learner/CourseViewer"));
const QuizAttempt = lazy(() => import("../pages/Learner/QuizAttempt"));
const LearnerCourses = lazy(() => import("../pages/Learner/MyCourses"));

export const ROUTE_PATHS = {
  // Public routes
  PUBLIC: {
    LOGIN: "/login",
    REGISTER: "/register",
  },

  // Root
  HOME: "/",

  // Admin routes
  ADMIN: {
    COURSES: "/admin/courses",
    MODULES: "/admin/module",
    QUIZZES: "/admin/quizzes",
    QUESTIONS: (quizId: string | number) => `/admin/questions/${quizId}`,
    LEARNERS: "/admin/learners",
    DOCUMENTS: "/admin/documents",
    PROGRESS: "/admin/progress",
  },

  // Learner routes
  LEARNER: {
    COURSES: "/learner/courses",
    ASK: "/learner/ask",
    VIEW_COURSE: (courseId: string | number) => `/learner/view/${courseId}`,
    QUIZ_ATTEMPT: (quizId: string | number) => `/learner/quiz/${quizId}`,
  },
} as const;

export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  role?: Role;
  label?: string;
  icon?: ReactNode;
}


export const ADMIN_ROUTES: RouteConfig[] = [
  {
    path: ROUTE_PATHS.ADMIN.COURSES,
    component: CourseManagement,
    role: "admin",
    label: "Courses",
  },
  {
    path: ROUTE_PATHS.ADMIN.MODULES,
    component: ModuleManagement,
    role: "admin",
    label: "Modules",
  },
  {
    path: ROUTE_PATHS.ADMIN.QUIZZES,
    component: QuizManagement,
    role: "admin",
    label: "Quizzes",
  },
  {
    path: ROUTE_PATHS.ADMIN.QUESTIONS(":quizId"),
    component: QuizQuestionsManagement,
    role: "admin",
    label: "Questions",
  },
  {
    path: ROUTE_PATHS.ADMIN.LEARNERS,
    component: LearnersManagement,
    role: "admin",
    label: "Learners",
  },
  {
    path: ROUTE_PATHS.ADMIN.DOCUMENTS,
    component: DocumentManagement,
    role: "admin",
    label: "Documents",
  },
  {
    path: ROUTE_PATHS.ADMIN.PROGRESS,
    component: UserProgress,
    role: "admin",
    label: "Progress",
  },
];


export const LEARNER_ROUTES: RouteConfig[] = [
  {
    path: ROUTE_PATHS.LEARNER.COURSES,
    component: LearnerCourses,
    role: "learner",
    label: "Courses",
  },
  {
    path: ROUTE_PATHS.LEARNER.ASK,
    component: AskYourCourse,
    role: "learner",
    label: "Ask Your Course",
  },
  {
    path: ROUTE_PATHS.LEARNER.VIEW_COURSE(":id"),
    component: CourseViewer,
    role: "learner",
    label: "View Course",
  },
  {
    path: ROUTE_PATHS.LEARNER.QUIZ_ATTEMPT(":id"),
    component: QuizAttempt,
    role: "learner",
    label: "Quiz Attempt",
  },
];


export const PROTECTED_ROUTES: RouteConfig[] = [
  ...ADMIN_ROUTES,
  ...LEARNER_ROUTES,
];

export function getRoutesByRole(role: Role): RouteConfig[] {
  return PROTECTED_ROUTES.filter((route) => route.role === role);
}
