import { Users, BookOpen, ClipboardList, BarChart3 } from "lucide-react";

export default function AdminDashboard() {

  const StatCard = ({ title, value, Icon }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center gap-4">
        <div className="bg-blue-50 p-3 rounded-xl">
          <Icon className="text-blue-600" size={22} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard 👨‍💼
        </h1>
        <p className="text-gray-500">
          Overview of platform performance and activity
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value="120" Icon={Users} />
        <StatCard title="Total Courses" value="15" Icon={BookOpen} />
        <StatCard title="Total Quizzes" value="42" Icon={ClipboardList} />
        <StatCard title="Avg Score" value="78%" Icon={BarChart3} />
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">
          Recent Activities
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">User</th>
              <th>Course</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">John Doe</td>
              <td>React Fundamentals</td>
              <td>Completed Quiz</td>
              <td>Today</td>
            </tr>

            <tr>
              <td className="py-3">Jane Smith</td>
              <td>System Design</td>
              <td>Enrolled</td>
              <td>Yesterday</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
