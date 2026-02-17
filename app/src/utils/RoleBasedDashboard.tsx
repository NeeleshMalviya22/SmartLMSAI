import { useEffect, useState } from "react";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import LearnerDashboard from "../pages/Learner/LearnerDashboard";
import { getRole } from "./authStorage";

export default function RoleBasedDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      const r = await getRole();
      setRole(r);
      setLoading(false);
    };

    loadRole();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (role === "ADMIN") {
    return <AdminDashboard />;
  }

  return <LearnerDashboard />;
}
