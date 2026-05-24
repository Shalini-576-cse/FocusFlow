import { Trash2, Pencil } from "lucide-react";

const TaskCard = ({
  title,
  desc,
  priority,
  status,
  dueDate,
  onComplete,
  onDelete,
  onEdit,
}) => {
  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition duration-300">

      {/* Top */}

      <div className="flex justify-between items-start gap-4">

        <div>

          <h2 className="text-2xl font-bold text-[#541A1A]">
            {title}
          </h2>

          {dueDate && (

  <p className="text-sm text-gray-400 mt-3">
     Due: {dueDate}
  </p>

)}

        </div>

        <div
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${priorityColors[priority]}`}
        >
          {priority}
        </div>

      </div>

      {/* Bottom */}

      <div className="mt-8 flex justify-between items-center">

        <div
          className={`px-4 py-2 rounded-2xl text-sm font-medium ${
            status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-orange-100 text-orange-500"
          }`}
        >
          {status}
        </div>

        <div className="flex items-center gap-3">

          {status !== "Completed" ? (
            <button
              onClick={onComplete}
              className="bg-[#810B38] hover:bg-[#6d082f] text-white px-5 py-2 rounded-2xl text-sm font-medium transition"
            >
              Mark Complete
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-100 text-gray-400 px-5 py-2 rounded-2xl text-sm cursor-not-allowed"
            >
              Completed
            </button>
          )}

          {/* Edit */}

          <button
            onClick={onEdit}
            className="bg-blue-100 text-blue-500 p-3 rounded-2xl hover:bg-blue-200 transition"
          >
            <Pencil size={18} />
          </button>

          {/* Delete */}

          <button
            onClick={onDelete}
            className="bg-red-100 text-red-500 p-3 rounded-2xl hover:bg-red-200 transition"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default TaskCard;