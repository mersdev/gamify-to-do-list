export function createSnowflakes() {
  const snow = document.querySelector(".snow");
  const numberOfSnowflakes = 50;

  for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    const opacity = Math.random() * 0.6 + 0.4;

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${left}%`;
    snowflake.style.animationDuration = `${animationDuration}s`;
    snowflake.style.opacity = opacity;

    snow.appendChild(snowflake);

    snowflake.addEventListener("animationend", () => {
      snowflake.remove();
      snow.appendChild(createNewSnowflake());
    });
  }
}

export function createNewSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";

  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const animationDuration = Math.random() * 3 + 2;
  const opacity = Math.random() * 0.6 + 0.4;

  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  snowflake.style.left = `${left}%`;
  snowflake.style.animationDuration = `${animationDuration}s`;
  snowflake.style.opacity = opacity;

  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
    document.querySelector(".snow").appendChild(createNewSnowflake());
  });

  return snowflake;
}
