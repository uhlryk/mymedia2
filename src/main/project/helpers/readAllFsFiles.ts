import path from "path";
import fs from "fs/promises"

export interface FileInfo {
    absolutePath: string;
    size: number;
}
export default async function readDirectory(directory: string): Promise<FileInfo[]> {
    const files = await fs.readdir(directory)
    const filesPromises = files.map(async (file) => {
        try {
            const absolutePath = path.join(directory, file);
            const fileStat = await fs.stat(absolutePath)
            if (fileStat.isDirectory()) {
                return await readDirectory(absolutePath);
            } else {
                const fileInfo: FileInfo = {
                    absolutePath,
                    size: fileStat.size
                }
                return fileInfo;
            }
        } catch (err) {
            // error handling
            return [];
        }
    });
    const filesWithArrays = await Promise.all(filesPromises)
    const flatArray = filesWithArrays.reduce<FileInfo[]>((acc, fileOrArray) => acc.concat(fileOrArray), []);
    return flatArray;
}
