import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ITag } from '../../../../../../../shared/ITag';

type Props = {
    openWithGroup: ITag | null;
    setClose: () => void;
    addNewTag: (groupId: string, tagName: string,) => void
}
export const NewTagPrompt = ({ openWithGroup, setClose, addNewTag }: Props) => {
    const [tagName, setTagName] = useState<string>("");

    const handleClose = () => {
        setClose();
    };

    const handleAddTag = () => {
        const groupId = openWithGroup.id;
        setClose();
        addNewTag(groupId, tagName);
    }

    return (
        <Dialog open={!!openWithGroup} onClose={handleClose}>
            <DialogTitle>Add Tag</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {openWithGroup?.name}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="tag name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setTagName(event.target.value)}
                    value={tagName}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddTag}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}