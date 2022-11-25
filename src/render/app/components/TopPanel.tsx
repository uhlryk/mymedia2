import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import React, { useContext, ReactElement } from 'react';
import { Link, useLocation } from "react-router-dom";
import { AppStoreContext } from '../store/AppStoreContextProvider';
import { AppStore } from '../store/useAppStore';

export const TopPanel = (): ReactElement => {
  const [{ project }] = useContext<AppStore>(AppStoreContext);
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white' }} >
      <Toolbar>
        <Tabs value={pathname}>
          <Tab label="Select Project" value="/" to="/" component={Link} />
          <Tab label="Create Project" value="/new-project" to="/new-project" component={Link} />

          {project &&
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
