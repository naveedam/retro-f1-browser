import { Car } from "./car";
import { input } from "./controls";
import { render } from "./renderer";
import { EngineSound } from "./sound";
import { LapTimer } from "./lap";
import { setTrack, getTrackLength } from "./track";

export class GameEngine {
  car = new Car();
  z = 0;

  sound = new EngineSound();
  lapTimer = new LapTimer();

  trackLength = 5000;

  constructor(trackId: string = "monza") {
    setTrack(trackId);
    this.trackLength = getTrackLength();
  }

  update() {
    this.car.update(input);

    const prevZ = this.z;
    this.z += this.car.speed * 0.5;

    // 🔊 sound
    this.sound.update(this.car.rpm);

    // ⏱️ lap timer
    this.lapTimer.update(1 / 60);

    const currentPos = this.z % this.trackLength;
    const prevPos = prevZ % this.trackLength;

    if (currentPos < prevPos) {
      this.lapTimer.completeLap();
    }

    // 🛑 pit lane
    const inPitLane = currentPos > this.trackLength * 0.9;
    if (inPitLane) {
      this.car.speed = Math.min(this.car.speed, 60);
    }

    // 🚧 off-track penalty
    if (Math.abs(this.car.x) > 1.2) {
      this.car.speed *= 0.92;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    render(ctx, this.car, this.z);
  }
}