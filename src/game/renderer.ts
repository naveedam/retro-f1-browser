import { AICar } from "./ai";
import { RaceManager } from "./race";

export function render(
  ctx: CanvasRenderingContext2D,
  car: any,
  z: number,
  aiCars: AICar[],
  race: RaceManager
) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.clearRect(0, 0, width, height);

  // SKY
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, width, height);

  // GRASS
  ctx.fillStyle = "#2E8B57";
  ctx.fillRect(0, height / 2, width, height / 2);

  const horizon = height / 2;

  // 🛣️ ROAD + GRID MARKINGS
  for (let i = 0; i < 200; i++) {
    const perspective = i / 200;
    const y = horizon + perspective * (height / 2);

    const roadWidth = perspective * width * 0.8;
    const x = width / 2 - car.x * 300;

    // road
    ctx.fillStyle = i % 2 ? "#555" : "#666";
    ctx.fillRect(x - roadWidth / 2, y, roadWidth, 4);

    // center line
    if (i % 6 === 0) {
      ctx.fillStyle = "#FFF";
      ctx.fillRect(x - 4, y, 8, 4);
    }

    // 🏁 GRID BOXES (only near start)
    if (race.state === "grid" && i < 20 && i % 4 === 0) {
      ctx.strokeStyle = "white";
      ctx.strokeRect(
        x - roadWidth * 0.3,
        y,
        roadWidth * 0.25,
        6
      );

      ctx.strokeRect(
        x + roadWidth * 0.05,
        y,
        roadWidth * 0.25,
        6
      );
    }
  }

  // 🚗 AI CARS (improved look)
  aiCars.forEach((ai) => {
    const dz = ai.z - z;

    if (dz > 0 && dz < 2000) {
      const scale = 1 / dz;

      const x = width / 2 + ai.lane * 200;
      const y = horizon + scale * 500;

      const size = 20 * scale * 200;

      // body
      ctx.fillStyle = "#ff3b3b";
      ctx.fillRect(x - size / 2, y, size, size * 1.5);

      // rear wing
      ctx.fillStyle = "#111";
      ctx.fillRect(x - size / 2, y, size, size * 0.2);
    }
  });

  // 🏁 GRID TEXT
  if (race.state === "grid") {
    ctx.fillStyle = "white";
    ctx.font = "28px monospace";
    ctx.fillText(
      "PRESS SPACE TO START",
      width / 2 - 180,
      height / 2
    );
  }

  // ⏱️ COUNTDOWN
  if (race.state === "countdown") {
    ctx.fillStyle = "red";
    ctx.font = "100px monospace";
    ctx.fillText(
      race.countdown.toString(),
      width / 2 - 30,
      height / 2
    );
  }

  // 🪞 REAR VIEW MIRROR (better frame)
  ctx.fillStyle = "#000";
  ctx.fillRect(width / 2 - 120, 20, 240, 60);

  ctx.strokeStyle = "#888";
  ctx.strokeRect(width / 2 - 120, 20, 240, 60);

  ctx.fillStyle = "#ccc";
  ctx.font = "12px monospace";
  ctx.fillText("REAR VIEW", width / 2 - 40, 50);

  // 🪖 HELMET / COCKPIT VIEW
  ctx.fillStyle = "#000";
  ctx.fillRect(0, height - 100, width, 100);

  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(width / 2, height + 40, 200, Math.PI, 0);
  ctx.fill();
}