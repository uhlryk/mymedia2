import { AppBar, Box, Container, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { IProject } from "../shared/IProject";
import "./App.css";

import ResourcePage from "./pages/resources/ResourcePage";
import SelectProject from "./pages/selectProject/SelectProject";

export default function App(): JSX.Element {
  const [project, setProject] = useState<IProject | null>(null);

  let component;
  if (project) {
    component = <ResourcePage project={project} />;
  } else {
    component = <SelectProject setProject={setProject} />;
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ border: '1px solid' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Projects
            </Typography>
          </Toolbar>
        </AppBar>

        {component}

      </Container>
    </Box>
  );
}