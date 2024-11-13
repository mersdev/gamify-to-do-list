import { tasks, saveTasks, lastCompletedCount } from "./state.js";
import { startAnimation } from "./animations.js";

export function addTask(title, description, dueDate) {
  const task = {
    id: Date.now(),
    title,
    description,
    dueDate,
    completed: false,
  };
  const currentTasks = tasks.get();
  tasks.set([...currentTasks, task]);
  saveTasks();
  renderTasks();
  lastCompletedCount.set(tasks.get().filter((task) => task.completed).length);
}

export function toggleTask(id) {
  const currentTasks = tasks.get();
  const previousCompleted = currentTasks.filter(
    (task) => task.completed
  ).length;

  const updatedTasks = currentTasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  tasks.set(updatedTasks);
  const currentCompleted = tasks.get().filter((task) => task.completed).length;

  if (currentCompleted > previousCompleted) {
    setTimeout(() => {
      startAnimation();
    }, 600);
  }

  lastCompletedCount.set(currentCompleted);
  saveTasks();
  renderTasks();
}

export function deleteTask(id) {
  const currentTasks = tasks.get();
  const updatedTasks = currentTasks.filter((task) => task.id !== id);
  tasks.set(updatedTasks);
  saveTasks();
  renderTasks();
  lastCompletedCount.set(tasks.get().filter((task) => task.completed).length);
}

export function renderTasks() {
  const todoList = document.getElementById("todoList");
  const currentTasks = tasks.get();

  todoList.innerHTML = "";

  currentTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `todo-item ${task.completed ? "completed" : ""}`;
    li.setAttribute("data-task-id", task.id);

    li.innerHTML = `
      <div class="card">
        <div class="card-front">
          <div class="checkbox-container">
            <input 
              type="checkbox" 
              class="todo-checkbox" 
              ${task.completed ? "checked" : ""}
              aria-label="Mark task as complete"
            >
          </div>
          <div class="todo-content">
            <span class="todo-text">${task.title}</span>
            <p class="todo-description">${task.description}</p>
            <span class="todo-date">Due: ${new Date(
              task.dueDate
            ).toLocaleDateString()}</span>
          </div>
          <div class="delete-button-container">
            <button class="delete-button" aria-label="Delete task">×</button>
          </div>
        </div>
        <div class="card-back">
          <div class="snowflake-logo">❄️</div>
        </div>
      </div>
    `;

    const checkbox = li.querySelector(".todo-checkbox");
    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    const deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    todoList.appendChild(li);
  });
}
