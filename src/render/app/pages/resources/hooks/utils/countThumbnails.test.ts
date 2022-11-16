import { countThumbnails } from "./countThumbnails";

describe('countThumbnails', () => {
    test('when no thumbnails', () => {
        expect(countThumbnails(null)).toBe(0);
    });
})