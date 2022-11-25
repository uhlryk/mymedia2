import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import React, { ReactElement } from 'react';
import { Link, useLocation } from "react-router-dom";
import { selectCurrentProject } from '../store/projectsSlice';
import { useAppSelector } from '../store/store';

export const TopPanel = (): ReactElement => {
  const currentProject = useAppSelector(selectCurrentProject)
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white' }} >
      <Toolbar>
        <Tabs value={pathname}>
          <Tab label="Select Project" value="/" to="/" component={Link} />
          <Tab label="Create Project" value="/new-project" to="/new-project" component={Link} />

          {currentProject &&
            <>
              <Tab label="Resources" value="/resources" to="/resources" component={Link} />
              <Tab label="Tags" value="/resources/tags" to="/resources/tags" component={Link} />
              <Tab label="Playlist" value="/resources/playlist" to="/resources/playlist" component={Link} />
            </>
          }
        </Tabs>
      </Toolbar>
    </AppBar >
  )
};
