import React from 'react';
import {
    Box,
    Modal,
    Drawer,
    Fade,
    Backdrop,
    Typography,
    ImageList,
} from '@mui/material';
import './resourceDetails.css';
import { Card } from './Card';
import { IResource } from '../../../../../shared/IResource';
type Props = {
    resourceId: string | null;
    resources: IResource[];
    onClickImage: (resourceId: string) => void;
    onHideDetails: () => void;
};
export const ResourceDetails = ({
    resourceId,
    resources,
    onHideDetails,
    onClickImage,
}: Props) => {
    if (!resourceId) {
        return;
    }
    const resource = resources.find((resource) => resource.id === resourceId);


    const cards = [];
    for (let i = 0; i < 4; i++) {
        cards.push(<Card
            key={`${resource.id}_${i}`}
            imageSrc={resource.thumbnails?.at(i)}
            onClickImage={() => onClickImage(resource.id)}
        />);
    }
    return (
        <Drawer
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={!!resourceId}
            onClose={onHideDetails}
            anchor='right'

        >
            <Box className='resource-details__wrapper'>
                <ImageList cols={1} rowHeight={350} sx={{ width: '100%', margin: 0 }}>
                    <Card
                        imageSrc={resource.thumbnails?.at(0)}
                        onClickImage={() => onClickImage(resource.id)}
                    />
                </ImageList>
                <ImageList cols={4} rowHeight={150} sx={{ width: '100%', margin: 0 }}>
                    {cards}
                </ImageList>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    {resource.baseName}
                </Typography>
            </Box>
        </Drawer>
    );
};
