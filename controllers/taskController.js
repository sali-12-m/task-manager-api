const taskService = require("../services/taskService");

// GET /api/tasks
const getAllTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.status(200).json(tasks);
};

// GET /api/tasks/:id
const getTaskById = (req, res) => {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
};

// POST /api/tasks
const createTask = (req, res) => {
  const { title, priority, completed } = req.body;

  // Validate title
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required.",
    });
  }

  // Validate priority
  if (!priority) {
    return res.status(400).json({
      message: "Priority is required.",
    });
  }

  // Validate allowed priority values
  const allowedPriorities = ["low", "medium", "high"];

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be one of: low, medium, high.",
    });
  }

  const newTask = taskService.createTask({
    title: title.trim(),
    priority,
    completed,
  });

  return res.status(201).json(newTask);
};

// PATCH /api/tasks/:id
const updateTask = (req, res) => {
  const updatedTask = taskService.updateTask(
    req.params.id,
    req.body
  );

  if (!updatedTask) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(updatedTask);
};

// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
  const deletedTask = taskService.deleteTask(req.params.id);

  if (!deletedTask) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask,
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};