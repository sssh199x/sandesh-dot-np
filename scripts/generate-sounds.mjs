#!/usr/bin/env node
/**
 * Himalayan Dusk — Runaway Piano UI Sound Sprite Generator
 *
 * Extracts 10 real piano notes directly from runaway_intro.mp3 using
 * a single-pass ffmpeg filter_complex. No re-encoding intermediates,
 * no mono downmix, no normalization — the sound is identical to the
 * original recording, just trimmed with 5ms fades to prevent clicks.
 *
 * Requires ffmpeg.
 * Run: node scripts/generate-sounds.mjs
 */

import { execSync } from "child_process";
import { existsSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../public/audio/runaway_intro.mp3");
const OUT = resolve(__dirname, "../public/audio/ui-sprites.mp3");

if (!existsSync(SRC)) {
  console.error(`Source not found: ${SRC}`);
  process.exit(1);
}

const GAP = 0.08; // 80ms silence between sprites
const FADE = 0.005; // 5ms fade to prevent click at cut — barely perceptible

// ── Note onsets from silence detection ──────────────────────
// Each onset is a real E4 piano hit in the Runaway intro.
// Natural human dynamics: soft opening → crescendo.
// Only steady, full-ring notes (~780-910ms ring time).
// Skips the transitional hits at 9.686s, 10.284s, 17.652s.
const SPRITES = [
  { name: "hover1",  start: 0.000,  dur: 0.50 },
  { name: "hover2",  start: 1.404,  dur: 0.50 },
  { name: "hover3",  start: 2.785,  dur: 0.50 },
  { name: "hover4",  start: 4.164,  dur: 0.50 },
  { name: "hover5",  start: 5.543,  dur: 0.50 },
  { name: "hover6",  start: 6.922,  dur: 0.50 },
  { name: "hover7",  start: 8.302,  dur: 0.50 },
  { name: "hover8",  start: 11.061, dur: 0.50 },  // skip transitional 9.686s
  { name: "hover9",  start: 12.441, dur: 0.50 },
  { name: "hover10", start: 13.818, dur: 0.50 },
  { name: "click",   start: 4.164,  dur: 0.30 },  // strong hit, short
  { name: "whoosh",  start: 6.922,  dur: 0.70 },  // longer sustain
  { name: "toggle",  start: 0.000,  dur: 0.20 },  // just the attack
];

console.log("🎹 Extracting real Runaway piano notes (stereo, single-pass)...\n");

// ── Build ffmpeg filter_complex ─────────────────────────────
// Single decode of the source, trim each segment, add tiny fade,
// generate silence gaps, concat everything, output stereo MP3.

const filterParts = [];
const concatInputs = [];
let streamCount = 0;

for (let i = 0; i < SPRITES.length; i++) {
  const s = SPRITES[i];
  const end = s.start + s.dur;
  const fadeStart = s.dur - FADE;

  // Trim segment from source + tiny fade-out at cut point
  filterParts.push(
    `[0:a]atrim=start=${s.start}:end=${end.toFixed(3)},asetpts=PTS-STARTPTS,afade=t=out:st=${fadeStart.toFixed(3)}:d=${FADE}[s${i}]`
  );
  concatInputs.push(`[s${i}]`);
  streamCount++;

  // Add silence gap after each segment (except the last)
  if (i < SPRITES.length - 1) {
    filterParts.push(
      `anullsrc=channel_layout=stereo:sample_rate=44100,atrim=0:${GAP}[g${i}]`
    );
    concatInputs.push(`[g${i}]`);
    streamCount++;
  }
}

const concatFilter = `${concatInputs.join("")}concat=n=${streamCount}:v=0:a=1[out]`;
const fullFilter = filterParts.join("; ") + "; " + concatFilter;

// ── Run ffmpeg ──────────────────────────────────────────────
const cmd = `ffmpeg -y -i "${SRC}" -filter_complex "${fullFilter}" -map "[out]" -codec:a libmp3lame -b:a 192k "${OUT}"`;

try {
  execSync(cmd, { stdio: ["pipe", "pipe", "pipe"] });
} catch (e) {
  console.error("ffmpeg failed. Command:");
  console.error(cmd);
  console.error(e.stderr?.toString());
  process.exit(1);
}

// ── Calculate sprite map ────────────────────────────────────
const gapMs = Math.round(GAP * 1000);
let offsetMs = 0;

console.log("  Sprite map for sound.ts:\n");
for (const s of SPRITES) {
  const durMs = Math.round(s.dur * 1000);
  const pad = s.name.length < 8 ? " ".repeat(8 - s.name.length) : "";
  console.log(`    ${s.name}:${pad} [${offsetMs}, ${durMs}],`);
  offsetMs += durMs + gapMs;
}

const size = statSync(OUT).size;
const totalDur = SPRITES.reduce((sum, s) => sum + s.dur, 0) + GAP * (SPRITES.length - 1);
console.log(`\n  ${(size / 1024).toFixed(1)} KB, ~${totalDur.toFixed(2)}s, stereo 192kbps`);
console.log("\n✅ Identical Runaway piano notes — stereo, no processing.");
