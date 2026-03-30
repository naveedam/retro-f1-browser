export class LapTimer {
  lap = 1;
  lapTime = 0;
  bestLap = Infinity;

  update(delta: number) {
    this.lapTime += delta;
  }

  completeLap() {
    this.bestLap = Math.min(this.bestLap, this.lapTime);
    this.lap++;
    this.lapTime = 0;
  }
}