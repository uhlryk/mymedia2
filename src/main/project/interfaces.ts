import { IFileDetails } from '../../shared/IFileDetails';
import { IResource, IChangeResource } from '../../shared/IResource';

export type RelativeFilePath = string;

export interface IFileDetailsHash {
  [relativeFilePath: RelativeFilePath]: IFileDetails;
}

export interface IResourceHash {
  [relativeFilePath: RelativeFilePath]: IResource;
}

export interface IAbsoluteResourceId {
  projectId: string;
  resourceId: string;
}

export interface IAbsoluteResourceIdChanges extends IAbsoluteResourceId {
  props: IChangeResource;
}

export interface IStoreMetada {
  created: number;
}