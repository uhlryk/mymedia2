import React from 'react';
import { IProject } from '../../../shared/IProject';

type Props = {
    project: IProject
}
export default function ResourceList({ project }: Props): JSX.Element {
    console.log(`[SelectProject] start ${project.id}`)
    return (
        <>
            ResourceList for project {project.name}
        </>
    )
}