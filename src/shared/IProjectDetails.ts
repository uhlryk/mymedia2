import { IResource } from "./IResource";
import { ITagTree } from "./ITagTree";

export interface IProjectDetails {
    resources: IResource[];
    tagTree: ITagTree;
}