import { AppBar, Toolbar, Box, Button, Container } from "@mui/material";
import React, { MouseEventHandler, useContext, FC } from "react";
import { AppContext, AppContextType, ActionType, Page } from "../store/store";

export const TopPanel: FC = () => {
    const { appState: { page }, appDispatch } = useContext<AppContextType>(AppContext);

    const onProjectsClick: MouseEventHandler = (event) => {
        appDispatch({
            type: ActionType.CLEAR_PROJECT,
        })
    }

    const onCreateProjectClick: MouseEventHandler = (event) => {
        appDispatch({
            type: ActionType.CREATE_PROJECT,
        })
    }

    let resourceButton;
    if (page === Page.RESOURCE_PAGE) {
        resourceButton = <Button
            key={'resources'}
            onClick={onCreateProjectClick}
            disableElevation
            variant={page === Page.RESOURCE_PAGE ? 'contained' : 'text'}
            color="success"
            sx={{ my: 2, color: 'white', display: 'block' }}
        >
            Resources
        </Button>
    }

    return (
        <AppBar
            position="fixed"
            sx={{ width: '100%' }}
        >
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, justifyContent: 'left', display: { sm: 'flex', md: 'flex' } }}>
                        <Button
                            key={'projects'}
                            onClick={onProjectsClick}
                            disableElevation
                            variant={page === Page.PROJECT_PAGE ? 'contained' : 'text'}
                            color="success"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Projects
                        </Button>
                        <Button
                            key={'create-projects'}
                            onClick={onCreateProjectClick}
                            disableElevation
                            variant={page === Page.CREATE_PROJECT_PAGE ? 'contained' : 'text'}
                            color="success"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Create Project
                        </Button>

                        {resourceButton}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}