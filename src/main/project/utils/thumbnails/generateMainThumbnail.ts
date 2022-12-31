import fs from 'fs/promises';
import { spawn } from 'child_process';
import * as path from 'path';

export default async function generateMainThumbnail(
  sourceFilePath: string,
  targetThumbnailPath: string,
): Promise<void> {


  const options = [
    "-ss",
    "0",
    "-i",
    sourceFilePath,
    "-vframes:v",
    "1",
    targetThumbnailPath
  ];
  console.log("[generateMainThumbnail] ffmpeg" + options.join(" "));
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
