import { IResource } from '../../../shared/IResource';
import { IFileDetailsHash, IResourceHash } from '../interfaces';
import convertFileDetailsHashToResourceHash from './convertFileDetailsHashToResourceHash';

export interface IDiffResourceHashes {
  newFiles: IResourceHash;
  deleteFiles: IResourceHash;
  exisitingFiles: IResourceHash;
}
export default function createDiffResourceHashes(
  fileDetailsHash: IFileDetailsHash,
  filesDb: IResource[]
): IDiffResourceHashes {
  const tempFiles: IFileDetailsHash = {
    ...fileDetailsHash,
  };

  const deleteFiles: IResourceHash = {};
  const exisitingFiles: IResourceHash = {};

  filesDb.forEach((fileDb) => {
    if (fileDb.relativePath in tempFiles) {
      exisitingFiles[fileDb.relativePath] = fileDb;
      exisitingFiles[fileDb.relativePath].size =
        tempFiles[fileDb.relativePath].size;
      delete tempFiles[fileDb.relativePath];
    } else {
      deleteFiles[fileDb.relativePath] = fileDb;
    }
  });
  const newFiles: IResourceHash =
    convertFileDetailsHashToResourceHash(tempFiles);

  return {
    newFiles,
    deleteFiles,
    exisitingFiles,
  };
}
