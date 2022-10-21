import React, { useState } from 'react';
import fetch from '../../../communication/fetch';

export default function CreateProject(): JSX.Element {
    const [projectName, setProjectName] = useState("");
    const [projectFolderPath, setProjectFolderPath] = useState<string>("");
    const [waitingForDialog, setWaitingForDialog] = useState<boolean>(false);
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

    }

    const onProjectPathClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
        setWaitingForDialog(true);
        fetch<string | null>('get/new-project-folder').then(projectPath => {
            setWaitingForDialog(false);
            setProjectFolderPath(projectPath);
        })
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input value={projectName} onChange={(event) => setProjectName(event.target.value)} />

            <input value={projectFolderPath} readOnly />

            <button onClick={onProjectPathClick} disabled={waitingForDialog} >Select Folder</button>
            <button type="submit" disabled={!(projectFolderPath && projectName) }>Submit</button>
        </form>

    </div>
}