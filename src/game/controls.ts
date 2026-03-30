export const input = {
  accelerate: false,
  brake: false,
  left: false,
  right: false,
};

export function initControls() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") input.accelerate = true;
    if (e.key === "ArrowDown") input.brake = true;
    if (e.key === "ArrowLeft") input.left = true;
    if (e.key === "ArrowRight") input.right = true;
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") input.accelerate = false;
    if (e.key === "ArrowDown") input.brake = false;
    if (e.key === "ArrowLeft") input.left = false;
    if (e.key === "ArrowRight") input.right = false;
  });
}

// 🔊 ADD THIS (missing earlier)
let soundStarted = false;

export function setSoundStarter(startFn: () => void) {
  window.addEventListener("keydown", () => {
    if (!soundStarted) {
      startFn();
      soundStarted = true;
    }
  });
}