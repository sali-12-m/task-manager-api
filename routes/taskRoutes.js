const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// GET all tasks
router.get("/", taskController.getAllTasks);

// GET task by ID
router.get("/:id", taskController.getTaskById);

// Create a new task
router.post("/", taskController.createTask);

// Update a task
router.patch("/:id", taskController.updateTask);

// Delete a task
router.delete("/:id", taskController.deleteTask);

module.exports = router;