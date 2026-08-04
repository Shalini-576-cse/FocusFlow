import { useState } from "react";
import API from "../api/taskApi";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EF] p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md rounded-3xl p-8 shadow-sm"
      >
        <h1 className="text-4xl font-bold text-[#541A1A] text-center">
          Login
        </h1>

        <div className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Email or Mobile"
            value={formData.emailOrMobile}
            onChange={(e) =>
              setFormData({
                ...formData,
                emailOrMobile: e.target.value,
              })
            }
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#810B38] text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
          <div className="text-center mt-2">
  <a
    href="/forgot-password"
    className="text-[#810B38] text-sm font-semibold hover:underline"
  >
    Forgot Password?
  

  </a>
</div>

          <p className="text-center mt-5 text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#810B38] font-semibold">
              Signup
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
