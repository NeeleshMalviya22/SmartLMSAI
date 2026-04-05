import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { BookOpen, Award, BarChart3 } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  getLearnerCoursesApi,
  type CourseProgress,
} from "../../services/learnerCourse/learnerCourseService";

export default function LearnerDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getLearnerCoursesApi();
        if (res.success && res.data) setCourses(res.data);
      } catch {
        message.error("Unable to load your courses. Try refreshing.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const enrolled = useMemo(() => courses.filter((c) => c.isEnrolled), [courses]);

  const completedCourses = useMemo(
    () => enrolled.filter((c) => c.progressPercent === 100).length,
    [enrolled]
  );

  const averageProgress = useMemo(() => {
    if (enrolled.length === 0) return 0;
    const total = enrolled.reduce((sum, c) => sum + c.progressPercent, 0);
    return Math.round(total / enrolled.length);
  }, [enrolled]);

  if (loading) return <LoadingSpinner fullscreen />;

  const StatCard = ({ title, value, Icon }: { title: string; value: string; Icon: typeof BookOpen }) => (
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
        <h1 className="text-2xl font-bold text-gray-800">Welcome back 👋</h1>
        <p className="text-gray-500">Track your learning progress</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Courses Enrolled" value={String(enrolled.length)} Icon={BookOpen} />
        <StatCard title="Completed" value={String(completedCourses)} Icon={Award} />
        <StatCard title="Avg Progress" value={`${averageProgress}%`} Icon={BarChart3} />
      </div>

      <h2 className="text-xl font-semibold mb-6">Continue Learning</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {enrolled.length === 0 ? (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 mb-4">You are not enrolled in any courses yet.</p>
            <button
              onClick={() => navigate("/learner/courses")}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          enrolled.map((c) => (
            <div
              key={c.courseId}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 flex items-center justify-center text-white">
                <BookOpen size={32} />
              </div>

              <h3 className="font-semibold text-gray-800">{c.courseTitle}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {c.completedModules}/{c.totalModules} modules completed
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{c.progressPercent}%</span>
                </div>
                <div className="bg-gray-100 h-2 rounded-full">
                  <div
                    className={`h-2 rounded-full ${c.progressPercent === 100 ? "bg-green-500" : "bg-blue-600"}`}
                    style={{ width: `${c.progressPercent}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => navigate(`/learner/view/${c.courseId}`)}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
              >
                {c.progressPercent === 0 ? "Start Learning" : "Continue Learning"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
