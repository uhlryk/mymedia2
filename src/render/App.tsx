import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
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
      <Grid xs={12}>
        {component}
      </Grid>
    </Grid>
  );
}