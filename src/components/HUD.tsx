type Props = {
  speed: number;
  gear: number;
  rpm: number;
  lap: number;
  lapTime: number;
  position: number;
  totalCars: number;
};

export default function HUD({
  speed,
  gear,
  rpm,
  lap,
  lapTime,
  position,
  totalCars,
}: Props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        color: "white",
        fontFamily: "monospace",
        fontSize: "18px",
        background: "rgba(0,0,0,0.4)",
        padding: "12px 16px",
        borderRadius: 10,
      }}
    >
      <div style={{ fontWeight: 700 }}>
        POS: {position}/{totalCars}
      </div>

      <div>SPEED: {Math.floor(speed)} km/h</div>
      <div>GEAR: {gear}</div>
      <div>RPM: {Math.floor(rpm)}</div>
      <div>LAP: {lap}</div>
      <div>TIME: {lapTime.toFixed(1)} s</div>

      {speed > 180 && (
        <div style={{ color: "#ff4d4d", marginTop: 6 }}>
          ⚠ HIGH SPEED
        </div>
      )}
    </div>
  );
}