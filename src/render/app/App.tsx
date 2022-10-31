import { Box, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import "./App.css";

import ResourcePage from "./pages/resources/ResourcePage";
import ProjectPage from "./pages/projects/ProjectPage";
import CreateProject from "./pages/createProject/CreateProject";
import { AppContext, Page, useAppReducer } from "./store/store";
import { TopPanel } from "./components/TopPanel";
import { Router } from "./components/Router";

const pages = {
  [Page.PROJECT_PAGE]: <ProjectPage />,
  [Page.RESOURCE_PAGE]: <ResourcePage />,
  [Page.CREATE_PROJECT_PAGE]: <CreateProject />,
}
export default function App(): JSX.Element {
  const appStore = useAppReducer();

  return (
    <AppContext.Provider value={appStore}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />

        <TopPanel />

        <Box
          component="main"
          sx={{ display: "flex", flexDirection: "row", marginTop: '70px' }}
        >
          <Router pages={pages} />
        </Box>
      </Box>
    </AppContext.Provider>
  );
}