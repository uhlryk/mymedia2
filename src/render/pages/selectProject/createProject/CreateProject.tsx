import React, { Dispatch, SetStateAction, useState } from 'react';
import { IProjectListElement } from '../../../../main/IProjectList';
import fetch from '../../../communication/fetch';

type Props = {
    setProject: Dispatch<SetStateAction<IProjectListElement>>
}
export default function CreateProject({ setProject }: Props): JSX.Element {
    const [submitting, setSubmitting] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectFolderPath, setProjectFolderPath] = useState<string>("");
    const [waitingForDialog, setWaitingForDialog] = useState<boolean>(false);
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setSubmitting(true);
        fetch<IProjectListElement>('set/new-project', {
            name: projectName,
            folderPath: projectFolderPath
        }).then((result) => {
            console.log(`[CreateProject] status of set/new-project ${result}`)
            setSubmitting(false);
            setProject(result)
        })
    }

    const onProjectPathClick: React.MouseEventHandler<HTMLInputElement> = () => {
        setWaitingForDialog(true);
        fetch<string | null>('get/new-project-folder').then(projectPath => {
            setWaitingForDialog(false);
            setProjectFolderPath(projectPath);
        })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={projectName} onChange={(event) => setProjectName(event.target.value)} />

                <input value={projectFolderPath} readOnly />

                <button onClick={onProjectPathClick} disabled={waitingForDialog || submitting} >Select Folder</button>
                <button type="submit" disabled={!(projectFolderPath && projectName) || submitting}>Submit</button>
            </form>

        </div>
    )
}