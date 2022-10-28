import { IFileDetails } from "./IFileDetails";

export type IResource = {
    id: string;
    thumbnails?: string[];
    width?: number;
    height?: number;
    duration?: number;
} & IFileDetails