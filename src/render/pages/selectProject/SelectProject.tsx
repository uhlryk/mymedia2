import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { IProjectListElement } from '../../../main/IProjectList';
import fetch from "../../communication/fetch";
import CreateProject from './createProject/CreateProject';

export default function SelectProject(): JSX.Element {
    const dispatch = useAppDispatch();

    const [projectList, setProjectList] = useState<IProjectListElement[]>([]);
    useEffect(() => {
        fetch<IProjectListElement[]>('get/project-list').then(projectList => {
            setProjectList(projectList);
            console.log(projectList)
        })
    }, [])
    console.log(projectList);
    const list = projectList.map(project => <li>{project.name}</li>)
    return <>
        <CreateProject />
        SelectProject
        <ul>
            {list}
        </ul>
    </>
}