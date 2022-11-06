import React, { useContext, ReactElement } from 'react';
import { AppStore } from '../store/useAppStore';
import { AppStateContext } from '../store/AppStoreContextProvider';

import { Box } from '@mui/material';

type Props = {
  pages: {
    [key: string]: ReactElement;
  };
};
export const Router = ({ pages }: Props): ReactElement => {
  const [
    { page }
  ] = useContext<AppStore>(AppStateContext);
  return <Box sx={{ marginTop: '70px', width: '100%' }}>{pages[page] || null}</Box>;
};
