import React, { ReactElement } from 'react';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { IResource } from '../../../../../shared/IResource';
import { CardImage } from './CardImage';

type Props = {
    title?: string;
    subtitle?: string;
    imageSrc: string | null;

    onClickImage: () => void;
    onClickInfo?: () => void;
};
export const Card = ({
    title,
    subtitle,
    imageSrc,
    onClickImage,
    onClickInfo,
}: Props): ReactElement => {
    let iconButton;
    if (onClickInfo) {
        iconButton = (
            <IconButton
                onClick={() => onClickInfo()}
                sx={{
                    color: 'rgba(255, 255, 255, 0.54)',
                }}
                aria-label={`info about ${title}`}
            >
                <InfoIcon />
            </IconButton>
        );
    }
    let itemBar;
    if (title || subtitle || iconButton) {
        itemBar = <ImageListItemBar
            title={title}
            subtitle={subtitle}
            actionIcon={iconButton}
        />
    }
    return (
        <ImageListItem>
            <CardImage
                thumbnail={imageSrc}
                alt={title}
                onClickImage={() => onClickImage()}
            />
            {itemBar}
        </ImageListItem>
    );
};
