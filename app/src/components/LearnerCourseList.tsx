import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, Alert } from "antd";
import type { Course } from "../types/types";
import { getAllCoursesApi } from "../services/course/courseService";

export default function LearnerCourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllCoursesApi();
        setCourses(data);
      } catch {
        setError("Unable to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    void fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message="Error" description={error} />;
  }

  if (!courses.length) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-600">No courses found at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="h-28 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 flex items-center justify-center text-white text-sm font-semibold">
            Course Preview
          </div>

          <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
          <p className="text-gray-500 text-sm mb-4">{course.description ?? "No description available."}</p>

          <div className="mb-4">
            <span className="text-xs font-medium text-gray-500">Course ID: {course.id}</span>
          </div>

          <button
            onClick={() => navigate(`/learner/view/${course.id}`)}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            Continue Learning
          </button>
        </div>
      ))}
    </div>
  );
}
