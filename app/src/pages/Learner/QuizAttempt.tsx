import { useParams } from "react-router-dom";

export default function QuizAttempt() {
  const { id } = useParams();

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

      <h2 className="text-2xl font-bold mb-6">
        Quiz Attempt - Module {id}
      </h2>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>Quiz questions will load here</p>

        <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
          Submit Quiz
        </button>
      </div>

    </div>
  );
}
