import React, { useContext, ReactElement } from 'react';
import { ResourceList } from './components/ResourceList';
import { AppStore } from '../../store/useAppStore';
import { AppStoreContext } from '../../store/AppStoreContextProvider';
import { Box, Modal, Fade, Backdrop, Typography, Button } from '@mui/material';

import { useResources } from './hooks/useResources';
import { playVideo } from './api/playVideo';
import { ResourceDetails } from './components/ResourceDetails';
import {
  showResourceDetails,
  hideResourceDetails,
  updateResource,
} from './store/resourcesStoreActions';
import { changeResource } from './api/changeResource';
import { IChangeResource } from '../../../../shared/IResource';
import { ResourceContext } from './store/ResourceContextProvider';

export const ResourcePage = (): ReactElement => {
  const [{ project }] = useContext<AppStore>(AppStoreContext);

  // const [resourcesState, dispatchResourcesState] = useResources(
  //   project.folderPath
  // );

  const resourceStore = useResources(project.folderPath);

  const [resourcesState, dispatchResourcesState] = resourceStore;

  const onClickImage = (resourceId: string) => {
    playVideo(project.folderPath, resourceId);
  };

  const onClickInfo = (resourceId: string) => {
    dispatchResourcesState(showResourceDetails(resourceId));
  };

  const onHideDetails = () => {
    dispatchResourcesState(hideResourceDetails());
  };

  const handleOnChangeProps = (resourceId: string, props: IChangeResource) => {
    console.log('res to change', resourceId, props);
    changeResource(project.folderPath, resourceId, props).then(updatedResource => {
      console.log('res changed', updatedResource);
      dispatchResourcesState(updateResource(updatedResource));
    })
  };

  return (
    <ResourceContext.Provider value={resourceStore}>
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
        onChangeProps={handleOnChangeProps}
      />
    </ResourceContext.Provider>
  );
};
