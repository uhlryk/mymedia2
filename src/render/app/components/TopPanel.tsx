import { AppBar, Toolbar, Box, Button, Container } from '@mui/material';
import React, { MouseEventHandler, useContext, FC } from 'react';
import { clearProject, createProject } from '../store/actions';
import { AppContext, AppContextType, Page } from '../store/store';
import { TopPanelButton } from './TopPanelButton';

export const TopPanel: FC = () => {
  const {
    appState: { page },
    appDispatch,
  } = useContext<AppContextType>(AppContext);

  const onProjectsClick: MouseEventHandler = () => {
    appDispatch(clearProject());
  };

  const onCreateProjectClick: MouseEventHandler = () => {
    appDispatch(createProject());
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <TopPanelButton
          onClick={onProjectsClick}
          isActive={page === Page.PROJECT_PAGE}
        >
          Projects
        </TopPanelButton>
        <TopPanelButton
          onClick={onCreateProjectClick}
          isActive={page === Page.CREATE_PROJECT_PAGE}
        >
          Create Project
        </TopPanelButton>
        <TopPanelButton
          onClick={onCreateProjectClick}
          isActive={page === Page.RESOURCE_PAGE}
          isVisible={page === Page.RESOURCE_PAGE}
        >
          Resources
        </TopPanelButton>
      </Toolbar>
    </AppBar>
  );
};
