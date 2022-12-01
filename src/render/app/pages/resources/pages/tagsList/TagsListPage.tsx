import React, { useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useAppSelector } from '../../../../store/store';
import { addNewTag, selectTagGroupsList } from '../../store/resourcesSlice';
import { addNewTag as addNewTagApi } from './api/addNewTag';
import { NewGroupTagPrompt } from './components/NewGroupTagPrompt';
import { selectCurrentProject } from '../../../../store/projectsSlice';
import { useDispatch } from 'react-redux';
import { NewTagPrompt } from './components/NewTagPrompt';
import { ITag } from '../../../../../../shared/ITag';
import { ITagGroup } from '../../../../../../shared/ITagGroup';
import { TagGroupRow } from './components/TagGroupRow';

export const TagsListPage = () => {
    const { folderPath, id: projectId } = useAppSelector(selectCurrentProject);
    const tagGroupList = useAppSelector(selectTagGroupsList);
    const dispatch = useDispatch()
    const [openGroupDialog, setOpenGroupDialog] = useState(false);
    const [openDialogWithGroupTag, setOpenDialogWithGroupTag] = useState<ITag | null>(null);

    const handleAddNewTagGroup = (tagName: string) => {
        addNewTagApi(folderPath, tagName).then((tag) => {
            dispatch(addNewTag(tag))
        });
    };

    const handleAddNewTag = (tagGroupId: string, tagName: string) => {
        addNewTagApi(folderPath, tagName, tagGroupId).then((tag) => {
            dispatch(addNewTag(tag))
        });
    };

    const handleClickAddTagGroup = () => {
        setOpenGroupDialog(true);
    }

    const handleClickAddTag = (tagGroup: ITag) => {
        setOpenDialogWithGroupTag(tagGroup);
    }
    const tableRows = tagGroupList.map((tagGroup: ITagGroup) => <TagGroupRow key={tagGroup.id} tagGroup={tagGroup} onClickAddTag={handleClickAddTag} />)

    return (
        <>
            <NewGroupTagPrompt isOpen={openGroupDialog} setClose={() => setOpenGroupDialog(false)} addNewTag={handleAddNewTagGroup} />
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