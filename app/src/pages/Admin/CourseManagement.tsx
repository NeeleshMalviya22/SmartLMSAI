export default function CourseManagement() {
  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">

      <h2 className="text-2xl font-bold mb-6">Course Management</h2>

      <button className="bg-blue-600 text-white px-5 py-2 rounded-xl mb-6">
        + Create New Course
      </button>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">Course Name</th>
              <th>Modules</th>
              <th>Learners</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">React Fundamentals</td>
              <td>8</td>
              <td>45</td>
              <td>
                <button className="text-blue-600 mr-3">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>

            <tr>
              <td className="py-3">System Design</td>
              <td>6</td>
              <td>30</td>
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
