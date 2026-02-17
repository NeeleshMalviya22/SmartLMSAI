import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: "React Fundamentals", progress: 65 },
    { id: 2, title: "System Design", progress: 40 }
  ];

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

      <h2 className="text-2xl font-bold mb-6">My Courses</h2>

      {courses.map((course) => (
        <div key={course.id} className="bg-white p-6 mb-4 rounded-xl shadow">

          <h3 className="font-semibold">{course.title}</h3>

          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>

          <button
            onClick={() => navigate(`/learner/view/${course.id}`)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue
          </button>

        </div>
      ))}

    </div>
  );
}
