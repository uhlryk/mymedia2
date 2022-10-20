import React, { Dispatch, useEffect, useState } from 'react';
import { IProjectListElement } from '../../../main/IProjectList';
import fetch from "../../communication/fetch";

export default function SelectProject(): JSX.Element {
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
        SelectProject
        <ul>
            {list}
        </ul>
    </>
}