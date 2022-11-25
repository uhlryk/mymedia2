import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { IProject } from "../../../../../shared/IProject"


type Props = {
    projectList: IProject[],
    onSelectProject: (projectId: string) => void,
    onRemoveProject: (projectId: string) => void,
}
export const ProjectList = ({ projectList, onSelectProject, onRemoveProject }: Props) => {
    const tableRows = projectList.map((project) => (
        <TableRow hover key={project.id}>
            <TableCell
                component="th"
                scope="row"
                onClick={() => onSelectProject(project.id)}
            >
                {project.name}
            </TableCell>
            <TableCell
                component="th"
                scope="row"
                onClick={() => onSelectProject(project.id)}
            >
                {project.folderPath}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                <IconButton
                    aria-label="open"
                    onClick={() => onSelectProject(project.id)}
                >
                    <FolderOpenIcon />
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                <IconButton aria-label="rename">
                    <DriveFileRenameOutlineIcon />
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" align="center">
                <IconButton
                    aria-label="delete"
                    onClick={() => onRemoveProject(project.id)}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ));

    return (
        <TableContainer
            component={Paper}
            sx={{
                padding: '30px',
            }}
        >
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow hover>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Project Path</TableCell>
                        <TableCell align="center">Open</TableCell>
                        <TableCell align="center">Rename</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{tableRows}</TableBody>
            </Table>
        </TableContainer>
    );
}