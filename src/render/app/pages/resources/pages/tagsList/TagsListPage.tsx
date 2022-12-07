import React, { useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useAppSelector } from '../../../../store/store';
import { addNewTag, addNewTagParent, selectTagTree } from '../../store/resourcesSlice';
import { addNewTag as addNewTagApi } from './api/addNewTag';
import { NewGroupTagPrompt } from './components/NewGroupTagPrompt';
import { selectCurrentProject } from '../../../../store/projectsSlice';
import { useDispatch } from 'react-redux';
import { NewTagPrompt } from './components/NewTagPrompt';
import { ITag } from '../../../../../../shared/ITag';
import { ITagParent } from '../../../../../../shared/ITagParent';
import { ITagTree } from '../../../../../../shared/ITagTree';
import { TagParentRow } from './components/TagParentRow';
import { addNewTagParent as addNewTagParentApi } from './api/addNewTagParent';

export const TagsListPage = () => {
    const { id: projectId } = useAppSelector(selectCurrentProject);
    const tagTree = useAppSelector(selectTagTree);
    const dispatch = useDispatch()
    const [openGroupDialog, setOpenGroupDialog] = useState(false);
    const [openDialogWithGroupTag, setOpenDialogWithGroupTag] = useState<ITag | null>(null);

    const handleAddNewTagParent = (tagName: string) => {
        addNewTagParentApi(projectId, tagName).then((tagParent) => {
            dispatch(addNewTagParent(tagParent))
        });
    };

    const handleAddNewTag = (tagGroupId: string, tagName: string) => {
        addNewTagApi(projectId, tagName, tagGroupId).then((tag) => {
            dispatch(addNewTag(tag))
        });
    };

    const handleClickAddTagGroup = () => {
        setOpenGroupDialog(true);
    }

    const handleClickAddTag = (tagGroup: ITag) => {
        setOpenDialogWithGroupTag(tagGroup);
    }
    const tableRows = Object.values(tagTree).map((tagParent: ITagParent) => <TagParentRow key={tagParent.id} tagParent={tagParent} onClickAddTag={handleClickAddTag} />)

    return (
        <>
            <NewGroupTagPrompt isOpen={openGroupDialog} setClose={() => setOpenGroupDialog(false)} addNewTag={handleAddNewTagParent} />
            <NewTagPrompt openWithGroup={openDialogWithGroupTag} setClose={() => setOpenDialogWithGroupTag(null)} addNewTag={handleAddNewTag} />
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