import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

type Props = {
    sidePanelWidth: number;
}
export default function TopPanel({ sidePanelWidth }: Props) {
    return (
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${sidePanelWidth}px)`, ml: `${sidePanelWidth}px` }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Projects
                </Typography>
            </Toolbar>
        </AppBar>
    )
}