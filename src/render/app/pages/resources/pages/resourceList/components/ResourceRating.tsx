import React, { SyntheticEvent } from 'react';
import {
    Box,
    Rating,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

type Props = {
    value: number;
    onChange: (value: number) => void;
}
export const ResourceRating = ({ value, onChange }: Props) => {
    const [localValue, setLocalValue] = React.useState(value);
    const [hover, setHover] = React.useState(value);

    const labels: { [index: string]: string } = {
        0: 'Not rated',
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    const handleOnChangeRating = (event: SyntheticEvent, value: number) => {
        setLocalValue(value);
        onChange(value)
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '60px',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Rating
                name="hover-feedback"
                size="large"
                value={localValue}
                onChange={handleOnChangeRating}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : localValue]}</Box>
        </Box>
    )
}