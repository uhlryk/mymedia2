import React, { useContext, FC } from 'react';
import { AppContext, AppContextType } from '../store/store';
import { Box } from '@mui/material';

type Props = {
  pages: {
    [key: string]: JSX.Element;
  };
};
export const Router: FC<Props> = ({ pages }) => {
  const {
    appState: { page },
  } = useContext<AppContextType>(AppContext);
  return <Box sx={{ marginTop: '70px' }}>{pages[page] || null}</Box>;
};
