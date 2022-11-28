import fs from 'fs/promises';
import { spawn } from 'child_process';
import * as path from 'path';

export default async function generateAllThumbnails(
  sourceFilePath: string,
  targetTemplateThumbnailAbsolutePath: string,
  framePerSec: number
): Promise<void> {


  const options = [
    '-i',
    sourceFilePath,
    '-vframes',
    '4',
    '-vf',
    `fps=${framePerSec}`,
    targetTemplateThumbnailAbsolutePath,
  ];
  console.log(options.join(" "));
  const childProcess = spawn('ffmpeg', options);
  await new Promise<void>((resolve, reject) => {
    // childProcess.stderr.on("data", err => {
    //   if (err && err.toString()) {
    //     console.log("STERR DATA", err.toString());
    //   }
    // });
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });

  console.log('Thumbnail should be ready');
}
