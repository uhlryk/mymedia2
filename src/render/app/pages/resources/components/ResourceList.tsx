import { ImageList, Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { IResource } from '../../../../../shared/IResource';
import Loader from '../../../../components/Loader';
import { Card } from './Card';
type Props = {
  list: IResource[] | null;
  onClickImage: (resourceId: string) => void;
  onClickInfo: (resourceId: string) => void;
};

export const ResourceList = ({
  list,
  onClickImage,
  onClickInfo,
}: Props): ReactElement => {
  console.log(`[ResourceList] start resources ${list?.length}`);

  if (!list) {
    return <Loader></Loader>;
  }

  return (
    <Box sx={{ display: 'flex', flexBasis: 'auto', flexGrow: 1 }}>
      <ImageList cols={4} rowHeight={230} sx={{ width: '100%', margin: 0 }}>
        {list.map((resource) => (
          <Card
            key={resource.id}
            title={resource.name}
            subtitle={resource.relativePath}
            imageSrc={resource.thumbnails?.at(0)}
            onClickImage={() => onClickImage(resource.id)}
            onClickInfo={() => onClickInfo(resource.id)}
          />
        ))}
      </ImageList>
    </Box>
  );
};
