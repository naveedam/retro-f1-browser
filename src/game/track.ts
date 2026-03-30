import { tracks } from "./tracks";

type Segment = {
  length: number;
  curve: number;
};

function buildTrack(type: string): Segment[] {
  switch (type) {
    case "fast":
      return [
        { length: 1200, curve: 0 },
        { length: 300, curve: 0.5 },
        { length: 1000, curve: 0 },
      ];

    case "technical":
      return [
        { length: 300, curve: 1.5 },
        { length: 200, curve: -1.2 },
        { length: 400, curve: 1.0 },
        { length: 200, curve: -1.5 },
      ];

    case "street":
      return [
        { length: 400, curve: 1.2 },
        { length: 300, curve: -1.3 },
        { length: 300, curve: 0.8 },
      ];

    case "flow":
      return [
        { length: 800, curve: 0.7 },
        { length: 800, curve: -0.7 },
        { length: 800, curve: 0.5 },
      ];

    default:
      return [
        { length: 600, curve: 0 },
        { length: 400, curve: 0.6 },
        { length: 600, curve: 0 },
      ];
  }
}

let currentTrackSegments: Segment[] = buildTrack("balanced");

export function setTrack(trackId: string) {
  const track = tracks.find((t) => t.id === trackId);
  currentTrackSegments = buildTrack(track?.type || "balanced");
}

export function getTrackLength() {
  return currentTrackSegments.reduce((sum, s) => sum + s.length, 0);
}

export function getTrackInfo(z: number) {
  const total = getTrackLength();
  let distance = z % total;

  for (const segment of currentTrackSegments) {
    if (distance < segment.length) return segment;
    distance -= segment.length;
  }

  return currentTrackSegments[0];
}