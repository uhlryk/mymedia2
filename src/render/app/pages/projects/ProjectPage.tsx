import { Grid, List, ListItemButton, ListItemText, Stack, ListItemIcon } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext, AppContextType, ActionType } from '../../store/store';
import { IProject } from '../../../../shared/IProject';
import fetch from "../../../communication/fetch";

export default function ProjectPage(): JSX.Element {
    console.log(`[SelectProject] start `)
    const { appDispatch } = useContext<AppContextType>(AppContext);

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
        appDispatch({
            type: ActionType.SET_PROJECT,
            payload: {
                project
            }
        })
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
        <Stack alignItems="left">
            <List sx={{ width: '100%', maxWidth: 560, margin: '0 200px', }} >
                {list}
            </List>
        </Stack>



    )
}