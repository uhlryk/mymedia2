import React from 'react';
import { IResource } from '../../../../../shared/IResource';
import Loader from '../../../../components/Loader';

type Props = {
    list: IResource[] | null
}
export default function ResourceList({ list }: Props): JSX.Element {
    console.log(`[ResourceList] start resources ${list?.length}`)

    if (!list) {
        return <Loader></Loader>
    }

    const resourceComponents = list.map(resource => <div key={resource.relativePath}>{resource.baseName}</div>)
    return (
        <>
            {resourceComponents}
        </>
    )
}