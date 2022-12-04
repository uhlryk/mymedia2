import React, { ReactElement } from 'react';
import {
    Box,
    Drawer,
    ImageList,
} from '@mui/material';
import './resourceDetails.css';
import { Card } from '../Card';
import { IChangeResource, IResource } from '../../../../../../../../shared/IResource';
import { ReadWriteValue } from '../../../../../../components/ReadWriteValue';
import { ResourceRating } from '../ResourceRating';
import { TagsSection } from './TagsSection';
type Props = {
    resource: IResource | null;
    onClickImage: (resourceId: string) => void;
    onHideDetails: () => void;
    onChangeProps: (resourceId: string, props: IChangeResource) => void;
};
export const ResourceDetails = ({
    resource,
    onHideDetails,
    onClickImage,
    onChangeProps
}: Props): ReactElement => {
    if (!resource) {
        return;
    }

    const cards = [];
    for (let i = 0; i < 4; i++) {
        cards.push(<Card
            key={`${resource.id}_${i}`}
            imageSrc={resource.thumbnails?.at(i)}
            onClickImage={() => onClickImage(resource.id)}
        />);
    }

    const handleOnChangeName = (name: string) => {
        onChangeProps(resource.id, {
            name
        })
    }

    const handleOnChangeDetails = (details: string) => {
        onChangeProps(resource.id, {
            details
        })
    }

    const handleOnChangeRating = (value: number) => {
        onChangeProps(resource.id, {
            rating: value
        })
    }

    return (
        <Drawer
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={!!resource.id}
            onClose={onHideDetails}
            anchor='right'

        >
            <Box className='resource-details__wrapper'>
                <ImageList cols={1} rowHeight={310} sx={{ width: '100%', margin: 0 }}>
                    <Card
                        imageSrc={resource.thumbnails?.at(0)}
                        onClickImage={() => onClickImage(resource.id)}
                    />
                </ImageList>
                <ImageList cols={4} rowHeight={100} sx={{ width: '100%', margin: '3px 0' }}>
                    {cards}
                </ImageList>

                <ResourceRating value={resource.rating} onChange={handleOnChangeRating} />
                <ReadWriteValue value={resource.name} label='name' onChange={handleOnChangeName} />
                <ReadWriteValue value={resource.details} label='details' onChange={handleOnChangeDetails} multiline={true} />

                <TagsSection />
            </Box>
        </Drawer>
    );
};
