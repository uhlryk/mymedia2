import React, { ReactElement } from 'react';
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
            <img
                src={thumbnail}
                alt={alt}
                loading="lazy"
            />
        </div>
    );
};
