import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { ITag } from '../../../../../../../shared/ITag';
import { ITagParent } from '../../../../../../../shared/ITagParent';
import { TagRow } from './TagRow';

type Props = {
    tagParent: ITagParent;
    onClickAddTag: (tag: ITag) => void
}
export const TagParentRow = ({ tagParent, onClickAddTag }: Props) => {
    const tagRows = Object.values(tagParent.children).map(tag => <TagRow key={tag.id} tag={tag} />)
    return (
        <>
            <TableRow hover key={tagParent.id}>
                <TableCell
                    component="th"
                    scope="row"
                >
                    {tagParent.name}
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                >

                </TableCell>

                <TableCell component="th" scope="row" align="center">
                    <IconButton aria-label="rename">
                        <DriveFileRenameOutlineIcon />
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    <IconButton
                        aria-label="add"
                        onClick={() => onClickAddTag(tagParent)}
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
            {tagRows}
        </>
    );
}