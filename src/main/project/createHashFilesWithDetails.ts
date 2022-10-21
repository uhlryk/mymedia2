import path from "path";

export interface HashFiles {
    [filePath: string]: {
        relativePath: string;
        fileName: string;
        baseName: string;
        extension: string;
    }
}

export default function createHashFilesWithDetails(list: string[], projectPath: string) {
    const filesWithDetails = list.reduce<HashFiles>((acc, file) => {
        const relativePath = path.relative(projectPath, file);
        const { name: fileName, base: baseName, ext: extension } = path.parse(file)
        acc[relativePath] = {
            relativePath,
            fileName,
            baseName,
            extension,
        }
        return acc;
    }, {})

    return filesWithDetails;
}