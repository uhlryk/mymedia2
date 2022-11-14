import React, { useContext, ReactElement } from 'react';
import { ResourceList } from './components/ResourceList';
import { AppStore } from '../../store/useAppStore';
import { AppStateContext } from '../../store/AppStoreContextProvider';
import { Box, Modal, Fade, Backdrop, Typography, Button } from '@mui/material';
import { FilterSidePanel } from './components/FilterSidePanel';
import { useResources } from './hooks/useResources';
import { playVideo } from './api/playVideo';
import { ResourceDetails } from './components/ResourceDetails';
import {
  showResourceDetails,
  hideResourceDetails,
} from './store/resourcesStoreActions';

export const ResourcePage = (): ReactElement => {
  const [{ project }] = useContext<AppStore>(AppStateContext);

  const [resourcesState, dispatchResourcesState] = useResources(
    project.folderPath
  );

  const onClickImage = (resourceId: string) => {
    playVideo(project.folderPath, resourceId);
  };

  const onClickInfo = (resourceId: string) => {
    dispatchResourcesState(showResourceDetails(resourceId));
  };

  const onHideDetails = () => {
    dispatchResourcesState(hideResourceDetails());
  };

  return (
    <>
      <Box display="flex" flexDirection="row">
        <FilterSidePanel />
        <ResourceList
          list={resourcesState.resources}
          onClickImage={onClickImage}
          onClickInfo={onClickInfo}
        ></ResourceList>
        <ResourceDetails
          resourceId={resourcesState.selectedResourceId}
          resources={resourcesState.resources}
          onHideDetails={onHideDetails}
          onClickImage={onClickImage}
        />
      </Box>
    </>
  );
};
