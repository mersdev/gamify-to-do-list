import { renderTasks } from "./modules/taskManager.js";
import { createSnowflakes } from "./modules/snowEffect.js";
import { initializeDialog } from "./modules/dialogHandler.js";
import { initializeStyleSheet } from "./modules/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  createSnowflakes();
  initializeDialog();
  initializeStyleSheet();
});

window.addEventListener("resize", () => {
  const coins = document.querySelectorAll(".coin");
  if (coins.length > 0) {
    coins.forEach((coin) => coin.remove());
  }
});
