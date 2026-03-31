export type RaceState = "grid" | "countdown" | "race";

export class RaceManager {
  state: RaceState = "grid";
  countdown = 3;
  timer = 0;

  update(delta: number) {
    if (this.state === "countdown") {
      this.timer += delta;

      if (this.timer > 1) {
        this.countdown--;
        this.timer = 0;

        if (this.countdown <= 0) {
          this.state = "race";
        }
      }
    }
  }

  startCountdown() {
    this.state = "countdown";
    this.countdown = 3;
    this.timer = 0;
  }
}