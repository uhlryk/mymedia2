import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import React, { ReactElement } from 'react';
import { Link, useLocation, matchPath } from "react-router-dom";
import { getRoutesPattern } from '../../routes';
import { selectCurrentProject } from '../store/projectsSlice';
import { useAppSelector } from '../store/store';

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export const TopPanel = (): ReactElement => {
  const currentProject = useAppSelector(selectCurrentProject)
  const possibleMatch = useRouteMatch(getRoutesPattern());
  const currentTab = possibleMatch?.pattern?.path;


  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white' }} >
      <Toolbar>
        <Tabs value={currentTab}>
          <Tab label="Select Project" value="/" to="/" component={Link} />
          <Tab label="Create Project" value="/new-project" to="/new-project" component={Link} />
          <Tab
            key="/resources/:projectId/resources"
            label="Resources"
            disabled={!currentProject}
            value="/resources/:projectId/resources"
            to={`/resources/${currentProject?.id}/resources`}
            component={Link}
          />,
          <Tab
            key="/resources/:projectId/tags"
            label="Tags"
            disabled={!currentProject}
            value="/resources/:projectId/tags"
            to={`/resources/${currentProject?.id}/tags`}
            component={Link}
          />,
          <Tab
            key="/resources/:projectId/new-tag"
            label="Create Tag"
            disabled={!currentProject}
            value="/resources/:projectId/new-tag"
            to={`/resources/${currentProject?.id}/new-tag`}
            component={Link}
          />,
          <Tab
            key="/resources/:projectId/playlist"
            label="Playlist"
            disabled={!currentProject}
            value="/resources/:projectId/playlist"
            to={`/resources/${currentProject?.id}/playlist`}
            component={Link}
          />

        </Tabs>
      </Toolbar>
    </AppBar >
  )
};
