import * as path from 'path';
import { IResource } from '../../../../shared/IResource';
import getMetadata, { IMetadata } from './getMetadata';
import { generateAllVideoThumbnails } from './generateAllVideoThumbnails';

export interface ResourceExtraParts extends IMetadata {
  thumbnails: string[];
}
export const calculateExtraResourceProps = async (
  projectPath: string,
  resource: IResource
): Promise<ResourceExtraParts> => {
  const absoluteResourcePath = getAbsoluteResourcePath(
    projectPath,
    resource.relativePath
  );

  try {
    const metadata = await getMetadata(absoluteResourcePath);

    const thumbnails = await generateAllVideoThumbnails({
      projectPath,
      absoluteResourcePath,
      resourceId: resource.id,
      duration: metadata.duration,
    });

    const updatedResourceParts = {
      thumbnails,
      ...metadata,
    };
    return updatedResourceParts;
  } catch (err) {
    console.log(err);
  }
};


const getAbsoluteResourcePath = (
  projectPath: string,
  resourceRelativePath: string
) => path.join(projectPath, resourceRelativePath);

