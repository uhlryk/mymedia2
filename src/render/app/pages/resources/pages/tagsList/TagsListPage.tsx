import React from 'react';
import { useAppSelector } from '../../../../store/store';
import { selectTagsList } from '../../store/resourcesSlice';

export const TagsListPage = () => {
    const tagList = useAppSelector(selectTagsList);
    console.log(tagList);
    return (
        <h1>Hello TagsList page</h1>
    )
}