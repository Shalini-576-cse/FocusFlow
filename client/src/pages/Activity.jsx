import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../api/taskApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const Activity = () => {

  const [tasks, setTasks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user) return;

      const res = await API.get(
        `/tasks/${user.email}`
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  // TASK COUNTS

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  // SUBTASK COUNTS

  const allSubtasks =
    tasks.flatMap(
      (task) =>
        task.subtasks || []
    );

  const completedSubtasks =
    allSubtasks.filter(
      (sub) =>
        sub.completed
    ).length;

  const pendingSubtasks =
    allSubtasks.filter(
      (sub) =>
        !sub.completed
    ).length;

  // OVERALL PROGRESS

  const total =
    completedTasks +
    pendingTasks +
    completedSubtasks +
    pendingSubtasks;

  const completed =
    completedTasks +
    completedSubtasks;

  const progress =
    total === 0
      ? 0
      : Math.round(
          (completed / total) *
            100
        );

  // BAR CHART DATA

  const chartData = [
    {
      name: "Topics",
      Completed:
        completedTasks,
      Pending:
        pendingTasks,
    },

    {
      name: "Subtopics",
      Completed:
        completedSubtasks,
      Pending:
        pendingSubtasks,
    },
  ];

  return (

    <div className="flex min-h-screen bg-[#F8F4EF]">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex-1 p-8">

        {/* Navbar */}

        <Navbar
          search={search}
          setSearch={setSearch}
        />

        {/* Heading */}

        <div className="mt-10">

          <h1 className="text-5xl font-bold text-[#541A1A]">

            Activity Tracker 

          </h1>

          <p className="text-gray-500 mt-3 text-lg">

            Real-time analytics of tasks and subtasks.

          </p>

        </div>

        {/* TOP STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-3xl p-6 shadow-sm border-l-[8px] border-green-500">

            <h2 className="text-gray-500">
              Completed Topics
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-4">

              {completedTasks}

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border-l-[8px] border-orange-500">

            <h2 className="text-gray-500">
              Pending Topics
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-4">

              {pendingTasks}

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border-l-[8px] border-blue-500">

            <h2 className="text-gray-500">
              Completed Subtasks
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-4">

              {completedSubtasks}

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border-l-[8px] border-red-500">

            <h2 className="text-gray-500">
              Pending Subtasks
            </h2>

            <p className="text-5xl font-bold text-red-500 mt-4">

              {pendingSubtasks}

            </p>

          </div>

        </div>

        {/* OVERALL PROGRESS */}

        <div className="bg-white rounded-3xl p-8 shadow-sm mt-10">

          <div className="flex justify-between items-center">

            <h2 className="text-3xl font-bold text-[#541A1A]">

              Overall Progress

            </h2>

            <span className="text-3xl font-bold text-[#810B38]">

              {progress}%

            </span>

          </div>

          {/* Progress Bar */}

          <div className="w-full bg-gray-200 h-5 rounded-full mt-6 overflow-hidden">

            <div
              className="bg-[#810B38] h-5 rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white rounded-3xl p-8 shadow-sm mt-10">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold text-[#541A1A]">

              Activity Analytics

            </h2>

          </div>

          <div className="w-full h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={chartData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Legend />

                {/* COMPLETED */}

                <Bar
                  dataKey="Completed"
                  fill="#16a34a"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />

                {/* PENDING */}

                <Bar
                  dataKey="Pending"
                  fill="#f97316"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* TASK ACTIVITY */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-[#541A1A]">

            Real-Time Activity

          </h2>

          <div className="space-y-6 mt-8">

            {tasks.map((task) => {

              const totalSubtasks =
                task.subtasks.length;

              const completedSubtasksCount =
                task.subtasks.filter(
                  (sub) =>
                    sub.completed
                ).length;

              const taskProgress =
                totalSubtasks === 0
                  ? 0
                  : Math.round(
                      (
                        completedSubtasksCount /
                        totalSubtasks
                      ) * 100
                    );

              return (

                <div
                  key={task._id}
                  className="bg-white rounded-3xl p-6 shadow-sm"
                >

                  {/* HEADER */}

                  <div className="flex justify-between items-center flex-wrap gap-4">

                    <div>

                      <h3 className="text-2xl font-bold text-[#541A1A]">

                        {task.title}

                      </h3>

                      <p className="text-gray-500 mt-2">

                        {task.desc}

                      </p>

                    </div>

                    <div
                      className={`px-5 py-2 rounded-2xl text-white font-semibold ${
                        task.status ===
                        "Completed"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    >

                      {task.status}

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="mt-6">

                    <div className="flex justify-between mb-2">

                      <span>
                        Progress
                      </span>

                      <span>
                        {
                          taskProgress
                        }
                        %
                      </span>

                    </div>

                    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">

                      <div
                        className="bg-[#810B38] h-4 rounded-full"
                        style={{
                          width: `${taskProgress}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* SUBTASKS */}

                  <div className="space-y-3 mt-6">

                    {task.subtasks.map(
                      (
                        subtask,
                        index
                      ) => (

                        <div
                          key={index}
                          className="flex justify-between items-center bg-[#F8F4EF] p-4 rounded-2xl"
                        >

                          <p
                            className={`${
                              subtask.completed
                                ? "line-through text-gray-400"
                                : "text-[#541A1A]"
                            }`}
                          >

                            {
                              subtask.text
                            }

                          </p>

                          <span
                            className={`font-semibold ${
                              subtask.completed
                                ? "text-green-600"
                                : "text-orange-500"
                            }`}
                          >

                            {subtask.completed
                              ? "Completed"
                              : "Pending"}

                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </div>

  );

};

export default Activity;