import { useNavigate } from "react-router-dom";
import { BookOpen, Award, BarChart3 } from "lucide-react";

export default function LearnerDashboard() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Machine Learning Basics",
      instructor: "Dr. Sarah Johnson",
      progress: 65
    },
    {
      id: 2,
      title: "Web Development",
      instructor: "Prof. Mike Chen",
      progress: 45
    },
    {
      id: 3,
      title: "Data Structures",
      instructor: "Dr. Emily Watson",
      progress: 80
    }
  ];

  const StatCard = ({ title, value, Icon }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="bg-blue-50 p-3 rounded-xl">
          <Icon className="text-blue-600" />
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

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back 👋
        </h1>
        <p className="text-gray-500">
          Track your learning progress
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Courses Enrolled" value="12" Icon={BookOpen} />
        <StatCard title="Completed" value="8" Icon={Award} />
        <StatCard title="Avg Score" value="87%" Icon={BarChart3} />
      </div>

      <h2 className="text-xl font-semibold mb-6">
        Continue Learning
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 flex items-center justify-center text-white">
              Course Preview
            </div>

            <h3 className="font-semibold text-gray-800">
              {c.title}
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              {c.instructor}
            </p>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{c.progress}%</span>
              </div>

              <div className="bg-gray-100 h-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${c.progress}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/learner/view/${c.id}`)}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              Continue Learning
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
