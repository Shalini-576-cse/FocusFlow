import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";

const Profile = () => {

  const savedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] = useState(savedUser);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle User Inputs

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Password Inputs

  const handlePasswordChange = (e) => {

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Save Profile

  const saveProfile = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:8000/api/users/profile",
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    alert("Profile Updated ");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Update Failed"
    );
  }
};

  // Change Password

  const changePassword = async () => {

  try {

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {

      return alert(
        "Passwords do not match "
      );
    }

    const token =
      localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:8000/api/users/change-password",
      {
        currentPassword:
          passwordData.currentPassword,

        newPassword:
          passwordData.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Password Update Failed"
    );
  }
};
  // Logout

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (

    <div className="flex min-h-screen bg-[#F8F4EF]">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex-1 p-8">

        <Navbar />

        {/* Heading */}

        <div className="mt-10">

          <h1 className="text-5xl font-bold text-[#541A1A]">
            Profile Settings 
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Manage your account and security.
          </p>

        </div>

        {/* Profile Section */}

        <div className="bg-white rounded-3xl p-10 shadow-sm mt-10 max-w-4xl">

          {/* Avatar */}

          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-[#810B38] text-white flex items-center justify-center text-5xl font-bold">

              {user?.name?.charAt(0)}

            </div>

            <div>

              <h2 className="text-4xl font-bold text-[#541A1A]">
                {user?.name}
              </h2>

              <p className="text-gray-500 mt-2">
                FocusFlow User
              </p>

            </div>

          </div>

          {/* Personal Details */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#541A1A]">
              Personal Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-6">

              <div>

                <label className="text-gray-500">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={user?.name || ""}
                  onChange={handleChange}
                  className="w-full mt-2 bg-[#F8F4EF] p-4 rounded-2xl outline-none"
                />

              </div>

              <div>

                <label className="text-gray-500">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  onChange={handleChange}
                  className="w-full mt-2 bg-[#F8F4EF] p-4 rounded-2xl outline-none"
                />

              </div>

              <div>

                <label className="text-gray-500">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobile"
                  value={user?.mobile || ""}
                  onChange={handleChange}
                  className="w-full mt-2 bg-[#F8F4EF] p-4 rounded-2xl outline-none"
                />

              </div>

            </div>

            <button
              onClick={saveProfile}
              className="mt-8 bg-[#810B38] text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
            >
              Save Profile
            </button>

          </div>

          {/* Change Password */}

          <div className="mt-16">

            <h2 className="text-2xl font-bold text-[#541A1A]">
              Change Password 
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-6">

              <div>

                <label className="text-gray-500">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-2 bg-[#F8F4EF] p-4 rounded-2xl outline-none"
                />

              </div>

              <div>

                <label className="text-gray-500">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-2 bg-[#F8F4EF] p-4 rounded-2xl outline-none"
                />

              </div>

              <div>

                <label className="text-gray-500">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full mt-2 bg-[#F8F4EF] p-4 rounded-2xl outline-none"
                />

              </div>

            </div>

            <button
              onClick={changePassword}
              className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
            >
              Update Password
            </button>

          </div>

          {/* Logout */}

          <div className="mt-16">

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition text-white px-8 py-4 rounded-2xl font-semibold"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;