import React, { useContext } from 'react';

import { AppStore } from '../store/useAppStore';
import { AppStateContext } from '../store/AppStoreContextProvider';
import { Page } from '../store/useAppStore';
import { ResourcePage } from '../pages/resources/ResourcePage';
import { ProjectPage } from '../pages/projects/ProjectPage';
import { CreateProjectPage } from '../pages/createProject/CreateProjectPage';
import { Router } from './Router';

const pages = {
    [Page.PROJECT_PAGE]: <ProjectPage />,
    [Page.RESOURCE_PAGE]: <ResourcePage />,
    [Page.CREATE_PROJECT_PAGE]: <CreateProjectPage />,
};
export const AppRouter = () => {
    const [{ page }] = useContext<AppStore>(AppStateContext);

    return <Router pages={pages} currentPage={page} />
}