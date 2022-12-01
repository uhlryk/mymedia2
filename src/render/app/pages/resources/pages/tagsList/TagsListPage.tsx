import React, { useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useAppSelector } from '../../../../store/store';
import { addNewTag, selectTagsList } from '../../store/resourcesSlice';
import { addNewTag as addNewTagApi } from './api/addNewTag';
import { NewTagPrompt } from './components/NewTagPrompt';
import { selectCurrentProject } from '../../../../store/projectsSlice';
import { useDispatch } from 'react-redux';

export const TagsListPage = () => {
    const { folderPath, id: projectId } = useAppSelector(selectCurrentProject);
    const tagList = useAppSelector(selectTagsList);
    const dispatch = useDispatch()
    const [openGroupDialog, setOpenGroupDialog] = useState(false);

    console.log(tagList);

    const handleAddNewTagGroup = (tagName: string) => {
        addNewTagApi(folderPath, tagName).then((tag) => {
            dispatch(addNewTag(tag))
        });
    };

    const handleClickAddTagGroup = () => {
        setOpenGroupDialog(true);
    }

    const tableRows = tagList.map((tag) => (
        <TableRow hover key={tag.id}>
            <TableCell
                component="th"
                scope="row"
            >
                {tag.name}
            </TableCell>
            <TableCell
                component="th"
                scope="row"
            >
                {tag.parentId ? "" : ""}
            </TableCell>

            <TableCell component="th" scope="row" align="center">
                <IconButton aria-label="rename">
                    <DriveFileRenameOutlineIcon />
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                <IconButton
                    aria-label="add"
                    onClick={handleClickAddTagGroup}
                >
                    <AddIcon />
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                <IconButton
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow >
    ));

    return (
        <>
            <NewTagPrompt isOpen={openGroupDialog} setOpen={setOpenGroupDialog} addNewTag={handleAddNewTagGroup} />
            <TableContainer
                component={Paper}
                sx={{
                    padding: '30px',
                }}
            >
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow hover>
                            <TableCell>Group Name</TableCell>
                            <TableCell>Tag Name</TableCell>
                            <TableCell align="center">Rename</TableCell>

                            <TableCell align="center">
                                <IconButton
                                    aria-label="add"
                                    onClick={handleClickAddTagGroup}
                                >
                                    <AddBoxIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{tableRows}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
}