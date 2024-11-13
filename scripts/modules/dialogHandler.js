import { addTask } from "./taskManager.js";

export function initializeDialog() {
  const taskDialog = document.getElementById("taskDialog");
  const taskDialogForm = document.getElementById("taskDialogForm");
  const addButton = document.querySelector(".add-button");

  addButton.addEventListener("click", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById("taskDueDate").valueAsDate = tomorrow;
    taskDialog.showModal();
  });

  taskDialogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const dueDate = document.getElementById("taskDueDate").value;

    if (title.length < 3) {
      alert("Title must be at least 3 characters long");
      return;
    }

    if (description.length < 5) {
      alert("Description must be at least 5 characters long");
      return;
    }

    if (!dueDate) {
      alert("Please select a due date");
      return;
    }

    addTask(title, description, dueDate);
    taskDialogForm.reset();
    taskDialog.close();
  });

  document.querySelector(".btn-cancel").addEventListener("click", () => {
    taskDialogForm.reset();
    taskDialog.close();
  });

  taskDialog.addEventListener("click", (e) => {
    if (e.target === taskDialog) {
      taskDialogForm.reset();
      taskDialog.close();
    }
  });
}
