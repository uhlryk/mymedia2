import { Box, Grid, List, ListItemButton, ListItemText, Stack, ListSubheader, ListItemIcon } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IProject } from '../../../shared/IProject';
import fetch from "../../communication/fetch";
import CreateProject from './createProject/CreateProject';

type Props = {
    setProject: Dispatch<SetStateAction<IProject>>
}
export default function SelectProject({ setProject }: Props): JSX.Element {
    console.log(`[SelectProject] start `)
    const [projectList, setProjectList] = useState<IProject[]>([]);
    useEffect(() => {
        fetch<IProject[]>('get/project-list').then(projectList => {
            setProjectList(projectList);
            console.log(projectList)
        })
    }, [])
    console.log(projectList);

    const onSelectProject = (id: string) => {
        const project = projectList.find(project => project.id === id)
        setProject(project);
    }

    const list = projectList.map(project => (
        <ListItemButton key={project.id} onClick={() => onSelectProject(project.id)}>
            <ListItemIcon>
                <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={project.name} secondary={project.folderPath} />
        </ListItemButton>
    ))

    return (
        <Grid>
            <Stack alignItems="center">
                <CreateProject setProject={setProject} />
                <List sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }} subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Existing Projects
                    </ListSubheader>
                }>
                    {list}
                </List>
            </Stack>
        </Grid>



    )
}