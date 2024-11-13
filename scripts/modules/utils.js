export function createParticles() {
  const boxContainer = document.querySelector(".box-container");
  const boxRect = boxContainer.getBoundingClientRect();
  const gameScene = document.querySelector(".game-scene");
  const gameSceneRect = gameScene.getBoundingClientRect();

  let particleContainer = document.querySelector(".particle-container");
  if (!particleContainer) {
    particleContainer = document.createElement("div");
    particleContainer.className = "particle-container";
    gameScene.appendChild(particleContainer);
  }

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particleContainer.appendChild(particle);

    const startX = boxRect.left - gameSceneRect.left + boxRect.width / 2;
    const startY = boxRect.top - gameSceneRect.top + boxRect.height / 2;

    const angle = (i / 12) * Math.PI * 2;
    const distance = 30 + Math.random() * 20;
    const duration = 0.5 + Math.random() * 0.3;

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(
          ${Math.cos(angle) * distance}px,
          ${Math.sin(angle) * distance}px
        )`;
      particle.style.opacity = "0";
    });

    setTimeout(() => particle.remove(), duration * 1000);
  }
}

export function spawnCoins() {
  const coinsContainer = document.querySelector(".coins-container");
  const boxContainer = document.querySelector(".box-container");
  const boxRect = boxContainer.getBoundingClientRect();
  const gameScene = document.querySelector(".game-scene");
  const gameSceneRect = gameScene.getBoundingClientRect();

  coinsContainer.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const coin = document.createElement("div");
    coin.className = "coin";
    coinsContainer.appendChild(coin);

    const startX = boxRect.left - gameSceneRect.left + boxRect.width / 2 - 8;
    const startY = boxRect.top - gameSceneRect.top + boxRect.height / 2 - 8;

    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;
    coin.style.animation = "coinSpin 0.5s linear infinite";

    const angle = (i / 8) * Math.PI * 2;
    const radius = 60;
    const delay = i * 50;

    requestAnimationFrame(() => {
      coin.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      coin.style.transform = `translate(
          ${Math.cos(angle) * radius}px,
          ${Math.sin(angle) * radius - 30}px
        )`;
      coin.style.opacity = "0";
    });

    setTimeout(() => coin.remove(), 1000);
  }
}

export function initializeStyleSheet() {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes coinRotate {
      0% { transform: rotateY(0deg); }
      100% { transform: rotateY(360deg); }
    }

    @keyframes coinSpin {
      0% { transform: translate(-50%, -50%) rotateY(0deg); }
      100% { transform: translate(-50%, -50%) rotateY(360deg); }
    }

    @keyframes floatIceberg {
      0% { transform: translateY(0); }
      100% { transform: translateY(-10px); }
    }

    @keyframes snowfall {
      0% { transform: translateY(-10px); }
      100% { transform: translateY(calc(100vh + 10px)); }
    }

    @keyframes coinShine {
      0% { transform: translateX(-100%) rotate(0deg); }
      100% { transform: translateX(100%) rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}
