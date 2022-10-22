import { IResource } from "../../shared/IResource";
import { IResourceHash } from "./IResourceHash";

export interface IDiffResourceHashes {
    newFiles: IResourceHash;
    deleteFiles: IResourceHash;
    exisitingFiles: IResourceHash;
}
export default function createDiffResourceHashes(resourceHash: IResourceHash, filesDb: IResource[]): IDiffResourceHashes {

    const tempFiles: IResourceHash = { ...resourceHash };
    
    const deleteFiles: IResourceHash = {};
    const exisitingFiles: IResourceHash = {};

    filesDb.forEach(fileDb => {
        if(fileDb.relativePath in tempFiles) {
            exisitingFiles[fileDb.relativePath] = fileDb;
            exisitingFiles[fileDb.relativePath].size = tempFiles[fileDb.relativePath].size;
            delete tempFiles[fileDb.relativePath];
        } else {
            deleteFiles[fileDb.relativePath] = fileDb;
        }
    });
    const newFiles: IResourceHash = { ...tempFiles };

    return {
        newFiles,
        deleteFiles,
        exisitingFiles
    }
}