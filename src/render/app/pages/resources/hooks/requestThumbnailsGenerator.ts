import { IResource } from '../../../../../shared/IResource';
import { requestThumbnails } from '../api/requestThumbnails';
import { countThumbnails } from './utils/countThumbnails';

type IInputRequestThumbnails = {
  projectFolderPath: string;
  resources: IResource[];
};

export async function* requestThumbnailsGenerator({
  projectFolderPath,
  resources,
}: IInputRequestThumbnails): AsyncIterable<IResource> {
  for (const resource of resources) {
    if (countThumbnails(resource.thumbnails) < 4) {
      // TODO: check if there is specified number of thumbnails e.g. 4 if less then we also need create missing thumbnails
      const updatedResource = await requestThumbnails(
        projectFolderPath,
        resource.id
      );
      if (!updatedResource) {
        continue;
      }
      yield updatedResource;
    }
  }
  return;
}
