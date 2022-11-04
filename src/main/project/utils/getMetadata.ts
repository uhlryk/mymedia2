import { spawn } from 'child_process';

export interface IMetadata {
  width?: number;
  height?: number;
  duration?: number;
}
export default async function getMetadata(
  sourceFilePath: string
): Promise<IMetadata> {
  const childProcess = spawn('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height,duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    sourceFilePath,
  ]);
  return await new Promise((resolve, reject) => {
    const metadata: IMetadata = {};
    childProcess.stdout.on('data', (data: string) => {
      if (data) {
        const dataArray = data.toString().split(/[^0-9.]/g);
        metadata.width = parseInt(dataArray[0], 10);
        metadata.height = parseInt(dataArray[1], 10);
        metadata.duration = parseInt(dataArray[2], 10);
      }
    });

    // childProcess.stderr.on("data", data => {
    //     console.error(`stderr: ${data}`);
    // });

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve(metadata);
      } else {
        reject();
      }
    });
  });
}
