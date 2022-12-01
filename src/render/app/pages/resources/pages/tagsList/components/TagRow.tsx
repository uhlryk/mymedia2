import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { ITag } from '../../../../../../../shared/ITag';
import { ITagGroup } from '../../../../../../../shared/ITagGroup';

type Props = {
    tagGroup: ITagGroup;
    tag: ITag;
}
export const TagRow = ({ tagGroup, tag }: Props) => {
    return (
        <>
            <TableRow hover key={tag.id}>
                <TableCell
                    component="th"
                    scope="row"
                >

                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                >
                    {tag.name}
                </TableCell>

                <TableCell component="th" scope="row" align="center">
                    <IconButton aria-label="rename">
                        <DriveFileRenameOutlineIcon />
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    <IconButton
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow >
        </>
    );
}