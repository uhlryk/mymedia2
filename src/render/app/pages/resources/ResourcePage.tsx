import React, { useContext, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import { ResourceList } from './components/ResourceList';
import { AppStore } from '../../store/useAppStore';
import { AppStateContext } from '../../store/AppStoreContextProvider';
import { SwipeableDrawer, Box } from '@mui/material';
import { FilterSidePanel } from './components/FilterSidePanel';
import { useResourceList } from './hooks/useResourceList';

export const ResourcePage = (): ReactElement => {
  const {
    appState: { project },
  } = useContext<AppStore>(AppStateContext);

  const [resourceList, isLoading, setResourceList] = useResourceList(
    project.folderPath
  );

  const toggleDetailsMenu =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      console.log(open);
    };
  return (
    <>
      <SwipeableDrawer
        anchor={'right'}
        open={false}
        onClose={toggleDetailsMenu(false)}
        onOpen={toggleDetailsMenu(true)}
      >
        <h1>test</h1>
      </SwipeableDrawer>
      <Box display="flex" flexDirection="row">
        <FilterSidePanel />

        <ResourceList list={resourceList}></ResourceList>
      </Box>
    </>
  );
};
