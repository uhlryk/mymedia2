import React, { ReactElement } from 'react';
import { ImageList, Box } from '@mui/material';
import { Card } from './Card';
import { IResource } from '../../../../../../../shared/IResource';

type Props = {
    list: IResource[];
    onClickImage: (id: string) => void;
    onClickInfo: (id: string) => void;
}

export const CardList = ({ list, onClickImage, onClickInfo }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexBasis: 'auto', flexGrow: 1 }}>
            <ImageList cols={4} rowHeight={230} sx={{ width: '100%', margin: 0 }}>
                {list.map((resource) => (
                    <Card
                        key={resource.id}
                        title={resource.name}
                        subtitle={resource.relativePath}
                        imageSrc={resource.mainThumbnail}
                        onClickImage={() => onClickImage(resource.id)}
                        onClickInfo={() => onClickInfo(resource.id)}
                    />
                ))}
            </ImageList>
        </Box>
    )
}