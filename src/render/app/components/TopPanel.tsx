import { AppBar, Toolbar, Box, Button, Container } from "@mui/material";
import React, { MouseEventHandler, useContext } from "react";
import { AppContext, AppContextType, ActionType } from "../store/store";

type Props = {
    sidePanelWidth: number;
}
export default function TopPanel({ sidePanelWidth }: Props) {
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
    return (
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${sidePanelWidth}px)`, ml: `${sidePanelWidth}px` }}
        >
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ margin: '0 200px', flexGrow: 1, justifyContent: 'left', display: { sm: 'flex', md: 'flex' } }}>
                        <Button
                            key={'projects'}
                            onClick={onProjectsClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Projects
                        </Button>
                        <Button
                            key={'create-projects'}
                            onClick={onCreateProjectClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Create Project
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}