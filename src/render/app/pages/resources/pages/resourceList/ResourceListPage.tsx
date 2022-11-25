import React, { ReactElement, useContext } from 'react';
import Loader from '../../../../../components/Loader';
import { ResourceStore } from '../../store/useResourcesStore';
import { ResourceStoreContext } from '../../store/ResourceStoreContextProvider';
import { AppStore } from '../../../../store/useAppStore';
import { playVideo } from '../../api/playVideo';
import { hideResourceDetails, showResourceDetails, updateResource } from '../../store/resourcesStoreActions';
import { IChangeResource } from '../../../../../../shared/IResource';
import { changeResource } from '../../api/changeResource';
import { ResourceDetails } from './components/ResourceDetails';
import { CardList } from './components/CardList';

export const ResourceListPage = (): ReactElement => {
  return (
    <h1>Hello PlayList</h1>
  )
  // const [{ project }] = useContext<AppStore>(AppStoreContext);
  // const [resourcesState, dispatchResourcesState] = useContext<ResourceStore>(ResourceStoreContext);

  // const list = resourcesState.resources;

  // const onClickImage = (resourceId: string) => {
  //   playVideo(project.folderPath, resourceId);
  // };

  // const onClickInfo = (resourceId: string) => {
  //   dispatchResourcesState(showResourceDetails(resourceId));
  // };

  // const onHideDetails = () => {
  //   dispatchResourcesState(hideResourceDetails());
  // };

  // const handleOnChangeProps = (resourceId: string, props: IChangeResource) => {
  //   changeResource(project.folderPath, resourceId, props).then(updatedResource => {
  //     dispatchResourcesState(updateResource(updatedResource));
  //   })
  // };

  // if (!list) {
  //   return <Loader></Loader>;
  // }

  // return (
  //   <>
  //     <CardList list={resourcesState.resources} onClickImage={onClickImage} onClickInfo={onClickInfo} />
  //     <ResourceDetails
  //       resourceId={resourcesState.selectedResourceId}
  //       resources={resourcesState.resources}
  //       onHideDetails={onHideDetails}
  //       onClickImage={onClickImage}
  //       onChangeProps={handleOnChangeProps}
  //     />
  //   </>
  // );
};
