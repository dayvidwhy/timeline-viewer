import { VideoForBlock, PaddedBlockSegments } from "@timeline-viewer/types";

export const padVideoBlocks = (videosForBlock: VideoForBlock[]): PaddedBlockSegments[] => {
    const blockItems: PaddedBlockSegments[] = [];
    let currentEnd = 100;

    // For our block, add blank sections, padding space
    // where there is no video for that time.
    videosForBlock.forEach((video) => {
        if (video.timeData.end !== currentEnd) {
            // add an empty block
            blockItems.push({
                timeData: {
                    end: currentEnd,
                    start: video.timeData.end
                }
            });
        }
        
        // add a video block
        blockItems.push(video);
        currentEnd = video.timeData.start;
    });
    
    return blockItems;
};
