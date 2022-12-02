import Store from '../Store';
import createFolderStructure from './syncResources/createFolderStructure';

export const initProject = async (
  projectDataPath: string,
  thumbnailFolder: string
): Promise<Store> => {
  await createFolderStructure(projectDataPath, thumbnailFolder);
  const store = new Store(projectDataPath);

  return store;
};
