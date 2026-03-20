import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import LearnerDashboard from "../pages/Learner/LearnerDashboard";

export default function RoleBasedDashboard() {
  const { role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <LearnerDashboard />;
}
