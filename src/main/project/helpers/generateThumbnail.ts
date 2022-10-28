import fs from "fs/promises";
import { spawn } from "child_process";
import * as ffmpeg from "ffmpeg-static-electron";
import * as path from "path";

export default async function generateThumbnail(sourceFilePath: string, targetSpecificThumbnailPath: string, videoTime: number): Promise<boolean> {
    const specificThumbnailFolderPath: string = path.dirname(targetSpecificThumbnailPath);
    await fs.mkdir(specificThumbnailFolderPath, { recursive: true });

    const childProcess = spawn(ffmpeg.path, [
        // "-nostats",
        // "-loglevel",
        // "panic",
        "-ss",
        "10",
        "-i",
        sourceFilePath,
        "-vframes:v",
        "1",
        // "-q:v",
        // "2",
        // "-s",
        // "480x320",
        targetSpecificThumbnailPath
    ]);
    await new Promise<void>((resolve, reject) => {
        childProcess.on("exit", statusCode => {
            console.log("exit", statusCode);
        });
        childProcess.stderr.on("data", err => {
            if (err && err.toString()) {
                console.log("STERR DATA", err.toString());
            }
            console.log("STERR DATA", err);
        });
        childProcess.stdout.on("data", data => {
            console.log("STOUT DATA", data);
        });

        childProcess.on("close", code => {
            console.log("CLOSE", code);
            if (code === 0) {
                console.log("conversion successful");
                resolve();
            } else {
                reject();
            }
        });
    });

    console.log("Thumbnail should be ready");
    const isThumbnailFile = await fs.stat(targetSpecificThumbnailPath);
    if (isThumbnailFile) {
        return true;
    } else {
        console.log("Thumbnail doesn't exist");
        return false;
    }
}
