const express = require("express");

const router = express.Router();

const Task =
  require("../models/Task");


// GET USER TASKS

router.get(
  "/:email",
  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          userEmail:
            req.params.email,
        });

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// CREATE TASK

router.post(
  "/",
  async (req, res) => {

    try {

      const task =
        new Task(req.body);

      const savedTask =
        await task.save();

      res.status(201).json(
        savedTask
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// UPDATE TASK

router.put(
  "/:id",
  async (req, res) => {

    try {

      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(updatedTask);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// DELETE TASK

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Task Deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

module.exports = router;