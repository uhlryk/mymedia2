import React, { ReactElement } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './cardImage.css';

type Props = {
    thumbnail: string;
    alt: string;
    onClickImage: () => void;
};
export const CardImage = ({
    thumbnail,
    alt,
    onClickImage,
}: Props): ReactElement => {
    return (
        <div className="card-image__wrapper" onClick={() => onClickImage()}>
            {thumbnail ?
                <img
                    src={thumbnail}
                    alt={alt}
                    loading="lazy"
                />
                :
                <div className="card-image__placeholder">
                    <div><CircularProgress /></div>
                </div>
            }
        </div>
    );
};
