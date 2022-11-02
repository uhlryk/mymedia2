import {
  Divider,
  Box,
  Toolbar,
  ListItemText,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import React, { FC } from 'react';

export const FilterSidePanel: FC = () => {
  return (
    <Box>
      <div style={{ width: '300px' }}>
        <Toolbar />
        <Divider />
        <List>
          {['test1', 'test2'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['test3', 'test4'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
};
