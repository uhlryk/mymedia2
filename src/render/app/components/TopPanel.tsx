import { AppBar, Toolbar } from '@mui/material';
import React, { MouseEventHandler, useContext, ReactElement } from 'react';
import { clearProject, createProject, resourceRouteAction } from '../store/appStoreActions';
import { AppStore, Page, ResourceSubPage } from '../store/useAppStore';
import { AppStoreContext } from '../store/AppStoreContextProvider';
import { TopPanelButton } from './TopPanelButton';

export const TopPanel = (): ReactElement => {
  const [{ page, subPage }, dispatchAppState] = useContext<AppStore>(AppStoreContext);

  const handleOnProjectsClick: MouseEventHandler = () => {
    dispatchAppState(clearProject());
  };

  const handleOnCreateProjectClick: MouseEventHandler = () => {
    dispatchAppState(createProject());
  };

  const handleOnResourceListClick: MouseEventHandler = () => {
    dispatchAppState(resourceRouteAction(ResourceSubPage.RESOURCE_LIST_PAGE));
  };

  const handleOnTagsListClick: MouseEventHandler = () => {
    dispatchAppState(resourceRouteAction(ResourceSubPage.TAGS_LIST_PAGE));
  };

  const handleOnPlayListClick: MouseEventHandler = () => {
    dispatchAppState(resourceRouteAction(ResourceSubPage.PLAY_LIST_PAGE));
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <TopPanelButton
          onClick={handleOnProjectsClick}
          isActive={page === Page.PROJECT_PAGE}
        >
          Projects
        </TopPanelButton>
        <TopPanelButton
          onClick={handleOnCreateProjectClick}
          isActive={page === Page.CREATE_PROJECT_PAGE}
        >
          Create Project
        </TopPanelButton>
        <TopPanelButton
          onClick={handleOnResourceListClick}
          isActive={page === Page.RESOURCE_PAGE && subPage === ResourceSubPage.RESOURCE_LIST_PAGE}
          isVisible={page === Page.RESOURCE_PAGE}
        >
          Resources
        </TopPanelButton>
        <TopPanelButton
          onClick={handleOnTagsListClick}
          isActive={page === Page.RESOURCE_PAGE && subPage === ResourceSubPage.TAGS_LIST_PAGE}
          isVisible={page === Page.RESOURCE_PAGE}
        >
          Tags
        </TopPanelButton>
        <TopPanelButton
          onClick={handleOnPlayListClick}
          isActive={page === Page.RESOURCE_PAGE && subPage === ResourceSubPage.PLAY_LIST_PAGE}
          isVisible={page === Page.RESOURCE_PAGE}
        >
          PlayList
        </TopPanelButton>
      </Toolbar>
    </AppBar>
  );
};
