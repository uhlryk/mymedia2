import { Box, CssBaseline } from "@mui/material";
import React, { FC } from "react";
import "./App.css";

import ResourcePage from "./pages/resources/ResourcePage";
import ProjectPage from "./pages/projects/ProjectPage";
import CreateProject from "./pages/createProject/CreateProject";
import { Page } from "./store/store";
import { TopPanel } from "./components/TopPanel";
import { Router } from "./components/Router";
import { AppStoreContextProvider } from "./store/AppContextProvider";

const pages = {
  [Page.PROJECT_PAGE]: <ProjectPage />,
  [Page.RESOURCE_PAGE]: <ResourcePage />,
  [Page.CREATE_PROJECT_PAGE]: <CreateProject />,
}
export const App: FC = () => {
  return (
    <AppStoreContextProvider>
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
    </AppStoreContextProvider>
  );
}