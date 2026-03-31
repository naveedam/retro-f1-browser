export class AICar {
  z = Math.random() * 200; // slight stagger start
  speed = 80 + Math.random() * 40;
  lane = (Math.random() - 0.5) * 1.5;

  lap = 1;

  update(trackLength: number) {
    this.z += this.speed * 0.5;

    if (this.z > trackLength) {
      this.z -= trackLength;
      this.lap++;
    }
  }

  getDistance(trackLength: number) {
    return this.lap * trackLength + this.z;
  }
}