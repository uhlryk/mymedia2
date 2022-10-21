import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IProject } from '../../../shared/IProject';
import fetch from "../../communication/fetch";
import CreateProject from './createProject/CreateProject';

type Props = {
    setProject: Dispatch<SetStateAction<IProject>>
}
export default function SelectProject({ setProject }: Props): JSX.Element {
    console.log(`[SelectProject] start `)
    const [projectList, setProjectList] = useState<IProject[]>([]);
    useEffect(() => {
        fetch<IProject[]>('get/project-list').then(projectList => {
            setProjectList(projectList);
            console.log(projectList)
        })
    }, [])
    console.log(projectList);

    const onSelectProject = (id: string) => {
        const project = projectList.find(project => project.id === id)
        setProject(project);
    }

    const list = projectList.map(project => <li key={project.id} onClick={() => onSelectProject(project.id)}>{project.name}</li>)
    return (
        <>
            <CreateProject setProject={setProject} />
            SelectProject
            <ul>
                {list}
            </ul>
        </>
    )
}