import React from 'react';
import { Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { ITag } from '../../../../../../../../shared/ITag';
import { ITagParent } from '../../../../../../../../shared/ITagParent';

type Props = {
    tagParent: ITagParent;
}
export const TagParentSection = ({ tagParent }: Props) => {
    const tagRows = Object.values(tagParent.children).map(tag => <Chip key={tag.id} label={tag.name} variant="outlined" />)
    return (
        <>
            <div>{tagParent.name}</div>
            {tagRows}
        </>
    );
}