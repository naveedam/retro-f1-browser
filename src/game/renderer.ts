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

  // sky
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, width, height);

  // grass
  ctx.fillStyle = "#2E8B57";
  ctx.fillRect(0, height / 2, width, height / 2);

  const horizon = height / 2;

  // 🏁 GRID MESSAGE
  if (race.state === "grid") {
    ctx.fillStyle = "white";
    ctx.font = "24px monospace";
    ctx.fillText("PRESS SPACE TO START", width / 2 - 130, height / 2);
  }

  // ⏱️ COUNTDOWN
  if (race.state === "countdown") {
    ctx.fillStyle = "red";
    ctx.font = "80px monospace";
    ctx.fillText(race.countdown.toString(), width / 2 - 20, height / 2);
  }

  // ROAD
  for (let i = 0; i < 200; i++) {
    const perspective = i / 200;
    const y = horizon + perspective * (height / 2);

    const roadWidth = perspective * width * 0.8;
    const x = width / 2 - car.x * 300;

    ctx.fillStyle = i % 2 ? "#555" : "#666";

    ctx.fillRect(x - roadWidth / 2, y, roadWidth, 4);
  }

  // 🚗 AI CARS
  aiCars.forEach((ai) => {
    const dz = ai.z - z;

    if (dz > 0 && dz < 2000) {
      const scale = 1 / dz;

      const x = width / 2 + ai.lane * 200;
      const y = horizon + scale * 500;

      ctx.fillStyle = "red";
      ctx.fillRect(x, y, 10, 20);
    }
  });

  // 🪞 REAR VIEW (basic)
  ctx.fillStyle = "#111";
  ctx.fillRect(width / 2 - 100, 20, 200, 50);

  ctx.fillStyle = "white";
  ctx.font = "12px monospace";
  ctx.fillText("REAR VIEW", width / 2 - 40, 50);
}