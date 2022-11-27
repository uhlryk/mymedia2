import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useAppSelector } from '../../../../store/store';
import { selectTagsList } from '../../store/resourcesSlice';

export const TagsListPage = () => {
    const tagList = useAppSelector(selectTagsList);
    console.log(tagList);

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
                <IconButton
                    aria-label="open"
                >
                    <FolderOpenIcon />
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                <IconButton aria-label="rename">
                    <DriveFileRenameOutlineIcon />
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                <IconButton
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ));

    return (
        <TableContainer
            component={Paper}
            sx={{
                padding: '30px',
            }}
        >
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow hover>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Project Path</TableCell>
                        <TableCell align="center">Open</TableCell>
                        <TableCell align="center">Rename</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{tableRows}</TableBody>
            </Table>
        </TableContainer>
    );
}