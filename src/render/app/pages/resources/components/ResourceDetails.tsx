import React, { ReactElement } from 'react';
import {
    Box,
    Drawer,
    ImageList,
} from '@mui/material';
import './resourceDetails.css';
import { Card } from './Card';
import { IResource } from '../../../../../shared/IResource';
import { ReadWriteValue } from '../../../components/ReadWriteValue';
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
}: Props): ReactElement => {
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
                <ImageList cols={4} rowHeight={150} sx={{ width: '100%', margin: '10px 0' }}>
                    {cards}
                </ImageList>

                <ReadWriteValue value={resource.name} label='name' onChange={(t) => console.log(t)} />

            </Box>
        </Drawer>
    );
};
