import React from 'react';
import { Box, Modal, Fade, Backdrop, Typography, ImageList } from '@mui/material';
import './resourceDetails.css';
import { Card } from './Card';
import { IResource } from '../../../../../shared/IResource';
type Props = {
    resourceId: string | null;
    resources: IResource[];
    onClickImage: (resourceId: string) => void;
    onHideDetails: () => void;
}
export const ResourceDetails = ({ resourceId, resources, onHideDetails, onClickImage }: Props) => {
    if (!resourceId) {
        return;
    }
    const resource = resources.find(resource => resource.id === resourceId);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={!!resourceId}
            onClose={onHideDetails}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >

            <Fade in={!!resourceId}>
                <Box className='resource-details__wrapper'>
                    <ImageList cols={4} rowHeight={230} sx={{ width: '100%', margin: 0 }}>
                        {resource.thumbnails.map((thumbnail) => (
                            <Card key={resource.id} resource={resource} onClickImage={onClickImage} />
                        ))}
                    </ImageList>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {resource.baseName}
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}