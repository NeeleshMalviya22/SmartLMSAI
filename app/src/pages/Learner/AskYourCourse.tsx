export default function AskYourCourse() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

      <h2 className="text-2xl font-bold mb-6">
        🤖 Ask Your Course
      </h2>

      <div className="bg-white p-6 rounded-xl shadow">

        <textarea
          placeholder="Ask a question from your course..."
          className="w-full border p-4 rounded-lg mb-4"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Ask AI
        </button>

        <div className="mt-6 p-4 bg-gray-100 rounded">
          AI response will appear here
        </div>

      </div>

    </div>
  );
}
