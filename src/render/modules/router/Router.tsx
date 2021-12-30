import React from "react";
import { useAppSelector } from "../../store/hooks";
import Loader from "../../components/Loader";
import ProjectList from "../projectList/ProjectList";
import { selectLoader } from "./router.slice";

export default function Router(): JSX.Element {
    const isLoaderVisible = useAppSelector(selectLoader);
    let element;
    switch ('') {
        case '':
            element = <ProjectList ></ProjectList>
            break;
    }

    let loader = null;
    if(isLoaderVisible) {
        loader = <Loader ></Loader>
    }

    return <>
        {element}
        {loader}
    </>;
}