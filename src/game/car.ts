export class Car {
  speed = 0;

  gear = 1;
  maxGear = 5;

  rpm = 1000;
  maxRPM = 8000;
  idleRPM = 1000;

  x = 0;

  tyre = {
    grip: 1.0,
    accel: 1.0,
  };

  setTyre(tyre: { grip: number; accel: number }) {
    this.tyre = tyre;
  }

  update(input: any) {
    if (input.accelerate) {
      this.rpm += 120 * this.tyre.accel;
    } else {
      this.rpm -= 100;
    }

    this.rpm = Math.max(this.idleRPM, Math.min(this.maxRPM, this.rpm));

    if (this.rpm > 7000 && this.gear < this.maxGear) {
      this.gear++;
      this.rpm = 4000;
    }

    if (this.rpm < 2000 && this.gear > 1) {
      this.gear--;
      this.rpm = 3000;
    }

    if (input.accelerate) {
      const gearFactor = this.gear * 0.5;
      this.speed =
        (this.rpm / this.maxRPM) * 120 * gearFactor;
    } else {
      this.speed *= 0.97;
    }

    if (input.brake) {
      this.speed *= 0.9;
      this.rpm -= 200;
    }

    this.speed = Math.max(0, this.speed);

    const steerStrength =
      (this.speed / 120) * this.tyre.grip;

    if (input.left) this.x -= 0.04 * steerStrength;
    if (input.right) this.x += 0.04 * steerStrength;

    this.x = Math.max(-1.5, Math.min(1.5, this.x));
  }
}