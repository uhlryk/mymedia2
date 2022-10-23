import { AppBar, Box, CssBaseline, Divider, Drawer, Toolbar, Typography, ListItemText, List, ListItem, ListItemButton } from "@mui/material";
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
  const drawerWidth = 240;
  return (
    <AppContext.Provider value={appStore}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Projects
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {['Select Project', 'Create Project'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>

                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Files', 'Tags'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          {component}
        </Box>
      </Box>
    </AppContext.Provider>
  );
}