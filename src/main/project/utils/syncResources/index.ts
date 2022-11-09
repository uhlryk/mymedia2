import Project from '../../Project';
import readDirectory from './readDirectory';
import createFileDetailsHash from './createFileDetailsHash';
import createDiffResourceHashes from './createDiffResourceHashes';
import { IResource } from '../../../../shared/IResource';

export const syncResources = async (
  projectPath: string,
  resourceList: IResource[]
): Promise<IResource[]> => {
  const allFilesFromFs = await readDirectory({
    directory: projectPath,
    excludeDirectoriesHash: new Map([[Project.PROJECT_DATA_FOLDER, true]]),
    acceptedFileExtensionsHash: new Map(
      Project.EXTENSIONS_FOR_THUMBNAILS.map((extension) => [extension, true])
    ),
  });
  const fileDetailsHash = createFileDetailsHash(allFilesFromFs, projectPath);
  const diffResourceHashes = createDiffResourceHashes(
    fileDetailsHash,
    resourceList
  );
  const updatedResourceList: IResource[] = Object.values({
    ...diffResourceHashes.exisitingFiles,
    ...diffResourceHashes.newFiles,
  });
  return updatedResourceList;
};
