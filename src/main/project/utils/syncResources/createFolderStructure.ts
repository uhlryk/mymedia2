import fs from 'fs/promises';
import path from 'path';

export default async function createFolderStructure(
  projectDataPath: string,
  thumbnailFolder: string
): Promise<void> {
  const absolutePath = path.resolve(
    projectDataPath,
    thumbnailFolder
  );
  await fs.mkdir(absolutePath, {
    recursive: true,
  });
}
