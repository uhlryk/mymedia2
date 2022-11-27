import React, { useState, ReactElement } from 'react';
import './createTagPage.css';
import { addNewTag as addNewTagApi } from './api/addNewTag';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { selectCurrentProject } from '../../../../store/projectsSlice';
import { addNewTag } from '../../store/resourcesSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../store/store';

export const CreateTagPage = (): ReactElement => {
    const { folderPath, id: projectId } = useAppSelector(selectCurrentProject);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isSubmitting, setSubmitting] = useState(false);
    const [tagName, setTagName] = useState('');

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setSubmitting(true);
        addNewTagApi(folderPath, tagName).then((tag) => {
            console.log(`[CreateTagPage] status of set/new-tag ${tag}`);
            setSubmitting(false);
            dispatch(addNewTag(tag))
            navigate(`/resources/${projectId}/tags`);
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <Box className="create-tag__wrapper">

                <TextField
                    id="outlined-basic"
                    label="Set tag name"
                    variant="outlined"
                    value={tagName}
                    onChange={(event) => setTagName(event.target.value)}
                />

                <Button
                    type="submit"
                    disabled={!tagName || isSubmitting}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </Box>
        </form>
    );
};
