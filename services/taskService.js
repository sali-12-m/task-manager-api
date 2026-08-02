const tasks = require("../data/taskData");

const getAllTasks = () => {
  return tasks;
};
const getTaskById = (id) => {
  return tasks.find((task) => task.id === Number(id));
};

const createTask = (task) => {
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: task.title,
    completed: task.completed ?? false,
    priority: task.priority,
  };
  tasks.push(newTask);
  return newTask;
};

const updateTask = (id, data) => {
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    return null;
  }
  if (data.title !== undefined) {
    task.title = data.title;
  }
  if (data.completed !== undefined) {
    task.completed = data.completed;
  }
  if (data.priority !== undefined) {
    task.priority = data.priority;
  }
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === Number(id));
  if (index === -1) {
    return null;
  }
  return tasks.splice(index, 1)[0];
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
