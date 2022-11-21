import React, { ReactElement, SyntheticEvent } from 'react';
import {
    Box,
    Drawer,
    ImageList,
    Rating,
    RatingProps,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './resourceDetails.css';
import { Card } from './Card';
import { IChangeResource, IResource } from '../../../../../shared/IResource';
import { ReadWriteValue } from '../../../components/ReadWriteValue';

type Props = {
    resourceId: string | null;
    resources: IResource[];
    onClickImage: (resourceId: string) => void;
    onHideDetails: () => void;
    onChangeProps: (resourceId: string, props: IChangeResource) => void;
};
export const ResourceDetails = ({
    resourceId,
    resources,
    onHideDetails,
    onClickImage,
    onChangeProps
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

    const handleOnChangeName = (name: string) => {
        onChangeProps(resourceId, {
            name
        })
    }

    const handleOnChangeDetails = (details: string) => {
        onChangeProps(resourceId, {
            details
        })
    }

    const handleOnChangeRating = (event: SyntheticEvent, value: number) => {
        onChangeProps(resourceId, {
            rating: value
        })
    }

    const [hover, setHover] = React.useState(-1);

    const labels: { [index: string]: string } = {
        0: 'Not rated',
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

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

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        height: '80px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Rating
                        name="hover-feedback"
                        size="large"
                        value={resource.rating}
                        onChange={handleOnChangeRating}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : resource.rating]}</Box>
                </Box>

                <ReadWriteValue value={resource.name} label='name' onChange={handleOnChangeName} />
                <ReadWriteValue value={resource.details} label='details' onChange={handleOnChangeDetails} multiline={true} />

            </Box>
        </Drawer>
    );
};
