import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";

import API from "../api/taskApi";

const Dashboard = () => {

  const [isOpen, setIsOpen] =
    useState(false);

  const [tasks, setTasks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

    

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

  // ADD TASK

  const addTask = async (task) => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      const taskData = {

        ...task,

        userEmail: user.email,

        subtasks: [],

      };

      const res = await API.post(
        "/tasks",
        taskData
      );

      setTasks([
        res.data,
        ...tasks,
      ]);

      setIsOpen(false);

    } catch (error) {

      console.log(error);

    }

  };

  // COMPLETE TASK

  const completeTask =
    async (task) => {

      try {

        const updatedTask = {

          ...task,

          status: "Completed",

        };

        await API.put(
          `/tasks/${task._id}`,
          updatedTask
        );

        fetchTasks();

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE TASK

  const deleteTask =
    async (id) => {

      try {

        await API.delete(
          `/tasks/${id}`
        );

        setTasks(
          tasks.filter(
            (task) =>
              task._id !== id
          )
        );

      } catch (error) {

        console.log(error);

      }

    };

  // FILTER TASKS

  const filteredTasks =
    tasks.filter((task) => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "All" ||
        task.priority === filter;

      return (
        matchesSearch &&
        matchesFilter
      );

    });

  // STATS

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

            Welcome back 👋

          </h1>

          <p className="text-gray-500 mt-3 text-lg">

            Manage your tasks efficiently with FocusFlow.

          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-gray-500">
              Total Tasks
            </h2>

            <p className="text-5xl font-bold text-[#541A1A] mt-4">

              {tasks.length}

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-gray-500">
              Completed
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-4">

              {completedTasks}

            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <h2 className="text-gray-500">
              Pending
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-4">

              {pendingTasks}

            </p>

          </div>

        </div>

        {/* Recent Tasks */}

        <div className="mt-12">

          <div className="flex justify-between items-center flex-wrap gap-4">

            <h2 className="text-3xl font-bold text-[#541A1A]">

              Recent Tasks

            </h2>

            <div className="flex gap-3 flex-wrap">

              <button
                onClick={() =>
                  setFilter("All")
                }
                className={`px-4 py-2 rounded-2xl ${
                  filter === "All"
                    ? "bg-[#810B38] text-white"
                    : "bg-white"
                }`}
              >
                All
              </button>

              <button
                onClick={() =>
                  setFilter("High")
                }
                className={`px-4 py-2 rounded-2xl ${
                  filter === "High"
                    ? "bg-red-500 text-white"
                    : "bg-white"
                }`}
              >
                High
              </button>

              <button
                onClick={() =>
                  setFilter("Medium")
                }
                className={`px-4 py-2 rounded-2xl ${
                  filter === "Medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-white"
                }`}
              >
                Medium
              </button>

              <button
                onClick={() =>
                  setFilter("Low")
                }
                className={`px-4 py-2 rounded-2xl ${
                  filter === "Low"
                    ? "bg-green-500 text-white"
                    : "bg-white"
                }`}
              >
                Low
              </button>

              <button
                onClick={() =>
                  setIsOpen(true)
                }
                className="bg-[#810B38] text-white px-6 py-3 rounded-2xl"
              >
                + Add Task
              </button>

            </div>

          </div>

          {/* TASKS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {filteredTasks.map(
              (task) => (

                <TaskCard
                  key={task._id}
                  task={task}
                  title={task.title}
                  desc={task.desc}
                  priority={
                    task.priority
                  }
                  status={
                    task.status
                  }
                  onComplete={() =>
                    completeTask(
                      task
                    )
                  }
                  onDelete={() =>
                    deleteTask(
                      task._id
                    )
                  }
                />

              )
            )}

          </div>

        </div>

      </div>

      {/* ADD MODAL */}

      <AddTaskModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addTask={addTask}
      />

    </div>

  );

};

export default Dashboard;