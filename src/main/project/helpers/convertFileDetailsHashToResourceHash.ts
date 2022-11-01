import { v4 as uuidv4 } from "uuid";
import { IFileDetailsHash, IResourceHash } from "../interfaces";
import { IResource } from "../../../shared/IResource";

export default function convertFileDetailsHashToResourceHash(
  fileDetailsHash: IFileDetailsHash
): IResourceHash {
  return Object.entries(fileDetailsHash).reduce<{
    [key: string]: IResource;
  }>((acc, [filePath, fileDetails]) => {
    acc[filePath] = {
      id: uuidv4(),
      ...fileDetails
    };
    return acc;
  }, {});
}
