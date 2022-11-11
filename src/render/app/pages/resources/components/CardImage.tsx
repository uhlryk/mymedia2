import React, { ReactElement } from 'react';
import './cardImage.css';

type Props = {
    thumbnail: string;
    alt: string;
};
export const CardImage = ({ thumbnail, alt }: Props): ReactElement => {
    return (
        <div className="card-image__wrapper" onClick={() => console.log('play video')}>
            <img
                src={`${thumbnail}?w=248&fit=crop&auto=format`}
                alt={alt}
                loading="lazy"

            />
        </div>
    );
};