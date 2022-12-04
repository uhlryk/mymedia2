import { IFileDetails } from './IFileDetails';

export type IResourceTag = {
  tagId: string;
  tagParentId: string;
}

export type IResource = {
  id: string;
  details: string;
  rating: number;
  tags: IResourceTag[];
  thumbnails?: string[];
  width?: number;
  height?: number;
  duration?: number;
} & IFileDetails;

export type IChangeResource = Partial<Omit<IResource, 'id'>>