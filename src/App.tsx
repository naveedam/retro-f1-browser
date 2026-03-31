import { useEffect, useRef, useState } from "react";
import { GameEngine } from "./game/engine";
import { initControls, setSoundStarter } from "./game/controls";
import HUD from "./components/HUD";
import Menu from "./components/Menu";
import { tyres } from "./game/tyres";

type Tyre = "soft" | "medium" | "hard";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  const [mode, setMode] = useState<"menu" | "race">("menu");

  const [selectedTrack, setSelectedTrack] = useState<string>("monza");
  const [selectedTyre, setSelectedTyre] = useState<Tyre>("medium");

  // HUD state
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(1);
  const [rpm, setRpm] = useState(0);
  const [lap, setLap] = useState(1);
  const [lapTime, setLapTime] = useState(0);
  const [position, setPosition] = useState(1);
  const [totalCars, setTotalCars] = useState(6);

  useEffect(() => {
    if (mode !== "race") return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const engine = new GameEngine(selectedTrack);
    engineRef.current = engine;

    engine.car.setTyre(tyres[selectedTyre]);

    initControls();

    setSoundStarter(() => engine.sound.start());

    function loop() {
      engine.update();
      engine.draw(ctx);

      // HUD updates
      setSpeed(engine.car.speed);
      setGear(engine.car.gear);
      setRpm(engine.car.rpm);
      setLap(engine.lapTimer.lap);
      setLapTime(engine.lapTimer.lapTime);

      // 🏁 POSITION SYSTEM
      const positions = engine.getPositions();
      const playerIndex = positions.findIndex(
        (c) => c.id === "player"
      );

      setPosition(playerIndex + 1);
      setTotalCars(positions.length);

      requestAnimationFrame(loop);
    }

    loop();
  }, [mode, selectedTrack, selectedTyre]);

  // 🏁 SPACE → START RACE
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.code === "Space" && engineRef.current) {
        engineRef.current.startRace();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  // MENU
  if (mode === "menu") {
    return (
      <Menu
        onStart={(trackId, tyre) => {
          setSelectedTrack(trackId);
          setSelectedTyre(tyre);
          setMode("race");
        }}
      />
    );
  }

  // GAME
  return (
    <div
      style={{
        position: "relative",
        background: "#000",
        height: "100vh",
      }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ display: "block", margin: "0 auto" }}
      />

      <HUD
        speed={speed}
        gear={gear}
        rpm={rpm}
        lap={lap}
        lapTime={lapTime}
        position={position}
        totalCars={totalCars}
      />
    </div>
  );
}

export default App;