import { useState } from "react";

const AddTaskModal = ({ isOpen, setIsOpen, addTask }) => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {

    if (!title || !desc) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      title,
      desc,
      priority,
      dueDate,
      status: "Pending",
    };

    addTask(newTask);

    // Reset Fields

    setTitle("");
    setDesc("");
    setPriority("High");
    setDueDate("");

    setIsOpen(false);
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      <div className="bg-white w-[95%] md:w-[500px] rounded-3xl p-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <h2 className="text-3xl font-bold text-[#541A1A]">
            Add New Task
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>

        </div>

        {/* Form */}

        <div className="mt-8 space-y-5">

          {/* Title */}

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
          />

          {/* Description */}

          <textarea
            placeholder="Task Description"
            rows="4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
          />

          {/* Priority */}

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
          >

            <option>High</option>
            <option>Medium</option>
            <option>Low</option>

          </select>

          {/* Due Date */}

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-[#F8F4EF] p-4 rounded-2xl outline-none"
          />

          {/* Button */}

          <button
            onClick={handleSubmit}
            className="w-full bg-[#810B38] hover:opacity-90 transition text-white py-4 rounded-2xl font-semibold"
          >
            Create Task
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddTaskModal;