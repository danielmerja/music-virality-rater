import {
  Input,
  ALL_FORMATS,
  BlobSource,
  Output,
  BufferTarget,
  Mp3OutputFormat,
  Conversion,
  canEncodeAudio,
} from "mediabunny";
import { registerMp3Encoder } from "@mediabunny/mp3-encoder";

let mp3EncoderRegistered = false;

async function ensureMp3Encoder() {
  if (mp3EncoderRegistered) return;
  if (!(await canEncodeAudio("mp3"))) {
    registerMp3Encoder();
  }
  mp3EncoderRegistered = true;
}

/**
 * Clips an audio file to the specified time range and encodes it as a mono MP3.
 *
 * Uses mediabunny for trimming + MP3 encoding in a single pass.
 * Output sizes at 128kbps mono: ~480KB for 30s, ~240KB for 15s.
 */
export async function clipAudio(
  file: File,
  startTime: number,
  endTime: number,
): Promise<File> {
  await ensureMp3Encoder();

  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
  });
  const output = new Output({
    format: new Mp3OutputFormat(),
    target: new BufferTarget(),
  });

  const conversion = await Conversion.init({
    input,
    output,
    trim: { start: startTime, end: endTime },
    audio: {
      numberOfChannels: 1,
      sampleRate: 44100,
      bitrate: 128_000,
    },
  });

  await conversion.execute();

  const buffer = output.target.buffer!;
  return new File([buffer], "clip.mp3", { type: "audio/mpeg" });
}
