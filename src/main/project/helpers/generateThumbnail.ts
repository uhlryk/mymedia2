import fs from 'fs/promises';
import { spawn } from 'child_process';
import * as path from 'path';

export default async function generateThumbnail(
  sourceFilePath: string,
  targetSpecificThumbnailPath: string,
  videoTime: number
): Promise<boolean> {
  const specificThumbnailFolderPath: string = path.dirname(
    targetSpecificThumbnailPath
  );
  await fs.mkdir(specificThumbnailFolderPath, { recursive: true });
  const childProcess = spawn('ffmpeg', [
    // "-nostats",
    // "-loglevel",
    // "panic",
    '-ss',
    videoTime.toString(),
    '-i',
    sourceFilePath,
    '-vframes:v',
    '1',
    // "-q:v",
    // "2",
    // "-s",
    // "480x320",
    targetSpecificThumbnailPath,
  ]);
  await new Promise<void>((resolve, reject) => {
    // childProcess.stderr.on("data", err => {
    //     if (err && err.toString()) {
    //         console.log("STERR DATA", err.toString());
    //     }
    // });

    childProcess.on('close', (code) => {
      // console.log("CLOSE", code);
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });

  console.log('Thumbnail should be ready');
  const isThumbnailFile = await fs.stat(targetSpecificThumbnailPath);
  if (isThumbnailFile) {
    return true;
  } else {
    console.log("Thumbnail doesn't exist");
    return false;
  }
}
