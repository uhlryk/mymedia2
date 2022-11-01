import { AppBar, Toolbar, Box, Button, Container } from "@mui/material";
import React, { MouseEventHandler, useContext, FC } from "react";
import { clearProject, createProject } from "../store/actions";
import { AppContext, AppContextType, Page } from "../store/store";

export const TopPanel: FC = () => {
  const {
    appState: { page },
    appDispatch
  } = useContext<AppContextType>(AppContext);

  const onProjectsClick: MouseEventHandler = () => {
    appDispatch(clearProject());
  };

  const onCreateProjectClick: MouseEventHandler = () => {
    appDispatch(createProject());
  };

  let resourceButton;
  if (page === Page.RESOURCE_PAGE) {
    resourceButton = (
      <Button
        key={"resources"}
        onClick={onCreateProjectClick}
        disableElevation
        variant={page === Page.RESOURCE_PAGE ? "contained" : "text"}
        color="success"
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Resources
      </Button>
    );
  }

  return (
    <AppBar position="fixed" sx={{ width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "left",
              display: { sm: "flex", md: "flex" }
            }}
          >
            <Button
              key={"projects"}
              onClick={onProjectsClick}
              disableElevation
              variant={page === Page.PROJECT_PAGE ? "contained" : "text"}
              color="success"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Projects
            </Button>
            <Button
              key={"create-projects"}
              onClick={onCreateProjectClick}
              disableElevation
              variant={page === Page.CREATE_PROJECT_PAGE ? "contained" : "text"}
              color="success"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Create Project
            </Button>

            {resourceButton}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
