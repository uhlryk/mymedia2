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
  console.log(`[calculateExtraResourceProps] start ${resource.id}`);
  const absoluteResourcePath = getAbsoluteResourcePath(
    projectPath,
    resource.relativePath
  );
  console.log(`[calculateExtraResourceProps] start metadata ${resource.id}`);
  const metadata = await getMetadata(absoluteResourcePath);

  console.log(`[calculateExtraResourceProps] start thumbnails ${resource.id}`);
  const thumbnails = await generateAllVideoThumbnails({
    projectPath,
    absoluteResourcePath,
    resourceId: resource.id,
    duration: metadata.duration,
  });

  console.log(`[calculateExtraResourceProps] finished thumbnails ${resource.id}`);
  const updatedResourceParts = {
    thumbnails,
    ...metadata,
  };
  return updatedResourceParts;
};


const getAbsoluteResourcePath = (
  projectPath: string,
  resourceRelativePath: string
) => path.join(projectPath, resourceRelativePath);

