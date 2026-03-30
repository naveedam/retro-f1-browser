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
    // 🗺️ set selected track
    setTrack(trackId);

    // update track length based on track
    this.trackLength = getTrackLength();
  }

  update() {
    this.car.update(input);

    const prevZ = this.z;

    // move forward
    this.z += this.car.speed * 0.5;

    // 🔊 engine sound
    this.sound.update(this.car.rpm);

    // ⏱️ lap timer
    this.lapTimer.update(1 / 60);

    // 🏁 lap detection
    const currentPos = this.z % this.trackLength;
    const prevPos = prevZ % this.trackLength;

    if (currentPos < prevPos) {
      this.lapTimer.completeLap();
    }

    // 🛑 pit lane (last 10%)
    const inPitLane = currentPos > this.trackLength * 0.9;

    if (inPitLane) {
      this.car.speed = Math.min(this.car.speed, 60);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    render(ctx, this.car, this.z);
  }
}