import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import "./App.css";

import ResourcePage from "./pages/resources/ResourcePage";
import ProjectPage from "./pages/projects/ProjectPage";
import CreateProject from "./pages/createProject/CreateProject";
import { AppContext, Page, useAppReducer } from "./store/store";


export default function App(): JSX.Element {
  const appStore = useAppReducer();

  let component;
  switch (appStore.appState.page) {
    case Page.PROJECT_PAGE:
      component = <ProjectPage />;
      break;
    case Page.RESOURCE_PAGE:
      component = <ResourcePage />;
      break;
    case Page.CREATE_PROJECT_PAGE:
      component = <CreateProject />;
      break;
  }
  console.log(appStore);
  return (
    <AppContext.Provider value={appStore}>
      <Grid container spacing={0}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Projects
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid xs={12} item>
          {component}
        </Grid>
      </Grid>
    </AppContext.Provider>
  );
}