import crypto from 'crypto';
import { IFileDetailsHash, IResourceHash } from '../../interfaces';
import { IResource } from '../../../../shared/IResource';

export default function convertFileDetailsHashToResourceHash(
  fileDetailsHash: IFileDetailsHash
): IResourceHash {
  return Object.entries(fileDetailsHash).reduce<{
    [key: string]: IResource;
  }>((acc, [filePath, fileDetails]) => {
    acc[filePath] = {
      id: crypto.createHash('md5').update(fileDetails.relativePath).digest("hex"),
      details: '',
      rating: 0,
      tags: [],
      ...fileDetails,
    };
    return acc;
  }, {});
}
