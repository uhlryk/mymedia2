// if duration is < 120s there should be 4 thumbnails, otherwise thumbnail per 30s
export const getFramePerSec = (duration: number): number => {
    let framePerSec
    if (duration < 120) {
        framePerSec = 4 / duration;
    } else {
        framePerSec = 1 / 30;
    }

    return framePerSec;
}