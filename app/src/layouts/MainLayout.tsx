import { Layout, Dropdown, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { clearAuth } from "../utils/authStorage";
import { useAuth } from "../context/AuthContext";
import { menuItems } from "./config/menuConfig";
import { LogOut, User } from "lucide-react";
import logo from "../assets/image.png";

const { Sider, Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    await clearAuth();
    navigate("/login");
  };

  if (!role) return null;

  const filteredMenu = menuItems.filter(item =>
    item.roles.includes(role)
  );

  const renderMenu = (section: string) =>
    filteredMenu
      .filter(item => item.section === section)
      .map(item => {
        const Icon = item.icon;
        const active = location.pathname === item.path;

        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition
            ${
              active
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100">
              <Icon size={18} />
            </div>

            {!collapsed && <span>{item.label}</span>}
          </div>
        );
      });

  const profileMenu = [
    {
      key: "profile",
      label: "Profile",
      icon: <User size={16} />,
      onClick: () => navigate("/profile")
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogOut size={16} />,
      onClick: logout
    }
  ];

  return (
    <Layout className="min-h-screen">

      {/* SIDEBAR */}
      <Sider
        collapsed={collapsed}
        width={260}
        trigger={null}
        className="!bg-white border-r border-gray-200 flex flex-col transition-all duration-300"
      >

        {/* LOGO */}
        <div className="flex items-center gap-3 px-5 py-6">
          <img
            src={logo}
            className={`transition-all ${collapsed ? "w-8" : "w-10"}`}
          />
          {!collapsed && (
            <span className="text-lg font-semibold">Smart LMS</span>
          )}
        </div>

        {/* MENU */}
        <div className="flex-1 px-3 space-y-6 overflow-y-auto">

          {!collapsed && (
            <p className="text-xs text-gray-400 px-3">OVERVIEW</p>
          )}
          <div className="space-y-1">{renderMenu("overview")}</div>

          {!collapsed && (
            <p className="text-xs text-gray-400 px-3">CONTENT</p>
          )}
          <div className="space-y-1">{renderMenu("content")}</div>

          {!collapsed && (
            <p className="text-xs text-gray-400 px-3">SETTINGS</p>
          )}
          <div className="space-y-1">{renderMenu("settings")}</div>

        </div>

      </Sider>

      {/* MAIN AREA */}
      <Layout>

        {/* NAVBAR */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">

          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg p-2 rounded hover:bg-gray-100"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>

          {/* User Profile */}
          <Dropdown
            menu={{ items: profileMenu }}
            placement="bottomRight"
          >
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg">

              <Avatar className="bg-blue-500">
                {role?.charAt(0).toUpperCase()}
              </Avatar>

              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>

            </div>
          </Dropdown>

        </div>

        {/* PAGE CONTENT */}
        <Content className="bg-gray-50 min-h-screen p-6">
          <Outlet />
        </Content>

      </Layout>

    </Layout>
  );
}