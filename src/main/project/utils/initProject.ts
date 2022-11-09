import Store from '../Store';
import createFolderStructure from './syncResources/createFolderStructure';

export const initProject = async (
  projectPath: string,
  projectDataFolder: string,
  thumbnailFolder: string
): Promise<Store> => {
  await createFolderStructure(projectPath, projectDataFolder, thumbnailFolder);
  const store = new Store(projectPath, projectDataFolder);

  return store;
};
