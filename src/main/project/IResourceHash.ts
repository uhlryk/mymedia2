import { IResource } from "../../shared/IResource";

export type RelativeFilePath = string;

export interface IResourceHash {
    [relativeFilePath: RelativeFilePath]: IResource
}