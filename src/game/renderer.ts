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

  // 🌤 SKY
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, width, height);

  // 🌱 GRASS
  ctx.fillStyle = "#2E8B57";
  ctx.fillRect(0, height / 2, width, height / 2);

  const horizon = height / 2;

  // 🛣 ROAD + GRID
  for (let i = 0; i < 200; i++) {
    const perspective = Math.pow(i / 200, 1.2);
    const y = horizon + perspective * (height / 2);

    const roadWidth = perspective * width * 0.8;
    const x = width / 2 - car.x * 300;

    // road surface
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

  // 🚗 AI CARS (F1 STYLE)
  aiCars.forEach((ai) => {
    const dz = ai.z - z;

    if (dz > 0 && dz < 2000) {
      const scale = 1 / dz;

      const baseX = width / 2 + ai.lane * 200;
      const baseY = horizon + scale * 500;

      const carWidth = 40 * scale * 200;
      const carLength = 80 * scale * 200;

      // BODY
      ctx.fillStyle = "#ff3b3b";
      ctx.fillRect(
        baseX - carWidth / 2,
        baseY,
        carWidth,
        carLength
      );

      // NOSE
      ctx.fillStyle = "#ff6b6b";
      ctx.fillRect(
        baseX - carWidth * 0.2,
        baseY - carLength * 0.3,
        carWidth * 0.4,
        carLength * 0.4
      );

      // REAR WING
      ctx.fillStyle = "#111";
      ctx.fillRect(
        baseX - carWidth / 2,
        baseY,
        carWidth,
        carLength * 0.15
      );

      // FRONT WING
      ctx.fillStyle = "#222";
      ctx.fillRect(
        baseX - carWidth * 0.6,
        baseY - carLength * 0.35,
        carWidth * 1.2,
        carLength * 0.1
      );

      // WHEELS
      ctx.fillStyle = "#000";

      // rear wheels
      ctx.fillRect(
        baseX - carWidth * 0.6,
        baseY + carLength * 0.1,
        carWidth * 0.2,
        carLength * 0.2
      );
      ctx.fillRect(
        baseX + carWidth * 0.4,
        baseY + carLength * 0.1,
        carWidth * 0.2,
        carLength * 0.2
      );

      // front wheels
      ctx.fillRect(
        baseX - carWidth * 0.6,
        baseY - carLength * 0.3,
        carWidth * 0.2,
        carLength * 0.2
      );
      ctx.fillRect(
        baseX + carWidth * 0.4,
        baseY - carLength * 0.3,
        carWidth * 0.2,
        carLength * 0.2
      );
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

  // ⏱ COUNTDOWN
  if (race.state === "countdown") {
    ctx.fillStyle = "red";
    ctx.font = "100px monospace";
    ctx.fillText(
      race.countdown.toString(),
      width / 2 - 30,
      height / 2
    );
  }

  // 🪞 REAR VIEW MIRROR (frame)
  ctx.fillStyle = "#000";
  ctx.fillRect(width / 2 - 120, 20, 240, 60);

  ctx.strokeStyle = "#888";
  ctx.strokeRect(width / 2 - 120, 20, 240, 60);

  ctx.fillStyle = "#ccc";
  ctx.font = "12px monospace";
  ctx.fillText("REAR VIEW", width / 2 - 40, 50);

  // 🪖 F1 COCKPIT + STEERING WHEEL

  // cockpit base
  ctx.fillStyle = "#111";
  ctx.fillRect(0, height - 120, width, 120);

  // wheel outer
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(width / 2, height - 20, 120, Math.PI, 0);
  ctx.fill();

  // wheel inner
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc(width / 2, height - 20, 80, Math.PI, 0);
  ctx.fill();

  // center display
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(width / 2 - 40, height - 80, 80, 40);

  // LEDs
  ctx.fillStyle = "#22c55e";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(width / 2 - 30 + i * 15, height - 70, 10, 5);
  }

  // buttons
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(width / 2 - 60, height - 50, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#3b82f6";
  ctx.beginPath();
  ctx.arc(width / 2 + 60, height - 50, 8, 0, Math.PI * 2);
  ctx.fill();
}