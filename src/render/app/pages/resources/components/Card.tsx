import React, { ReactElement } from 'react';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { IResource } from '../../../../../shared/IResource';
import { CardImage } from './CardImage';

type Props = {
    resource: IResource;
    onPlayVideo: (resourceId: string) => void;
    onClickDetails: (resourceId: string) => void;
};
export const Card = ({ resource, onPlayVideo, onClickDetails }: Props): ReactElement => {

    return (
        <ImageListItem>
            <CardImage
                thumbnail={resource.thumbnails?.at(0)}
                alt={resource.baseName}
                onPlayVideo={() => onPlayVideo(resource.id)}
            />
            <ImageListItemBar
                title={resource.baseName}
                subtitle={resource.relativePath}
                actionIcon={
                    <IconButton
                        onClick={() => onClickDetails(resource.id)}
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
