import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  ClipboardList,
  Settings,
  Layers,
  GraduationCap,
  Bot,
  BarChart3
} from "lucide-react";
import type { MenuItem } from "../../types/types";
import { ROUTE_PATHS } from "../../app/routes.config";

export const menuItems: MenuItem[] = [
  // Shared
  {
    label: "Dashboard",
    path: ROUTE_PATHS.HOME,
    icon: LayoutDashboard,
    roles: ["admin", "learner"],
    section: "overview"
  },

  // Admin
  {
    label: "Courses",
    path: ROUTE_PATHS.ADMIN.COURSES,
    icon: BookOpen,
    roles: ["admin"],
    section: "overview"
  },
  {
    label: "Modules",
    path: ROUTE_PATHS.ADMIN.MODULES,
    icon: Layers,
    roles: ["admin"],
    section: "overview"
  },
  {
    label: "Learners",
    path: ROUTE_PATHS.ADMIN.LEARNERS,
    icon: Users,
    roles: ["admin"],
    section: "overview"
  },
  {
    label: "Documents",
    path: ROUTE_PATHS.ADMIN.DOCUMENTS,
    icon: FileText,
    roles: ["admin"],
    section: "content"
  },
  {
    label: "Quizzes",
    path: ROUTE_PATHS.ADMIN.QUIZZES,
    icon: ClipboardList,
    roles: ["admin"],
    section: "content"
  },
  {
    label: "Progress",
    path: ROUTE_PATHS.ADMIN.PROGRESS,
    icon: BarChart3,
    roles: ["admin"],
    section: "content"
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
    roles: ["admin"],
    section: "settings"
  },

  // Learner
  {
    label: "My Courses",
    path: ROUTE_PATHS.LEARNER.COURSES,
    icon: GraduationCap,
    roles: ["learner"],
    section: "overview"
  },
  {
    label: "Ask Your Course",
    path: ROUTE_PATHS.LEARNER.ASK,
    icon: Bot,
    roles: ["learner"],
    section: "content"
  },
];
