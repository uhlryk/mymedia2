import { IResource } from "./IResource";
import { ITagGroup } from "./ITagGroup";

export interface IProjectDetails {
    resources: IResource[];
    tagGroups: ITagGroup[];
}