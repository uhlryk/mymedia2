import React, { useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ITagParent } from '../../../../../../../../shared/ITagParent';
import { ITagTree } from '../../../../../../../../shared/ITagTree';
import { IResourceTag } from '../../../../../../../../shared/IResource';
import { TagParentSection } from './TagParentSection';
import { SelectTagPrompt } from './SelectTagPrompt';

type Props = {
    tagTree: ITagTree;
    tags: IResourceTag[];
    addTagResource: (tagParentId: string, tagId: string) => void;
}
export const TagsSection = ({ tagTree, tags, addTagResource }: Props) => {
    const [isOpenAddTagDialog, setIsOpenAddTagDialog] = useState(false);

    if (!tagTree || !tags) {
        return <></>
    }

    const handleAddNewTag = (tagParentId: string, tagId: string) => {
        setIsOpenAddTagDialog(false);
        addTagResource(tagParentId, tagId);
    }
    const handleCloseOpenAddTagDialog = () => {
        setIsOpenAddTagDialog(false);
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
        <>
            <SelectTagPrompt tagTree={tagTree} tags={tags} isOpen={isOpenAddTagDialog} setClose={handleCloseOpenAddTagDialog} addNewTag={handleAddNewTag} />
            <div>
                Tags
                <IconButton
                    aria-label="add"
                    onClick={() => setIsOpenAddTagDialog(true)}
                >
                    <AddIcon />
                </IconButton>
            </div>
            {tagsComponents}
        </>
    )
}