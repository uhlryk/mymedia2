import React from 'react';
import { ITagParent } from '../../../../../../../../shared/ITagParent';
import { ITagTree } from '../../../../../../../../shared/ITagTree';
import { IResourceTag } from '../../../../../../../../shared/IResource';
import { TagParentSection } from './TagParentSection';

type Props = {
    tagTree: ITagTree;
    tags: IResourceTag[];
}
export const TagsSection = ({ tagTree, tags }: Props) => {
    if (!tagTree || !tags) {
        return <></>
    }
    const tagResourceTree: ITagTree = {};
    tags.forEach(resourceTag => {
        const tagParent = tagTree[resourceTag.tagParentId];
        if (!tagResourceTree[resourceTag.tagParentId]) {
            tagResourceTree[resourceTag.tagParentId] = { ...tagParent, children: {} }
        }
        const tag = tagParent.children[resourceTag.tagId];
        tagResourceTree[resourceTag.tagParentId].children[tag.id] = tag;
    })
    const tagsComponents = Object.values(tagResourceTree).map((tagParent: ITagParent) => <TagParentSection key={tagParent.id} tagParent={tagParent} />)
    return (
        <>{tagsComponents}</>
    )
}