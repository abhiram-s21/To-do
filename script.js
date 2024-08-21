// script.js

// Get references to the elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
loadTasks();

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" onchange="toggleComplete(this)">
    <span>${taskText}</span>
    <button onclick="deleteTask(this)">Delete</button>
`;
  taskList.appendChild(li);

  // Save tasks to local storage
  saveTasks();

  // Clear the input field
  taskInput.value = "";
}

function toggleComplete(checkbox) {
  checkbox.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  const listItems = taskList.querySelectorAll("li");
  listItems.forEach((item) => {
    const taskText = item.querySelector("span").textContent;
    const isCompleted = item.classList.contains("completed");
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" onchange="toggleComplete(this)" ${
          task.completed ? "checked" : ""
        }>
        <span>${task.text}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;
      if (task.completed) {
        li.classList.add("completed");
      }
      taskList.appendChild(li);
    });
  }
}
