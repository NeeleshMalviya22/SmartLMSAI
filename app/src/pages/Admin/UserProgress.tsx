export default function UserProgress() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

      <h2 className="text-2xl font-bold mb-6">Learner Progress</h2>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">Learner</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Average Score</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">John Doe</td>
              <td>React Fundamentals</td>
              <td>70%</td>
              <td>82%</td>
            </tr>

            <tr>
              <td className="py-3">Jane Smith</td>
              <td>System Design</td>
              <td>45%</td>
              <td>76%</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
