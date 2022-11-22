import React, { ReactElement } from 'react';
import { Page } from '../store/useAppStore';
import { Box } from '@mui/material';

type Props = {
  pages: {
    [key: string]: ReactElement;
  };
  currentPage: Page
};
export const Router = ({ pages, currentPage }: Props): ReactElement => {
  return (
    <Box sx={{ marginTop: '75px', width: '100%' }}>{pages[currentPage] || null}</Box>
  );
};
