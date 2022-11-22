import { ImageList, Box } from '@mui/material';
import React, { ReactElement, useContext } from 'react';
import { FilterSidePanel } from './components/FilterSidePanel';
import { IResource } from '../../../../../../shared/IResource';
import Loader from '../../../../../components/Loader';
import { Card } from './components/Card';
import { ResourceStore } from '../../store/useResourcesStore';
import { ResourceStoreContext } from '../../store/ResourceStoreContextProvider';
import { AppStore } from '../../../../store/useAppStore';
import { AppStoreContext } from '../../../../store/AppStoreContextProvider';
import { playVideo } from '../../api/playVideo';
import { hideResourceDetails, showResourceDetails, updateResource } from '../../store/resourcesStoreActions';
import { IChangeResource } from '../../../../../../shared/IResource';
import { changeResource } from '../../api/changeResource';
import { ResourceDetails } from './components/ResourceDetails';

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
        <Box sx={{ display: 'flex', flexBasis: 'auto', flexGrow: 1 }}>
          <ImageList cols={4} rowHeight={230} sx={{ width: '100%', margin: 0 }}>
            {list.map((resource) => (
              <Card
                key={resource.id}
                title={resource.name}
                subtitle={resource.relativePath}
                imageSrc={resource.thumbnails?.at(0)}
                onClickImage={() => onClickImage(resource.id)}
                onClickInfo={() => onClickInfo(resource.id)}
              />
            ))}
          </ImageList>
        </Box>
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
