import { useState } from "react";
import API from "../api/taskApi";

const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Account Created Successfully 🚀");

      window.location.href = "/dashboard";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#F8F4EF] p-6">

      <form
        onSubmit={handleSignup}
        className="bg-white w-full max-w-md rounded-3xl p-8 shadow-sm"
      >

        <h1 className="text-4xl font-bold text-[#541A1A] text-center">
          Create Account
        </h1>

        <div className="mt-8 space-y-5">

          {/* Name */}

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
            required
          />

          {/* Email */}

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
            required
          />

          {/* Mobile */}

          <input
            type="text"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({
                ...formData,
                mobile: e.target.value,
              })
            }
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
            required
          />

          {/* Password */}

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

          {/* Signup Button */}

          <button
            type="submit"
            className="w-full bg-[#810B38] text-white py-4 rounded-2xl font-semibold"
          >
            Signup
          </button>

          {/* Login Link */}

          <p className="text-center text-gray-500">

            Already have an account?{" "}

            <a
              href="/"
              className="text-[#810B38] font-semibold"
            >
              Login
            </a>

          </p>

        </div>

      </form>

    </div>
  );
};

export default Signup;