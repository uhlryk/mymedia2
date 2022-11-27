import { IResource } from "./IResource";
import { ITag } from "./ITag";

export interface IProjectDetails {
    resources: IResource[];
    tags: ITag[];
}