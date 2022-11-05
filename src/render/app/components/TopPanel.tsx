import { AppBar, Toolbar } from '@mui/material';
import React, { MouseEventHandler, useContext, FC } from 'react';
import { clearProject, createProject } from '../store/actions';
import { AppStore, Page } from '../store/useAppStore';
import { AppStateContext } from '../store/AppStoreContextProvider';
import { TopPanelButton } from './TopPanelButton';

export const TopPanel: FC = () => {
  const {
    appState: { page },
    dispatchAppState
  } = useContext<AppStore>(AppStateContext);

  const onProjectsClick: MouseEventHandler = () => {
    dispatchAppState(clearProject());
  };

  const onCreateProjectClick: MouseEventHandler = () => {
    dispatchAppState(createProject());
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
