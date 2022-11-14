export const getVideoPosition = (index: number, duration: number, maxThumbnails: number): number => {
    const newDuration = 0.9 * duration;
    const videoPosition: number = Math.round(
        0.1 * duration + (index * newDuration) / maxThumbnails
    );
    return videoPosition;
}