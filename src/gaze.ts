/**
 * Gaze mapping for the hero portrait.
 *
 * The 64 frames (frame-00 .. frame-63) go clockwise on screen, but they are NOT evenly spaced in gaze angle:
 * the lower half of the circle is covered by the first ~26 frames, so a plain `index = angle / 360 * 64`
 * makes the head look about 20-30 degrees higher than the pointer on the left side (pointer bottom-left,
 * head looks up-left). The anchors below were read from the frames themselves: for a chosen frame, the
 * screen direction it actually looks toward (0 = right, 90 = down, 180 = left, 270 = up).
 * Between anchors the angle is interpolated linearly. Re-measure these if the frames are ever replaced.
 */
export const FRAME_COUNT = 64;

/** Where the eyes are in the (front-facing) frame, as a fraction of the frame's width and height. */
export const EYES = { x: 0.476, y: 0.374 };

/** [frame index, the screen direction in degrees that frame looks toward]; the last entry wraps to frame 0. */
const GAZE_ANCHORS: readonly (readonly [number, number])[] = [
  [0, 5], [4, 25], [8, 55], [12, 88], [16, 105], [20, 125], [22, 135], [24, 150], [26, 170], [28, 188],
  [30, 197], [32, 206], [34, 216], [36, 225], [38, 235], [40, 242], [42, 250], [44, 262], [46, 270],
  [48, 275], [50, 280], [52, 285], [54, 290], [56, 310], [58, 325], [60, 338], [62, 350], [64, 365],
];

const mod = (value: number, base: number) => ((value % base) + base) % base;

/** The frame that looks toward `degrees` (screen angle of the pointer seen from the eyes). */
export function frameForAngle(degrees: number): number {
  let angle = mod(degrees, 360);
  if (angle < GAZE_ANCHORS[0][1]) angle += 360;
  for (let i = 0; i < GAZE_ANCHORS.length - 1; i += 1) {
    const [frameA, gazeA] = GAZE_ANCHORS[i];
    const [frameB, gazeB] = GAZE_ANCHORS[i + 1];
    if (angle >= gazeA && angle <= gazeB) {
      return mod(Math.round(frameA + ((angle - gazeA) / (gazeB - gazeA)) * (frameB - frameA)), FRAME_COUNT);
    }
  }
  return 0;
}

/** The direction (degrees) a frame looks toward. Used by the dev overlay. */
export function gazeOfFrame(frame: number): number {
  const target = mod(frame, FRAME_COUNT);
  for (let i = 0; i < GAZE_ANCHORS.length - 1; i += 1) {
    const [frameA, gazeA] = GAZE_ANCHORS[i];
    const [frameB, gazeB] = GAZE_ANCHORS[i + 1];
    if (target >= frameA && target <= frameB) return mod(gazeA + ((target - frameA) / (frameB - frameA)) * (gazeB - gazeA), 360);
  }
  return 0;
}
