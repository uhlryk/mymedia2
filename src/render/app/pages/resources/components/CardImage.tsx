import React, { ReactElement } from 'react';

type Props = {
    thumbnail: string;
    alt: string;
};
export const CardImage = ({ thumbnail, alt }: Props): ReactElement => {
    return (
        <img
            src={`${thumbnail}?w=248&fit=crop&auto=format`}
            alt={alt}
            loading="lazy"
            className="MuiImageListItem-img"

        />
    );
};