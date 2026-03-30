export class Car {
  speed = 0;

  gear = 1;
  maxGear = 5;

  rpm = 1000;
  maxRPM = 8000;
  idleRPM = 1000;

  x = 0;

  // 🛞 tyre properties (default = medium)
  tyre = {
    grip: 1.0,
    accel: 1.0,
  };

  // 🔧 allow external setting (from menu later)
  setTyre(tyre: { grip: number; accel: number }) {
    this.tyre = tyre;
  }

  update(input: any) {
    // 🔊 RPM behavior (affected by tyre acceleration)
    if (input.accelerate) {
      this.rpm += 120 * this.tyre.accel;
    } else {
      this.rpm -= 100;
    }

    // clamp RPM
    this.rpm = Math.max(this.idleRPM, Math.min(this.maxRPM, this.rpm));

    // ⚙️ gear shifting
    if (this.rpm > 7000 && this.gear < this.maxGear) {
      this.gear++;
      this.rpm = 4000;
    }

    if (this.rpm < 2000 && this.gear > 1) {
      this.gear--;
      this.rpm = 3000;
    }

    // 🚗 speed logic (ONLY when accelerating)
    if (input.accelerate) {
      const gearFactor = this.gear * 0.5;

      this.speed =
        (this.rpm / this.maxRPM) * 120 * gearFactor;
    } else {
      // natural slowdown
      this.speed *= 0.97;
    }

    // 🛑 braking
    if (input.brake) {
      this.speed *= 0.9;
      this.rpm -= 200;
    }

    // clamp speed
    this.speed = Math.max(0, this.speed);

    // 🎮 steering (NOW affected by tyre grip)
    const steerStrength =
      (this.speed / 120) * this.tyre.grip;

    if (input.left) this.x -= 0.04 * steerStrength;
    if (input.right) this.x += 0.04 * steerStrength;

    // limit road bounds
    this.x = Math.max(-1.5, Math.min(1.5, this.x));
  }
}