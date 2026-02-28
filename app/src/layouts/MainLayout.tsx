import { Layout } from "antd";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearAuth, getRole } from "../utils/authStorage";
import logo from "../assets/image.png";

const { Sider, Content } = Layout;

export default function MainLayout() {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getRole().then(setRole);
  }, []);

  const logout = async () => {
    await clearAuth();
    navigate("/login");
  };

  if (!role) return null;

  // ✅ Custom Nav Item
  const NavItem = ({ icon: Icon, label, path, badge }: any) => {
    const active = location.pathname === path;

    return (
      <div
        onClick={() => navigate(path)}
        className={`flex items-center justify-between px-3 py-[9px] rounded-lg cursor-pointer transition
        ${
          active
            ? "bg-[#EFF4FF] text-[#3B6EF8] font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#F3F6FF] flex items-center justify-center">
            <Icon size={18} />
          </div>
          {label}
        </div>

        {badge && (
          <span className="bg-[#EFF4FF] text-[#3B6EF8] text-xs px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
    );
  };

  return (
    <Layout className="min-h-screen">

      {/* SIDEBAR */}
      <Sider className="!bg-white border-r border-gray-200 p-5 flex flex-col" width={270}>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="Smart LMS" className="w-15 h-15 object-contain" />
          <span className="text-lg font-semibold">Smart LMS</span>
        </div>

        {/* OVERVIEW */}
        <p className="text-xs text-gray-400 mb-2 tracking-wider">OVERVIEW</p>
        <div className="space-y-2 mb-6">
          <NavItem icon={LayoutDashboard} label="Dashboard" path="/" />
           <NavItem icon={BookOpen} label="Module" path="/admin/module" badge="12" />
          <NavItem icon={BookOpen} label="Courses" path="/admin/courses" badge="12" />
          <NavItem icon={Users} label="Learners" path="/admin/learners" badge="148" />
        </div>

        {/* CONTENT */}
        <p className="text-xs text-gray-400 mb-2 tracking-wider">CONTENT</p>
        <div className="space-y-2 mb-6">
          <NavItem icon={FileText} label="Documents" path="/admin/documents" />
          <NavItem icon={ClipboardList} label="Quizzes" path="/admin/quizzes" />
        </div>

        {/* SETTINGS */}
        <p className="text-xs text-gray-400 mb-2 tracking-wider">SETTINGS</p>
        <div className="space-y-2">
          <NavItem icon={Settings} label="Settings" path="/admin/settings" />
        </div>

        {/* Logout */}
        <div className="mt-auto pt-6">
          <div
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700"
          >
            <LogOut size={18} />
            Logout
          </div>
        </div>

      </Sider>

      {/* MAIN CONTENT */}
      <Layout>
        <Content className="bg-gray-50 min-h-screen p-6">
          <Outlet />
        </Content>
      </Layout>

    </Layout>
  );
}
