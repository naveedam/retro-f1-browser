type Segment = {
  length: number;
  curve: number;
  difficulty: number; // new!
};

type TrackMap = Record<string, Segment[]>;

const TRACKS: TrackMap = {
  monaco: [
    { length: 200, curve: 1.8, difficulty: 1.5 },
    { length: 150, curve: -1.6, difficulty: 1.5 },
    { length: 300, curve: 0.8, difficulty: 1.2 },
    { length: 150, curve: -2.0, difficulty: 1.8 },
    { length: 200, curve: 1.5, difficulty: 1.5 },
  ],

  monza: [
    { length: 1200, curve: 0, difficulty: 0.5 },
    { length: 300, curve: 0.6, difficulty: 0.8 },
    { length: 1000, curve: 0, difficulty: 0.5 },
    { length: 250, curve: -0.7, difficulty: 0.9 },
  ],

  spa: [
    { length: 800, curve: 0.7, difficulty: 1.0 },
    { length: 600, curve: -0.8, difficulty: 1.0 },
    { length: 900, curve: 0.5, difficulty: 0.8 },
  ],
};

let currentTrack: Segment[] = TRACKS.monza;

export function setTrack(trackId: string) {
  currentTrack = TRACKS[trackId] || TRACKS.monza;
}

export function getTrackLength() {
  return currentTrack.reduce((sum, s) => sum + s.length, 0);
}

export function getTrackInfo(z: number) {
  const total = getTrackLength();
  let distance = z % total;

  for (const segment of currentTrack) {
    if (distance < segment.length) return segment;
    distance -= segment.length;
  }

  return currentTrack[0];
}