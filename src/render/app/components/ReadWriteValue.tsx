import React, { MouseEventHandler, useState } from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
type Props = {
    id?: string;
    label: string;
    value: string;
    onChange: (text: string) => void;
}
export const ReadWriteValue = ({ label, value, onChange }: Props) => {
    const [localOnChange, setLocalOnChange] = useState(value);
    const [isEditMode, setEditMode] = useState(false);
    const handleIconClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (!isEditMode) {
            setEditMode(true);
        } else {
            onChange(localOnChange);
            setEditMode(false);
        }

    };

    const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
    };

    return <TextField
        required
        label={label}
        onChange={(event) => setLocalOnChange(event.target.value)}
        type='text'
        color={isEditMode ? 'success' : 'secondary'}
        fullWidth={true}
        value={localOnChange}
        InputProps={{
            readOnly: !isEditMode,
            endAdornment: (
                <InputAdornment position='end'>
                    <IconButton
                        aria-label='toggle read/write'
                        onClick={handleIconClick}
                        onMouseDown={handleMouseDown}>
                        {!isEditMode && <ModeEditIcon />}
                        {isEditMode && <SaveIcon />}
                    </IconButton>
                </InputAdornment>
            ),
        }}
    />
}