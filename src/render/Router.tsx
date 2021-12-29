import React from "react";
import ProjectList from "./modules/projectList/ProjectList";

export default function Router () : JSX.Element {
    let element;
    switch('') {
        case '':
            element = <ProjectList ></ProjectList>
            break;
    }
    

    return element;
}