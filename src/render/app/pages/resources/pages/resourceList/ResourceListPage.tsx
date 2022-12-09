import React, { ReactElement, useContext } from 'react';
import Loader from '../../../../../components/Loader';
import { playVideo } from '../../api/playVideo';
import { IChangeResource } from '../../../../../../shared/IResource';
import { changeResource } from '../../api/changeResource';
import { ResourceDetails } from './components/resourceDetails/ResourceDetails';
import { CardList } from './components/CardList';
import { selectCurrentProject } from '../../../../store/projectsSlice';
import { useAppSelector, useAppDispatch } from '../../../../store/store';
import { selectCurrentResource, selectResouceList, updateResource, setCurrentResource, clearCurrentResource, selectTagTree, addResourceTag } from '../../store/resourcesSlice';
import { addResourceTag as addResourceTagApi } from './api/addResourceTag';

export const ResourceListPage = (): ReactElement => {
  const { id: projectId } = useAppSelector(selectCurrentProject);
  const resourceList = useAppSelector(selectResouceList);
  const tagTree = useAppSelector(selectTagTree);
  const currentResource = useAppSelector(selectCurrentResource);
  const dispatch = useAppDispatch()

  const onClickImage = (resourceId: string) => {
    playVideo(projectId, resourceId);
  };

  const onClickInfo = (resourceId: string) => {
    const resource = resourceList.find(resource => resource.id === resourceId)
    dispatch(setCurrentResource(resource));
  };

  const onHideDetails = () => {
    dispatch(clearCurrentResource());
  };

  const handleOnChangeProps = (resourceId: string, props: IChangeResource) => {
    changeResource(projectId, resourceId, props).then(updatedResource => {
      dispatch(updateResource(updatedResource));
    })
  };

  const handleAddTagResource = (resourceId: string, tagParentId: string, tagId: string) => {
    addResourceTagApi(projectId, resourceId, tagParentId, tagId).then(() => {
      dispatch(addResourceTag({ resourceId, tagParentId, tagId }));
    })
  }

  if (!resourceList) {
    return <Loader></Loader>;
  }

  return (
    <>
      <CardList list={resourceList} onClickImage={onClickImage} onClickInfo={onClickInfo} />
      <ResourceDetails
        resource={currentResource}
        tagTree={tagTree}
        addTagResource={handleAddTagResource}
        onHideDetails={onHideDetails}
        onClickImage={onClickImage}
        onChangeProps={handleOnChangeProps}
      />
    </>
  );
};
