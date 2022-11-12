import React, { ReactElement } from 'react';
import './cardImage.css';

type Props = {
    thumbnail: string;
    alt: string;
    onPlayVideo: () => void
};
export const CardImage = ({ thumbnail, alt, onPlayVideo }: Props): ReactElement => {
    return (
        <div className="card-image__wrapper" onClick={() => onPlayVideo()}>
            <img
                src={`${thumbnail}?w=248&fit=crop&auto=format`}
                alt={alt}
                loading="lazy"

            />
        </div>
    );
};