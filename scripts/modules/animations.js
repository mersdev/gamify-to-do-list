import { isAnimating, tasks } from "./state.js";
import { spawnCoins, createParticles } from "./utils.js";
import { renderTasks } from "./taskManager.js";
import { saveTasks } from "./state.js";

// Add initial tasks constant
const initialTasks = [
  {
    id: 1,
    title: "Build a Snowman",
    description:
      "Create a jolly snowman in the backyard with carrot nose and button eyes",
    dueDate: "2024-03-20",
    completed: false,
  },
  {
    id: 2,
    title: "Winter Shopping",
    description: "Buy warm gloves, a scarf, and a new winter coat",
    dueDate: "2024-03-21",
    completed: false,
  },
  {
    id: 3,
    title: "Hot Chocolate Evening",
    description:
      "Make hot chocolate with marshmallows and watch a winter movie",
    dueDate: "2024-03-22",
    completed: false,
  },
];

export function startAnimation() {
  if (isAnimating.get()) return;
  isAnimating.set(true);

  const character = document.querySelector(".character");
  const questionBox = document.querySelector(".question-box");
  const boxCoin = document.querySelector(".box-coin");

  character.style.transform =
    "translateX(-50%) translateY(-60px) scale(1.2) rotateY(-15deg)";

  setTimeout(() => {
    questionBox.style.opacity = "0";
    setTimeout(() => {
      questionBox.style.display = "none";
      boxCoin.style.display = "block";
      requestAnimationFrame(() => {
        boxCoin.style.opacity = "1";
      });
    }, 100);
  }, 100);

  setTimeout(() => {
    spawnCoins();
    createParticles();
    boxCoin.style.opacity = "0";

    if (tasks.get().every((task) => task.completed)) {
      showCelebration();
    }
  }, 300);

  setTimeout(() => {
    character.style.transform =
      "translateX(-50%) translateY(0) scale(1.2) rotateY(-15deg)";

    setTimeout(() => {
      boxCoin.style.display = "none";
      questionBox.style.display = "block";
      requestAnimationFrame(() => {
        questionBox.style.opacity = "1";
      });
    }, 200);

    isAnimating.set(false);
  }, 800);
}

export function showCelebration() {
  const overlay = document.querySelector(".celebration-overlay");
  overlay.style.display = "flex";

  // Create fireworks with higher frequency
  createFireworks();

  // Start continuous fireworks
  const fireworkInterval = setInterval(createFireworks, 1000); // Reduced from default timing

  overlay.addEventListener(
    "click",
    () => {
      clearInterval(fireworkInterval);
      resetGame();
    },
    { once: true }
  );

  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });
}

function createFireworks() {
  const overlay = document.querySelector(".celebration-overlay");

  // Increased number of fireworks per batch
  for (let i = 0; i < 20; i++) {
    // Increased from 5 to 8
    setTimeout(() => {
      createSingleFirework(overlay);
    }, i * 300); // Reduced from 600 to 300ms
  }
}

function createSingleFirework(container) {
  // Random position for the firework
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight * 0.6);

  // Create the main firework point
  const firework = document.createElement("div");
  firework.className = "firework";
  firework.style.left = `${x}px`;
  firework.style.top = `${y}px`;
  firework.style.backgroundColor = getRandomColor();
  container.appendChild(firework);

  // Create particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "firework-particle";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = firework.style.backgroundColor;

    // Random angle and distance for particle spread
    const angle = (i / 30) * Math.PI * 2;
    const distance = 100 + Math.random() * 50;

    particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);

    container.appendChild(particle);

    // Clean up particles
    setTimeout(() => particle.remove(), 800);
  }

  // Clean up main firework
  setTimeout(() => firework.remove(), 1000);
}

function getRandomColor() {
  const colors = [
    "#ff0000",
    "#ffd700",
    "#00ff00",
    "#00ffff",
    "#ff00ff",
    "#ff8c00",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function resetGame() {
  const overlay = document.querySelector(".celebration-overlay");
  overlay.style.opacity = "0";

  overlay.removeEventListener("click", resetGame);

  setTimeout(() => {
    overlay.style.display = "none";
    tasks.set(initialTasks);
    saveTasks();
    renderTasks();
  }, 500);
}
