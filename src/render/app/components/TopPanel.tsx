import { AppBar, Toolbar } from '@mui/material';
import React, { MouseEventHandler, useContext, ReactElement } from 'react';
import { NavLink } from "react-router-dom";
import { AppStoreContext } from '../store/AppStoreContextProvider';
import { AppStore } from '../store/useAppStore';

export const TopPanel = (): ReactElement => {
  const [{ project }] = useContext<AppStore>(AppStoreContext);

  return (
    <AppBar position="fixed" >
      <Toolbar>
        <NavLink to='/'>Select Projed</NavLink>
        <NavLink to='/new-project'>Create Projed</NavLink>
        {project &&
          <>
            <NavLink to='/resources'>Resources</NavLink>
            <NavLink to='/resources/tags'>Tags</NavLink>
            <NavLink to='/resources/playlist'>Playlist</NavLink>
          </>
        }
      </Toolbar>
    </AppBar >
  )
};
