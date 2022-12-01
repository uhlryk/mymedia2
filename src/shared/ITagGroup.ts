import { ITag } from "./ITag"

export type ITagGroup = ITag & { children: ITag[] }
