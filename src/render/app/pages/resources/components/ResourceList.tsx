import {
  ImageList,
  ImageListItem,
  ListSubheader,
  ImageListItemBar,
  IconButton,
  Box,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import { IResource } from '../../../../../shared/IResource';
import Loader from '../../../../components/Loader';

type Props = {
  list: IResource[] | null;
};

export default function ResourceList({ list }: Props): JSX.Element {
  console.log(`[ResourceList] start resources ${list?.length}`);

  if (!list) {
    return <Loader></Loader>;
  }

  return (
    <ImageList
      cols={4}
      rowHeight={230}
      sx={{
        width: '100%',
        margin: 0,
      }}
    >
      {list.map(resource => (
        <ImageListItem key={resource.id}>
          <img
            src={`${resource.thumbnails?.at(0)}?w=248&fit=crop&auto=format`}
            alt={resource.baseName}
            loading="lazy"
          />
          <ImageListItemBar
            title={resource.baseName}
            subtitle={resource.relativePath}
            actionIcon={
              <IconButton
                sx={{
                  color: 'rgba(255, 255, 255, 0.54)',
                }}
                aria-label={`info about ${resource.baseName}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
