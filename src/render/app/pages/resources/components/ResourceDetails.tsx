import React from 'react';
import { Box, Modal, Fade, Backdrop, Typography, Button } from '@mui/material';
import './resourceDetails.css';

import { IResource } from '../../../../../shared/IResource';
type Props = {
    resourceId: string | null;
    resources: IResource[];
    onHideDetails: () => void;
}
export const ResourceDetails = ({ resourceId, resources, onHideDetails }: Props) => {
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
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}