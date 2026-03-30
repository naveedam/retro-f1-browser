export default function HUD({ speed, gear, rpm, lap, lapTime }: any) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        color: "white",
        fontFamily: "monospace",
        fontSize: "18px",
      }}
    >
      <div>SPEED: {Math.floor(speed)} km/h</div>
      <div>GEAR: {gear}</div>
      <div>RPM: {Math.floor(rpm)}</div>
      <div>LAP: {lap}</div>
      <div>TIME: {lapTime.toFixed(1)} s</div>
    </div>
  );
}