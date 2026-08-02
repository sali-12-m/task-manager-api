const API_URL = "http://localhost:3000/api/tasks";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");

async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  taskList.innerHTML = "";

  tasks.forEach((task) => {
    taskList.innerHTML += `
      <div class="task">
        <h3>${task.title}</h3>
        <p>Priority: ${task.priority}</p>
        <p>Completed: ${task.completed}</p>

        <button
          class="delete"
          onclick="deleteTask(${task.id})">
          Delete
        </button>
      </div>
    `;
  });
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const priority = document.getElementById("priority").value;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      priority,
    }),
  });

  taskForm.reset();
  loadTasks();
});

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  loadTasks();
}

loadTasks();