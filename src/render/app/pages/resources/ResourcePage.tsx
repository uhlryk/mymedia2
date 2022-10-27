import React, { useEffect, useState, useContext, KeyboardEvent, MouseEvent } from 'react';
import { IResource } from '../../../../shared/IResource';
import fetch from '../../../communication/fetch';
import { IProject } from '../../../../shared/IProject';
import ResourceList from './components/ResourceList';
import { AppContext, AppContextType, ActionType } from '../../store/store';
import { SwipeableDrawer, Box } from '@mui/material';

export default function ResourcePage(): JSX.Element {


    const { appState: { project }, appDispatch } = useContext<AppContextType>(AppContext);
    console.log(`[SelectProject] start ${project.id}`)
    const [resourceList, setResourceList] = useState<IResource[]>(null);
    useEffect(() => {
        fetch<IResource[]>('get/project-data', project.folderPath).then(resourceList => {
            setResourceList(resourceList);
            console.log(resourceList)
        })
    }, [])

    const toggleLeftMenu = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
        console.log(open);
    }
    return (
        <>
            <SwipeableDrawer
                anchor={'right'}
                open={false}
                onClose={toggleLeftMenu(false)}
                onOpen={toggleLeftMenu(true)}
            >
                <h1>test</h1>
            </SwipeableDrawer>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ display: "flex", flexBasis: "300px", flexGrow: 1 }}>
                    <div style={{ width: "300px" }} >hello world</div>
                </Box>
                <Box sx={{ display: "flex", flexBasis: "auto", flexGrow: 1 }}>
                    <ResourceList list={resourceList} ></ResourceList>
                </Box>
            </Box>

        </>
    )
}