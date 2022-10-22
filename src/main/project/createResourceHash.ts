import path from "path";
import { IResourceHash } from "./IResourceHash";
import { FileInfo } from "./readAllFsFiles";

export default function createResourceHash(list: FileInfo[], projectPath: string): IResourceHash {
    const filesWithDetails = list.reduce<IResourceHash>((acc, fileInfo) => {
        const relativePath = path.relative(projectPath, fileInfo.absolutePath);
        const { name: fileName, base: baseName, ext: extension } = path.parse(fileInfo.absolutePath)
        acc[relativePath] = {
            relativePath,
            fileName,
            baseName,
            extension,
            size: fileInfo.size
        }
        return acc;
    }, {})
    return filesWithDetails;
}