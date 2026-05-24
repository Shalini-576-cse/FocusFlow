const mongoose = require("mongoose");

const subtaskSchema =
  new mongoose.Schema({

    text: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

  });

const taskSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      default: "Medium",
    },

    status: {
      type: String,
      default: "Pending",
    },

    userEmail: {
      type: String,
      required: true,
    },

    subtasks: [subtaskSchema],

  },
  {
    timestamps: true,
  });

module.exports =
  mongoose.model(
    "Task",
    taskSchema
  );