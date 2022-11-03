import fs from 'fs/promises';
import path from 'path';

export default async function createFolderStructure(
  projectFolder: string,
  projectDataFolder: string,
  thumbnailFolder: string
) {
  const absolutePath = path.resolve(
    projectFolder,
    projectDataFolder,
    thumbnailFolder
  );
  await fs.mkdir(absolutePath, {
    recursive: true,
  });
}
