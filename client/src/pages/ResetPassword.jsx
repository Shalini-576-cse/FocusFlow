import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/taskApi";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(res.data.message);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to reset password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EF]">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#541A1A]">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-4 bg-[#F8F4EF] rounded-2xl outline-none"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-[#810B38] text-white py-4 rounded-2xl font-semibold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
