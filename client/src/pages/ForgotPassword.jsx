import { useState } from "react";
import API from "../api/taskApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", {
        email,
      });

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EF]">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#541A1A]">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Enter your registered email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-4 bg-[#F8F4EF] rounded-2xl outline-none"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-[#810B38] text-white py-4 rounded-2xl font-semibold"
          >
            Send Reset Link
          </button>

          <p className="text-center">
            <a
              href="/"
              className="text-[#810B38] font-semibold"
            >
              Back to Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;