import { useState } from "react";
import { tracks } from "../game/tracks";

type Tyre = "soft" | "medium" | "hard";

type Props = {
  onStart: (trackId: string, tyre: Tyre) => void;
};

export default function Menu({ onStart }: Props) {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedTyre, setSelectedTyre] = useState<Tyre>("medium");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617, #0f172a)",
        color: "white",
        padding: "40px",
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ fontSize: 42, marginBottom: 30 }}>
        🏎️ Retro F1
      </h1>

      {/* TRACK GRID */}
      <h2 style={{ marginBottom: 15 }}>Select Track</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        {tracks.map((track) => {
          const selected = selectedTrack === track.id;

          return (
            <div
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              style={{
                position: "relative",
                height: 140,
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                border: selected
                  ? "3px solid #38bdf8"
                  : "1px solid #334155",
                transform: selected ? "scale(1.03)" : "scale(1)",
                transition: "0.2s",
              }}
            >
              {/* image */}
              <img
                src={track.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.8,
                }}
              />

              {/* overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 10,
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.7))",
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {track.name}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {track.type}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TYRES */}
      <h2 style={{ marginBottom: 15 }}>Select Tyre</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        {(["soft", "medium", "hard"] as Tyre[]).map((t) => {
          const selected = selectedTyre === t;

          return (
            <button
              key={t}
              onClick={() => setSelectedTyre(t)}
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: selected ? "#38bdf8" : "#1e293b",
                color: selected ? "#000" : "#fff",
                fontWeight: 600,
              }}
            >
              {t.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* START */}
      <button
        disabled={!selectedTrack}
        onClick={() =>
          selectedTrack && onStart(selectedTrack, selectedTyre)
        }
        style={{
          padding: "16px 32px",
          fontSize: 18,
          borderRadius: 12,
          border: "none",
          cursor: selectedTrack ? "pointer" : "not-allowed",
          background: selectedTrack ? "#22c55e" : "#334155",
          color: "white",
          fontWeight: 600,
        }}
      >
        Start Race
      </button>
    </div>
  );
}