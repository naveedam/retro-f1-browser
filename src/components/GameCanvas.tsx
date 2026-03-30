import { useEffect, useRef } from "react";
import { GameEngine } from "../game/engine";
import { initControls } from "../game/controls";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const engine = new GameEngine();

    initControls();

    function loop() {
      engine.update();
      engine.draw(ctx);
      requestAnimationFrame(loop);
    }

    loop();
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}