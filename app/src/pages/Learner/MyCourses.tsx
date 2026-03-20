import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { getCoursesApi } from "../../services/course/courseService";
import type { Course } from "../../types/types";

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);

      try {
        const response = await getCoursesApi({ page: 1, pageSize: 20 });
        setCourses(response.items || []);
      } catch (error) {
        message.error("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <LoadingSpinner fullscreen />;
  }

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

      <h2 className="text-2xl font-bold mb-6">My Courses</h2>

      {courses.length === 0 ? (
        <p className="text-gray-600">No courses enrolled yet.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="bg-white p-6 mb-4 rounded-xl shadow">
            <h3 className="font-semibold">{course.title}</h3>

            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${Math.min(100, (course as any).progress || 0)}%` }}
              />
            </div>

            <button
              onClick={() => navigate(`/learner/view/${course.id}`)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        ))
      )}

    </div>
  );
}
