import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Tag } from "antd";
import { BookOpen, CheckCircle, LogIn } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import {
  getLearnerCoursesApi,
  enrollCourseApi,
  type CourseProgress,
} from "../../services/learnerCourse/learnerCourseService";

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      const res = await getLearnerCoursesApi();
      if (res.success && res.data) setCourses(res.data);
    } catch {
      message.error("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleEnroll = async (courseId: string) => {
    setEnrollingId(courseId);
    try {
      const res = await enrollCourseApi(courseId);
      if (res.success) {
        message.success("Enrolled successfully!");
        await fetchCourses();
      } else {
        message.error(res.message || "Enrollment failed.");
      }
    } catch {
      message.error("Enrollment failed.");
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) return <LoadingSpinner fullscreen />;

  const enrolled = courses.filter((c) => c.isEnrolled);
  const available = courses.filter((c) => !c.isEnrolled);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h1>

      {enrolled.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Enrolled Courses</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {enrolled.map((c) => (
              <div
                key={c.courseId}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="h-28 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 flex items-center justify-center text-white">
                  <BookOpen size={32} />
                </div>
                <h3 className="font-semibold text-gray-800">{c.courseTitle}</h3>
                <p className="text-sm text-gray-500 mb-3">{c.description || "No description"}</p>

                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{c.progressPercent}%</span>
                </div>
                <div className="bg-gray-100 h-2.5 rounded-full mb-3">
                  <div
                    className={`h-2.5 rounded-full transition-all ${c.progressPercent === 100 ? "bg-green-500" : "bg-blue-600"}`}
                    style={{ width: `${c.progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Tag color={c.progressPercent === 100 ? "green" : "blue"}>
                    {c.completedModules}/{c.totalModules} Modules
                  </Tag>
                  {c.allModulesCompleted && (
                    <Tag color="green" className="flex items-center gap-1">
                      <CheckCircle size={12} /> Complete
                    </Tag>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/learner/view/${c.courseId}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  {c.progressPercent === 0 ? "Start Learning" : "Continue Learning"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {available.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {available.map((c) => (
              <div
                key={c.courseId}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="h-28 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl mb-4 flex items-center justify-center text-white">
                  <BookOpen size={32} />
                </div>
                <h3 className="font-semibold text-gray-800">{c.courseTitle}</h3>
                <p className="text-sm text-gray-500 mb-3">{c.description || "No description"}</p>
                <Tag>{c.totalModules} Modules</Tag>

                <button
                  onClick={() => handleEnroll(c.courseId)}
                  disabled={enrollingId === c.courseId}
                  className="w-full mt-3 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition
                             disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <LogIn size={16} />
                  {enrollingId === c.courseId ? "Enrolling..." : "Enroll Now"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {courses.length === 0 && (
        <p className="text-gray-500">No courses available at the moment.</p>
      )}
    </div>
  );
}
