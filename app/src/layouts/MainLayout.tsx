import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {Home, BookOpen, MessageCircle, LogOut, LayoutDashboard, ClipboardList} from "lucide-react";
import { getRole, clearAuth } from "../utils/authStorage";
import { useEffect, useState } from "react";


export default function MainLayout() {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadRole = async () => {
      const r = await getRole();
      setRole(r);
    };

    loadRole();
  }, []);

  const logout = async () => {
    await clearAuth();
    navigate("/login");
  };

  const menuItem = (path: string, label: string, Icon: any) => {
    const active = location.pathname === path;

    return (
      <div
        onClick={() => navigate(path)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
          active
            ? "bg-white text-blue-700 font-semibold"
            : "text-blue-100 hover:bg-blue-600"
        }`}
      >
        <Icon size={18} />
        {label}
      </div>
    );
  };

  if (!role) return null; // wait until role loads

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-5 flex flex-col">

        <h2 className="text-xl font-bold mb-8 px-3">
          Smart LMS
        </h2>

        <div className="space-y-2 flex-1">

          {role === "ADMIN" ? (
            <>
              {menuItem("/", "Dashboard", LayoutDashboard)}
              {menuItem("/admin/courses", "Courses", BookOpen)}
              {menuItem("/admin/quizzes", "Quizzes", ClipboardList)}
              {menuItem("/admin/progress", "User Progress", ClipboardList)}
            </>
          ) : (
            <>
              {menuItem("/", "Dashboard", Home)}
              {menuItem("/learner/courses", "My Courses", BookOpen)}
              {menuItem("/learner/ask", "Ask AI", MessageCircle)}
            </>
          )}

        </div>

        <div
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer bg-red-500 hover:bg-red-600 transition-all"
        >
          <LogOut size={18} />
          Logout
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  );
}
