import React, { useContext } from 'react';

import { Router } from '../../../components/Router';
import { PlayListPage } from '../pages/playList/PlayListPage';
import { ResourceListPage } from '../pages/resourceList/ResourceListPage';
import { TagsListPage } from '../pages/tagsList/TagsListPage';
import { AppStore, ResourceSubPage } from '../../../store/useAppStore';
import { AppStoreContext } from '../../../store/AppStoreContextProvider';

const pages = {
    [ResourceSubPage.PLAY_LIST_PAGE]: <PlayListPage />,
    [ResourceSubPage.RESOURCE_LIST_PAGE]: <ResourceListPage />,
    [ResourceSubPage.TAGS_LIST_PAGE]: <TagsListPage />,
};
export const ResourceRouter = () => {
    const [{ subPage }] = useContext<AppStore>(AppStoreContext);

    return <Router pages={pages} currentPage={subPage} />
}