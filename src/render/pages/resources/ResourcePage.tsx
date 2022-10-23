import React, { useEffect, useState } from 'react';
import { IResource } from '../../../shared/IResource';
import fetch from '../../communication/fetch';
import { IProject } from '../../../shared/IProject';
import ResourceList from './components/ResourceList';

type Props = {
    project: IProject
}
export default function ResourcePage({ project }: Props): JSX.Element {
    console.log(`[SelectProject] start ${project.id}`)
    const [resourceList, setResourceList] = useState<IResource[]>(null);
    useEffect(() => {
        fetch<IResource[]>('get/project-data', project.folderPath).then(resourceList => {
            setResourceList(resourceList);
            console.log(resourceList)
        })
    }, [])


    return (
        <>
            ResourceList for project {project.name}

            <ResourceList list={resourceList} ></ResourceList>
        </>
    )
}