import { AppBar, Toolbar } from '@mui/material';
import React, { MouseEventHandler, useContext, FC } from 'react';
import { clearProject, createProject } from '../store/actions';
import { AppStore, Page } from '../store/useAppStore';
import { AppStateContext } from '../store/AppStateContextProvider';
import { TopPanelButton } from './TopPanelButton';

export const TopPanel: FC = () => {
  const {
    appState: { page },
    appStateDispatch,
  } = useContext<AppStore>(AppStateContext);

  const onProjectsClick: MouseEventHandler = () => {
    appStateDispatch(clearProject());
  };

  const onCreateProjectClick: MouseEventHandler = () => {
    appStateDispatch(createProject());
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
