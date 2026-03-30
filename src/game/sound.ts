export class EngineSound {
  audioCtx: AudioContext;
  oscillator: OscillatorNode;
  gainNode: GainNode;

  constructor() {
    this.audioCtx = new AudioContext();

    this.oscillator = this.audioCtx.createOscillator();
    this.gainNode = this.audioCtx.createGain();

    this.oscillator.type = "sawtooth";

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);

    this.gainNode.gain.value = 0.15;

    this.oscillator.start();
  }

  update(rpm: number) {
    const frequency =
      80 + Math.pow(rpm / 8000, 1.5) * 1200;

    this.oscillator.frequency.setValueAtTime(
      frequency,
      this.audioCtx.currentTime
    );
  }

  start() {
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }
}