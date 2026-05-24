import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../api/taskApi";

const Tasks = () => {

  const [tasks, setTasks] =
    useState([]);

  const [newSubtask, setNewSubtask] =
    useState({});

  const [search, setSearch] =
    useState("");

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

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

  // ADD SUBTASK

  const addSubtask =
    async (task) => {

      if (
        !newSubtask[task._id]
      ) return;

      const updatedTask = {

        ...task,

        subtasks: [

          ...task.subtasks,

          {
            text:
              newSubtask[
                task._id
              ],

            completed: false,

          },

        ],

      };

      await API.put(
        `/tasks/${task._id}`,
        updatedTask
      );

      setNewSubtask({
        ...newSubtask,

        [task._id]: "",
      });

      fetchTasks();

    };

  // TOGGLE SUBTASK

  const toggleSubtask =
    async (
      task,
      subtaskIndex
    ) => {

      const updatedSubtasks =
        [...task.subtasks];

      updatedSubtasks[
        subtaskIndex
      ].completed =
        !updatedSubtasks[
          subtaskIndex
        ].completed;

      const updatedTask = {

        ...task,

        subtasks:
          updatedSubtasks,

      };

      await API.put(
        `/tasks/${task._id}`,
        updatedTask
      );

      fetchTasks();

    };

  // FILTER

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="flex min-h-screen bg-[#F8F4EF]">

      <Sidebar />

      <div className="flex-1 p-8">

        <Navbar
          search={search}
          setSearch={setSearch}
        />

        <h1 className="text-5xl font-bold text-[#541A1A] mt-10">

          Tasks

        </h1>

        <div className="space-y-8 mt-10">

          {filteredTasks.map(
            (task) => {

              const completed =
                task.subtasks.filter(
                  (sub) =>
                    sub.completed
                ).length;

              const total =
                task.subtasks.length;

              const progress =
                total === 0
                  ? 0
                  : (
                      completed /
                      total
                    ) *
                    100;

              return (

                <div
                  key={task._id}
                  className="bg-white rounded-3xl p-8 shadow-sm"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h2 className="text-3xl font-bold text-[#541A1A]">

                        {task.title}

                      </h2>

                      <p className="text-gray-500 mt-2">

                        {task.desc}

                      </p>

                    </div>

                    <span className="bg-[#F8F4EF] px-4 py-2 rounded-2xl">

                      {task.priority}

                    </span>

                  </div>

                  {/* Progress */}

                  <div className="mt-6">

                    <div className="w-full bg-gray-200 h-4 rounded-full">

                      <div
                        className="bg-[#810B38] h-4 rounded-full"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                    <p className="mt-2 text-sm text-gray-500">

                      {completed} /
                      {total}
                      {" "}
                      Completed

                    </p>

                  </div>

                  {/* Add Subtask */}

                  <div className="flex gap-3 mt-6">

                    <input
                      type="text"
                      placeholder="Add subtask..."
                      value={
                        newSubtask[
                          task._id
                        ] || ""
                      }
                      onChange={(e) =>
                        setNewSubtask({
                          ...newSubtask,

                          [task._id]:
                            e.target
                              .value,
                        })
                      }
                      className="flex-1 bg-[#F8F4EF] p-4 rounded-2xl outline-none"
                    />

                    <button
                      onClick={() =>
                        addSubtask(
                          task
                        )
                      }
                      className="bg-[#810B38] text-white px-6 rounded-2xl"
                    >
                      Add
                    </button>

                  </div>

                  {/* Subtasks */}

                  <div className="space-y-3 mt-6">

                    {task.subtasks.map(
                      (
                        subtask,
                        index
                      ) => (

                        <div
                          key={index}
                          className="flex items-center gap-4 bg-[#F8F4EF] p-4 rounded-2xl"
                        >

                          <input
                            type="checkbox"
                            checked={
                              subtask.completed
                            }
                            onChange={() =>
                              toggleSubtask(
                                task,
                                index
                              )
                            }
                          />

                          <p
                            className={`${
                              subtask.completed
                                ? "line-through text-gray-400"
                                : ""
                            }`}
                          >
                            {
                              subtask.text
                            }
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>

    </div>

  );

};

export default Tasks;