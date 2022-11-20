import React, { MouseEventHandler, FocusEventHandler, useState } from 'react';
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
    multiline?: boolean
}
export const ReadWriteValue = ({ id, label, value, onChange, multiline }: Props) => {
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

    const handleOnBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        if (isEditMode) {
            onChange(localOnChange);
            setEditMode(false);
        }
    }

    const handleOnDoubleClick: MouseEventHandler<HTMLInputElement> = (event) => {
        if (!isEditMode) {
            setEditMode(true);
        }
    };

    return <TextField
        sx={{ margin: '10px 0' }}
        {...{ id }}
        required
        label={label}
        onChange={(event) => setLocalOnChange(event.target.value)}
        onBlur={handleOnBlur}
        onDoubleClick={handleOnDoubleClick}
        multiline={multiline}
        rows={4}
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