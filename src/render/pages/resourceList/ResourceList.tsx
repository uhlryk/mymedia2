import React from 'react';
import { IProjectListElement } from '../../../main/IProjectList';

type Props = {
    project: IProjectListElement
}
export default function ResourceList({ project }: Props): JSX.Element {
    console.log(`[SelectProject] start ${project.id}`)
    return (
        <>
            ResourceList for project {project.name}
        </>
    )
}