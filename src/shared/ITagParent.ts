import { ITag } from "./ITag"

export type ITagParent = ITag & { children: { [tagId: string]: ITag } }
