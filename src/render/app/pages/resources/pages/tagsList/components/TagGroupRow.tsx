import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { ITag } from '../../../../../../../shared/ITag';
import { ITagGroup } from '../../../../../../../shared/ITagGroup';
import { TagRow } from './TagRow';

type Props = {
    tagGroup: ITagGroup;
    onClickAddTag: (tag: ITag) => void
}
export const TagGroupRow = ({ tagGroup, onClickAddTag }: Props) => {
    const tagRows = tagGroup.children.map(tag => <TagRow key={tag.id} tagGroup={tagGroup} tag={tag} />)
    return (
        <>
            <TableRow hover key={tagGroup.id}>
                <TableCell
                    component="th"
                    scope="row"
                >
                    {tagGroup.name}
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
                        onClick={() => onClickAddTag(tagGroup)}
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