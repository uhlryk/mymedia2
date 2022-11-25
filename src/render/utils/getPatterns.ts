
type IPatternRoute = {
    path?: string,
    index?: boolean,
    children?: IPatternRoute[]
}
export const getPatterns = (routes: IPatternRoute[], parentPath = '/'): string[] => {
    const patterns: string[] = [];
    for (const route of routes) {
        const pattern = parentPath + (parentPath.slice(-1) === '/' ? '' : '/') + (route.path || '');
        patterns.push(pattern);
        if (route.children) {
            patterns.push(...getPatterns(route.children, pattern));
        }
    }
    return patterns;
}