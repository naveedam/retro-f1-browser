export default function HUD(props: any) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        color: "white",
        fontFamily: "system-ui",
        background: "rgba(0,0,0,0.6)",
        padding: "12px 16px",
        borderRadius: 12,
        width: 180,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 700 }}>
        P{props.position}
      </div>

      <div style={{ marginTop: 8 }}>
        {Math.floor(props.speed)} km/h
      </div>

      <div>Gear {props.gear}</div>
      <div>Lap {props.lap}</div>

      <div style={{ marginTop: 6, fontSize: 12 }}>
        {props.lapTime.toFixed(1)} s
      </div>
    </div>
  );
}