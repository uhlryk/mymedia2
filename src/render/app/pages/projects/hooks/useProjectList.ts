import { useEffect, useState } from 'react';
import { getProjectList } from '../api/getProjectList';
import { IProject } from '../../../../../shared/IProject';

export const useProjectList = (): [IProject[], boolean] => {
    const [projectList, setProjectList] = useState<IProject[]>([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getProjectList().then((projectList) => {
            setLoading(false);
            setProjectList(projectList);
        });
    }, []);

    return [projectList, isLoading];
}