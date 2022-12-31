import * as path from 'path';
import fs from 'fs/promises';
import { IResource } from '../../../../shared/IResource';
import getMetadata, { IMetadata } from './getMetadata';
import { generateAllVideoThumbnails } from './generateAllVideoThumbnails';
import Project from '../../Project';
import generateMainThumbnail from './generateMainThumbnail';

export interface ResourceExtraParts extends IMetadata {
  mainThumbnail: string;
}
export const calculateFastMainThumbnail = async (
  projectPath: string,
  resource: IResource
): Promise<ResourceExtraParts> => {
  console.log(`[calculateFastMainThumbnail] start ${resource.id}`);
  const absoluteResourcePath = getAbsoluteResourcePath(
    projectPath,
    resource.relativePath
  );

  console.log(`[calculateFastMainThumbnail] start thumbnails ${resource.id}`);
  const thumbnailAbsoluteFolderPath = path.join(
    projectPath,
    Project.PROJECT_DATA_FOLDER,
    Project.MAIN_THUMBNAIL_FOLDER,
    resource.id
  );
  await fs.rmdir(thumbnailAbsoluteFolderPath, { recursive: true });
  await fs.mkdir(thumbnailAbsoluteFolderPath, { recursive: true });

  const fileName = 'main.jpg';
  const thumbnailAbsolutePath = path.join(
    thumbnailAbsoluteFolderPath, fileName
  );
  await generateMainThumbnail(
    absoluteResourcePath,
    thumbnailAbsolutePath,
  );

  console.log(`[calculateFastMainThumbnail] finished thumbnails ${resource.id}`);
  const updatedResourceParts = {
    mainThumbnail: path.join(Project.PROJECT_DATA_FOLDER, Project.MAIN_THUMBNAIL_FOLDER, resource.id, fileName),
  };

  return updatedResourceParts;
};


const getAbsoluteResourcePath = (
  projectPath: string,
  resourceRelativePath: string
) => path.join(projectPath, resourceRelativePath);

