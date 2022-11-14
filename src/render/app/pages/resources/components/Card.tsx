import React, { ReactElement } from 'react';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { IResource } from '../../../../../shared/IResource';
import { CardImage } from './CardImage';

type Props = {
    resource: IResource;
    onClickImage: (resourceId: string) => void;
    onClickInfo?: (resourceId: string) => void;
};
export const Card = ({ resource, onClickImage, onClickInfo }: Props): ReactElement => {

    let iconButton;
    if (onClickInfo) {
        iconButton = <IconButton
            onClick={() => onClickInfo(resource.id)}
            sx={{
                color: 'rgba(255, 255, 255, 0.54)',
            }}
            aria-label={`info about ${resource.baseName}`}
        >
            <InfoIcon />
        </IconButton>;
    }
    return (
        <ImageListItem>
            <CardImage
                thumbnail={resource.thumbnails?.at(0)}
                alt={resource.baseName}
                onClickImage={() => onClickImage(resource.id)}
            />
            <ImageListItemBar
                title={resource.baseName}
                subtitle={resource.relativePath}
                actionIcon={iconButton}
            />
        </ImageListItem>
    );
};
