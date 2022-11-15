
export const countThumbnails = (thumbnails: string[] | null): number => {
    if (!thumbnails) {
        return 0;
    }
    return thumbnails.filter(thumbnail => thumbnail).length;
}