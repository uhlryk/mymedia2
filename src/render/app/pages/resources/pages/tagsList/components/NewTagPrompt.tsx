import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    addNewTag: (tagName: string) => void
}
export const NewTagPrompt = ({ isOpen, setOpen, addNewTag }: Props) => {
    const [tagName, setTagName] = useState<string>("");

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTag = () => {
        setOpen(false);
        addNewTag(tagName);
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Add Group Tag</DialogTitle>
            <DialogContent>
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