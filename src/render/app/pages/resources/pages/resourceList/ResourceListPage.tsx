import { Box } from '@mui/material';
import React, { ReactElement, useContext } from 'react';
import { FilterSidePanel } from './components/FilterSidePanel';
import Loader from '../../../../../components/Loader';
import { ResourceStore } from '../../store/useResourcesStore';
import { ResourceStoreContext } from '../../store/ResourceStoreContextProvider';
import { AppStore } from '../../../../store/useAppStore';
import { AppStoreContext } from '../../../../store/AppStoreContextProvider';
import { playVideo } from '../../api/playVideo';
import { hideResourceDetails, showResourceDetails, updateResource } from '../../store/resourcesStoreActions';
import { IChangeResource } from '../../../../../../shared/IResource';
import { changeResource } from '../../api/changeResource';
import { ResourceDetails } from './components/ResourceDetails';
import { CardList } from './components/CardList';

export const ResourceListPage = (): ReactElement => {
  const [{ project }] = useContext<AppStore>(AppStoreContext);
  const [resourcesState, dispatchResourcesState] = useContext<ResourceStore>(ResourceStoreContext);

  const list = resourcesState.resources;

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

  if (!list) {
    return <Loader></Loader>;
  }

  return (
    <>
      <Box display="flex" flexDirection="row">
        <FilterSidePanel />
        <CardList list={resourcesState.resources} onClickImage={onClickImage} onClickInfo={onClickInfo} />
      </Box >
      <ResourceDetails
        resourceId={resourcesState.selectedResourceId}
        resources={resourcesState.resources}
        onHideDetails={onHideDetails}
        onClickImage={onClickImage}
        onChangeProps={handleOnChangeProps}
      />
    </>
  );
};