import { IFileDetails } from './IFileDetails';

export type IResource = {
  id: string;
  details: string;
  rating: number;
  tags: string[];
  thumbnails?: string[];
  width?: number;
  height?: number;
  duration?: number;
} & IFileDetails;

export type IChangeResource = Partial<Omit<IResource, 'id'>>