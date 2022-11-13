import React from 'react';
import { Box, Modal, Fade, Backdrop, Typography, Button } from '@mui/material';

import { IResource } from '../../../../../shared/IResource';
type Props = {
    resourceId: string | null;
    resources: IResource[];
    onHideDetails: () => void;
}
export const ResourceDetails = ({ resourceId, resources, onHideDetails }: Props) => {
    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
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
                <Box sx={style}>
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