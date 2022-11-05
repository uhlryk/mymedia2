import React, { useContext, FC } from 'react';
import { AppStore } from '../store/useAppStore';
import { AppStateContext } from '../store/AppStoreContextProvider';

import { Box } from '@mui/material';

type Props = {
  pages: {
    [key: string]: JSX.Element;
  };
};
export const Router: FC<Props> = ({ pages }) => {
  const {
    appState: { page },
  } = useContext<AppStore>(AppStateContext);
  return <Box sx={{ marginTop: '70px' }}>{pages[page] || null}</Box>;
};
