import path from "path";
import fs from "fs/promises"

export default async function readDirectory(directory: string): Promise<string[]> {
    const files = await fs.readdir(directory)
    const filesPromises = files.map(async (file) => {
        try {
            const absolutePath = path.join(directory, file);
            const fileStat = await fs.stat(absolutePath)
            if (fileStat.isDirectory()) {
                return await readDirectory(absolutePath);
            } else {
                return absolutePath;
            }
        } catch (err) {
            // error handling
            return [];
        }
    });
    const filesWithArrays = await Promise.all(filesPromises)
    const flatArray = filesWithArrays.reduce<string[]>((acc, fileOrArray) => acc.concat(fileOrArray), []);
    return flatArray;
}
