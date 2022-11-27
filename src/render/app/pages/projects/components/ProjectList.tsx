import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
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