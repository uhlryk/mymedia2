import React, { useState } from 'react';

export default function CreateProject(): JSX.Element {
    const [projectName, setProjectName] = useState("");
    return <div>
        <input value={projectName} onChange={(event) => setProjectName(event.target.value)} />
    </div>
}