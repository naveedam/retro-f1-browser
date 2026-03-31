import { Car } from "./car";
import { input } from "./controls";
import { render } from "./renderer";
import { EngineSound } from "./sound";
import { LapTimer } from "./lap";
import {
  setTrack,
  getTrackLength,
  getTrackInfo,
} from "./track";
import { RaceManager } from "./race";
import { AICar } from "./ai";

export class GameEngine {
  car = new Car();
  z = 0;

  aiCars = Array.from({ length: 5 }, () => new AICar());

  race = new RaceManager();
  sound = new EngineSound();
  lapTimer = new LapTimer();

  trackLength = 5000;

  constructor(trackId: string = "monza") {
    setTrack(trackId);
    this.trackLength = getTrackLength();
  }

  // 🏁 POSITION SYSTEM
  getPositions() {
    const cars = [
      {
        id: "player",
        distance:
          this.lapTimer.lap * this.trackLength + this.z,
      },
      ...this.aiCars.map((ai, i) => ({
        id: "ai-" + i,
        distance: ai.getDistance(this.trackLength),
      })),
    ];

    cars.sort((a, b) => b.distance - a.distance);

    return cars;
  }

  update() {
    const delta = 1 / 60;

    this.race.update(delta);

    // 🚦 GRID
    if (this.race.state === "grid") return;

    // ⏱️ COUNTDOWN
    if (this.race.state === "countdown") return;

    // 🏁 RACE
    this.car.update(input);

    const prevZ = this.z;
    this.z += this.car.speed * 0.5;

    // 🔊 sound
    this.sound.update(this.car.rpm);

    // ⏱️ lap timer
    this.lapTimer.update(delta);

    // 🚗 AI update
    this.aiCars.forEach((ai) => ai.update(this.trackLength));

    // 🚗 OVERTAKING BEHAVIOR
    this.aiCars.forEach((ai) => {
      const dz = ai.z - this.z;

      // if close → change lane (simulate overtaking)
      if (Math.abs(dz) < 200) {
        ai.lane += (Math.random() - 0.5) * 0.05;
      }

      // keep lane within bounds
      ai.lane = Math.max(-1.5, Math.min(1.5, ai.lane));
    });

    // 🧠 track difficulty
    const segment = getTrackInfo(this.z);

    if (Math.abs(segment.curve) > 1.2 && this.car.speed > 140) {
      this.car.speed *= 0.96;
    }

    // 🚧 off-track
    if (Math.abs(this.car.x) > 1.2) {
      this.car.speed *= 0.92;
    }

    // 🛑 pit lane
    const currentPos = this.z % this.trackLength;
    const prevPos = prevZ % this.trackLength;

    if (currentPos > this.trackLength * 0.9) {
      this.car.speed = Math.min(this.car.speed, 60);
    }

    // 🏁 lap detection
    if (currentPos < prevPos) {
      this.lapTimer.completeLap();
    }
  }

  startRace() {
    this.race.startCountdown();
  }

  draw(ctx: CanvasRenderingContext2D) {
    render(ctx, this.car, this.z, this.aiCars, this.race);
  }
}