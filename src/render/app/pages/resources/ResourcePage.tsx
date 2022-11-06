import React, { useContext, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import { ResourceList } from './components/ResourceList';
import { AppStore } from '../../store/useAppStore';
import { AppStateContext } from '../../store/AppStoreContextProvider';
import { SwipeableDrawer, Box } from '@mui/material';
import { FilterSidePanel } from './components/FilterSidePanel';
import { useResources } from './hooks/useResources';

export const ResourcePage = (): ReactElement => {
  const [
    { project }
  ] = useContext<AppStore>(AppStateContext);

  const [resourcesState] = useResources(
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

        <ResourceList list={resourcesState.resources}></ResourceList>
      </Box>
    </>
  );
};
