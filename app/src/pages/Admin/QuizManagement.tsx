export default function QuizManagement() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

      <h2 className="text-2xl font-bold mb-6">Quiz Management</h2>

      <button className="bg-blue-600 text-white px-5 py-2 rounded-xl mb-6">
        + Create New Quiz
      </button>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">Quiz Title</th>
              <th>Course</th>
              <th>Questions</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">React Basics Quiz</td>
              <td>React Fundamentals</td>
              <td>10</td>
              <td>
                <button className="text-blue-600 mr-3">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>

            <tr>
              <td className="py-3">Design Principles</td>
              <td>System Design</td>
              <td>8</td>
              <td>
                <button className="text-blue-600 mr-3">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
