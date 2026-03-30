import { getTrackInfo } from "./track";

export function render(
  ctx: CanvasRenderingContext2D,
  car: any,
  z: number
) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  // 🎥 camera shake
  const shake = car.speed > 150 ? Math.random() * 2 : 0;
  ctx.save();
  ctx.translate(shake, 0);

  // sky
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, width, height);

  // grass
  ctx.fillStyle = "#2E8B57";
  ctx.fillRect(0, height / 2, width, height / 2);

  const horizon = height / 2;

  let accumulatedCurve = 0;

  for (let i = 0; i < 200; i++) {
    const perspective = Math.pow(i / 200, 1.2);
    const y = horizon + perspective * (height / 2);

    const segment = getTrackInfo(z + i * 20);

    // 🔥 stronger curve = more realistic track
    accumulatedCurve += segment.curve * 0.004;

    const roadWidth = perspective * width * 0.8;

    const x =
      width / 2 +
      accumulatedCurve * 300 -
      car.x * 300;

    ctx.fillStyle = i % 2 ? "#555" : "#666";

    ctx.fillRect(
      x - roadWidth / 2,
      y,
      roadWidth,
      4
    );

    // center line
    if (i % 6 === 0) {
      ctx.fillStyle = "#FFF";
      ctx.fillRect(x - 5, y, 10, 4);
    }
  }

  // cockpit
  ctx.fillStyle = "#111";
  ctx.fillRect(0, height - 120, width, 120);

  ctx.restore();
}