import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../authService";
import { saveAuth } from "../../../utils/authStorage";



export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await loginApi(form);
      await saveAuth({
        token: res.data.data.token,
        role: res.data.data.role,
        userId: res.data.data.userId,
        email: res.data.data.email
    });
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">
              Login to continue learning
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
