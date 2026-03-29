import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getLearnerCoursesApi();
        if (res.success && res.data) {
          setCourses(res.data);
        }
      } catch {
        message.error("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Only available courses
  const available = courses.filter((c) => !c.isEnrolled);

  // ✅ Enroll + redirect
  const handleEnroll = async (courseId: string) => {
    setEnrollingId(courseId);
    try {
      const res = await enrollCourseApi(courseId);
      if (res.success) {
        message.success("Enrolled successfully!");

        // 🔥 Redirect to dashboard
        navigate("/");

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      {available.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">
            You have already enrolled in all courses 🎉
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {available.map((c) => (
            <div
              key={c.courseId}
              className="bg-white p-5 rounded-2xl shadow border"
            >
              <h3 className="font-semibold text-gray-800">
                {c.courseTitle}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {c.description || "No description"}
              </p>

              <button
                disabled={enrollingId === c.courseId}
                onClick={() => handleEnroll(c.courseId)}
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
              >
                {enrollingId === c.courseId
                  ? "Enrolling..."
                  : "Enroll"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}