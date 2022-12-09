import { Button, Dialog, DialogActions, DialogContent, Select, DialogTitle, FormControl, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ITagTree } from '../../../../../../../../shared/ITagTree';
import { IResourceTag } from '../../../../../../../../shared/IResource';
import { ITagParent } from '../../../../../../../../shared/ITagParent';
import { ITag } from '../../../../../../../../shared/ITag';

type Props = {
    isOpen: boolean;
    setClose: () => void;
    addNewTag: (parentTagId: string, tagId: string) => void;
    tagTree: ITagTree;
    tags: IResourceTag[];
}
export const SelectTagPrompt = ({ isOpen, setClose, addNewTag, tagTree, tags }: Props) => {
    const [tagParentId, setTagParentId] = useState('');
    const [tagId, setTagId] = useState('');

    const handleChangeParentTagId = (event: SelectChangeEvent) => {
        setTagParentId(event.target.value as string);
    };

    const handleChangeTagId = (event: SelectChangeEvent) => {
        setTagId(event.target.value as string);
    };

    const handleClose = () => {
        setClose();
    };

    const handleAddResourceTag = () => {
        addNewTag(tagParentId, tagId);
    }

    const parentElements = Object.values(tagTree).map((tagParent: ITagParent) => <MenuItem key={tagParent.id} value={tagParent.id}>{tagParent.name}</MenuItem>)
    let elements: JSX.Element[] = [];
    if (tagParentId) {
        elements = Object.values(tagTree[tagParentId].children).map((tag: ITag) => <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>)
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Add Group Tag</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="parent-tag-select-label">Parent Tag</InputLabel>
                    <Select
                        labelId="parent-tag-select-label"
                        id="parent-tag-select"
                        value={tagParentId}
                        label="Parent Tag"
                        onChange={handleChangeParentTagId}
                    >
                        {parentElements}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="tag-select-label">Tag</InputLabel>
                    <Select
                        labelId="tag-select-label"
                        id="tag-select"
                        value={tagId}
                        label="Tag"
                        onChange={handleChangeTagId}
                        disabled={!tagParentId}
                    >
                        {elements}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddResourceTag}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}