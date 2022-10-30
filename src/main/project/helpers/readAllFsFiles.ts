import path from "path";
import fs from "fs/promises"

export interface FileInfo {
    absolutePath: string;
    size: number;
}

export interface IInputReadDirectory {
    directory: string;
    excludeDirectoriesHash: Map<string, boolean>;
    acceptedFileExtensionsHash: Map<string, boolean>;
}

export default async function readDirectory({ directory, excludeDirectoriesHash, acceptedFileExtensionsHash }: IInputReadDirectory): Promise<FileInfo[]> {
    const files = await fs.readdir(directory)
    const filesPromises = files.map(async (file) => {
        try {
            if (excludeDirectoriesHash.has(file)) {
                return [];
            }
            const absolutePath = path.join(directory, file);
            const fileStat = await fs.stat(absolutePath)
            if (fileStat.isDirectory()) {
                return await readDirectory({ directory: absolutePath, excludeDirectoriesHash, acceptedFileExtensionsHash });
            } else {
                const extension = path.extname(absolutePath);
                if (!acceptedFileExtensionsHash.has(extension)) {
                    return [];
                }
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
