import { IResource } from "../../shared/IResource";
import { IHashFiles } from "./createHashFilesWithDetails";

export interface IResourceHash {
    [filePath: string]: IResource
}
export default function createDiffFSDb(hashFilesFs: IHashFiles, filesDb: IResource[]) {
    const newFiles: IResourceHash = {};
    const deleteFiles: IResourceHash = {};
    const exisitingFiles: IResourceHash = {};


    return {
        newFiles,
        deleteFiles,
        exisitingFiles
    }
}