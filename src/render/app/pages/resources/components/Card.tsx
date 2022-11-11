import React, { ReactElement } from 'react';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { IResource } from '../../../../../shared/IResource';
import { CardImage } from './CardImage';

type Props = {
    resource: IResource;
};
export const Card = ({ resource }: Props): ReactElement => {
    return (
        <ImageListItem>
            <CardImage
                thumbnail={resource.thumbnails?.at(0)}
                alt={resource.baseName}
            />
            {/* <img
                src={`${resource.thumbnails?.at(0)}?w=248&fit=crop&auto=format`}
                alt={resource.baseName}
                loading="lazy"
            /> */}
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
    );
};
