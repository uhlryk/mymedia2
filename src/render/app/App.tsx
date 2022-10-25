import { Box, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import "./App.css";

import ResourcePage from "./pages/resources/ResourcePage";
import ProjectPage from "./pages/projects/ProjectPage";
import CreateProject from "./pages/createProject/CreateProject";
import { AppContext, Page, useAppReducer } from "./store/store";
import TopPanel from "./components/TopPanel";


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
  const sidePanelWidth = 0;
  return (
    <AppContext.Provider value={appStore}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />

        <TopPanel sidePanelWidth={sidePanelWidth} />

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, display: "flex", flexDirection: "column" }}
        >
          <Toolbar />
          {component}
        </Box>
      </Box>
    </AppContext.Provider>
  );
}