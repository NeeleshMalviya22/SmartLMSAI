import { useParams, useNavigate } from "react-router-dom";

export default function CourseViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

      <h2 className="text-2xl font-bold mb-6">
        Course Viewer - Module {id}
      </h2>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p>PDF Viewer will be integrated here</p>
      </div>

      <button
        onClick={() => navigate(`/learner/quiz/${id}`)}
        className="bg-green-600 text-white px-5 py-2 rounded"
      >
        Take Quiz
      </button>

    </div>
  );
}
