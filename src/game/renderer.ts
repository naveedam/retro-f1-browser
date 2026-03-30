export function render(
  ctx: CanvasRenderingContext2D,
  car: any,
  z: number
) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  // 🌤️ Sky
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, width, height);

  // 🌱 Grass
  ctx.fillStyle = "#2E8B57";
  ctx.fillRect(0, height / 2, width, height / 2);

  const horizon = height / 2;

  // 🛣️ Road rendering
  for (let i = 0; i < 200; i++) {
    const perspective = i / 200;

    // vertical position
    const y = horizon + perspective * (height / 2);

    // road width grows with perspective
    const roadWidth = perspective * width * 0.8;

    // smooth curve based on distance + depth
    const curve =
      Math.sin(z * 0.002 + i * 0.01) * 300;

    // apply car steering offset
    const x =
      width / 2 + curve - car.x * 300;

    // road color striping
    ctx.fillStyle = i % 2 ? "#555" : "#666";

    ctx.fillRect(
      x - roadWidth / 2,
      y,
      roadWidth,
      4
    );

    // 🟡 center dashed line
    if (i % 6 === 0) {
      ctx.fillStyle = "#FFF";
      ctx.fillRect(x - 5, y, 10, 4);
    }
  }

  // 🚗 Cockpit overlay (bottom panel)
  ctx.fillStyle = "#111";
  ctx.fillRect(0, height - 120, width, 120);

  // Optional: cockpit detail line
  ctx.strokeStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(0, height - 120);
  ctx.lineTo(width, height - 120);
  ctx.stroke();
}