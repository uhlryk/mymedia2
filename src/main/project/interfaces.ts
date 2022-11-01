import { IFileDetails } from "../../shared/IFileDetails";
import { IResource } from "../../shared/IResource";

export type RelativeFilePath = string;

export interface IFileDetailsHash {
  [relativeFilePath: RelativeFilePath]: IFileDetails;
}

export interface IResourceHash {
  [relativeFilePath: RelativeFilePath]: IResource;
}
