import path from 'path';
import { IFileDetailsHash } from '../../interfaces';
import { FileInfo } from './readDirectory';

export default function createFileDetailsHash(
  list: FileInfo[],
  projectPath: string
): IFileDetailsHash {
  const filesWithDetails = list.reduce<IFileDetailsHash>((acc, fileInfo) => {
    const relativePath = path.relative(projectPath, fileInfo.absolutePath);
    const {
      name,
      base: baseName,
      ext: extension,
    } = path.parse(fileInfo.absolutePath);
    acc[relativePath] = {
      relativePath,
      name,
      baseName,
      extension,
      size: fileInfo.size,
    };
    return acc;
  }, {});
  return filesWithDetails;
}
