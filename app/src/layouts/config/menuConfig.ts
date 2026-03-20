import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  ClipboardList,
  Settings,
  Layers
} from "lucide-react";
import type { MenuItem } from "../../types/types";
import { ROUTE_PATHS } from "../../app/routes.config";

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: ROUTE_PATHS.HOME,
    icon: LayoutDashboard,
    roles: ["admin", "learner"],
    section: "overview"
  },
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
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
    roles: ["admin"],
    section: "settings"
  }
];
