import React, { MouseEventHandler, ReactNode, ReactElement } from 'react';
import { Button } from '@mui/material';

type Props = {
  onClick: MouseEventHandler;
  isActive?: boolean;
  isVisible?: boolean;
  children: ReactNode;
};

export const TopPanelButton = ({
  onClick,
  isActive,
  isVisible = true,
  children
}: Props): ReactElement => {
  if (!isVisible) {
    return null;
  }
  return (
    <Button
      key={'projects'}
      onClick={onClick}
      disableElevation
      variant={isActive ? 'contained' : 'text'}
      color="success"
      sx={{
        my: 2,
        color: 'white',
        display: 'block',
      }}
    >
      {children}
    </Button>
  );
};
