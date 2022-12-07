import { ITagParent } from "./ITagParent"

export type ITagTree = {
    [parentId: string]: ITagParent
}
