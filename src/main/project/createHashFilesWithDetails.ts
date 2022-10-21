import path from "path";
import IFileDetails from "../../shared/IFIleDetails";
import { FileInfo } from "./readAllFsFiles";

export interface IHashFiles {
    [filePath: string]: IFileDetails
}

export default function createHashFilesWithDetails(list: FileInfo[], projectPath: string): IHashFiles {
    const filesWithDetails = list.reduce<IHashFiles>((acc, fileInfo) => {
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