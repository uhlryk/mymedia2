import React, { useContext, ReactElement } from 'react';
import { ResourceListPage } from './pages/resourceList/ResourceListPage';
import { AppStore } from '../../store/useAppStore';
import { AppStoreContext } from '../../store/AppStoreContextProvider';

import { ResourceStoreContextProvider } from './store/ResourceStoreContextProvider';

export const ResourcePage = (): ReactElement => {
  const [{ project }] = useContext<AppStore>(AppStoreContext);

  return (
    <ResourceStoreContextProvider projectPath={project.folderPath}>
      <ResourceListPage />

    </ResourceStoreContextProvider>
  );
};
