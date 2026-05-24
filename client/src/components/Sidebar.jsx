import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  Settings,
} from "lucide-react";

const Sidebar = ({ darkMode }) => {

  return (

    <div
      className={`w-full md:w-72 shadow-sm p-6 md:min-h-screen transition ${
        darkMode
          ? "bg-[#111111]"
          : "bg-white"
      }`}
    >

      {/* Logo */}

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-2xl bg-[#810B38] flex items-center justify-center text-white text-2xl font-bold">
          F
        </div>

        <div>

          <h1 className="text-2xl font-bold text-[#541A1A]">
            FocusFlow
          </h1>

          <p className="text-sm text-gray-400">
            Task Management
          </p>

        </div>

      </div>

      {/* Navigation */}

      <div className="mt-12 flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">

        {/* Dashboard */}

        <a
          href="/dashboard"
          className="flex items-center gap-3 bg-[#F8F4EF] transition  px-5 py-4 rounded-2xl min-w-fit"
        >

          <LayoutDashboard size={22}
           className="text-[#541A1A]"
          />
         


          <span className="font-medium text-[#541A1A]">
            Dashboard
          </span>

        </a>

        {/* Tasks */}
<a
  href="/tasks"
  className="flex items-center gap-3 bg-[#F8F4EF] hover:bg-[#f1e2d1] transition px-5 py-4 rounded-2xl min-w-fit"
>

  <CheckSquare
    size={22}
    className="text-[#541A1A]"
  />

  <span className="font-medium text-[#541A1A]">
    Tasks
  </span>

</a>

        {/* Activity */}

        <a
  href="/activity"
  className="flex items-center gap-3 bg-[#F8F4EF] hover:bg-[#f1e2d1] transition px-5 py-4 rounded-2xl min-w-fit"
>

  <Clock
    size={22}
    className="text-[#541A1A]"
  />

  <span className="font-medium text-[#541A1A]">
    Activity
  </span>

</a>

        {/* Settings */}

        <a
          href="/profile"
          className="flex items-center gap-3 bg-[#F8F4EF] hover:bg-[#f1e2d1] transition px-5 py-4 rounded-2xl min-w-fit"
        >

          <Settings size={22} className="text-[#541A1A]" />

          <span className="font-medium text-[#541A1A]">
            Settings
          </span>

        </a>
        </div>

    </div>
  );
};

export default Sidebar;