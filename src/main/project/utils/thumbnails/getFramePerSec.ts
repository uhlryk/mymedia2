// if duration is < 120s there should be 4 thumbnails, otherwise thumbnail per 30s
export const getFramePerSec = (duration: number): number => {
    const framePerSec = 4 / duration;

    return framePerSec;
}