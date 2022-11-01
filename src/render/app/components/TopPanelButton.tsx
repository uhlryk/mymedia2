import React, { MouseEventHandler, FC } from 'react';
import { Button } from '@mui/material';

type Props = {
  onClick: MouseEventHandler;
  isActive?: boolean;
  isVisible?: boolean;
};

export const TopPanelButton: FC<Props> = ({
  onClick,
  isActive,
  children,
  isVisible = true,
}) => {
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
