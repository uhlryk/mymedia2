import React from 'react';
import Button from '@mui/material/Button';
import Request from './Request';
export default function ProjectList(): JSX.Element {
    console.log(window);
    // Request.send<number, string[]>("ProjectList", 1).then(a => console.log(a))
    return <>
        <div>Project List</div>
        <Button variant="contained" color="primary">
            Hello World
        </Button>
    </>
}