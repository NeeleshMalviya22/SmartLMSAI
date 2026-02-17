import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import RoleBasedDashboard from "../utils/RoleBasedDashboard";
import CourseManagement from "../pages/Admin/CourseManagement";
import QuizManagement from "../pages/Admin/QuizManagement";
import UserProgress from "../pages/Admin/UserProgress";
import MyCourses from "../pages/Learner/MyCourses";
import AskYourCourse from "../pages/Learner/AskYourCourse";
import CourseViewer from "../pages/Learner/CourseViewer";
import QuizAttempt from "../pages/Learner/QuizAttempt";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={ <RoleBasedDashboard />}/>

        {/* ADMIN ROUTES */}
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/quizzes" element={<QuizManagement />} />
        <Route path="/admin/progress" element={<UserProgress />} />

        {/* LEARNER ROUTES */}
        <Route path="/learner/courses" element={<MyCourses />} />
        <Route path="/learner/ask" element={<AskYourCourse />} />
        <Route path="/learner/view/:id" element={<CourseViewer />} />
        <Route path="/learner/quiz/:id" element={<QuizAttempt />} />

      </Route>

    </Routes>
  );
}
