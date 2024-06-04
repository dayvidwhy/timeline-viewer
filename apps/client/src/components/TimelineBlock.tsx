import React, { Fragment } from "react";
import { Tooltip } from "react-tooltip";
import { VideoForBlock } from "@timeline-viewer/types";

type TimelineBlockProps = {
    videosForBlock: VideoForBlock[];
};

export const TimelineBlock = ({ videosForBlock }: TimelineBlockProps) => {    
    const blockItems: VideoForBlock[] = [];
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

    return (
        <div className="h-full flex">
            {blockItems.map((item, index) => (
                <Fragment
                    key={index}>
                    <div 
                        id={item.video ? "video-tooltip-" + item.video.id + index : ""}
                        onClick={() => {
                            if (item.video) {
                                window.open(item.video.url, "_blank");
                            }
                        }} 
                        className={`h-full ${item.video ? "cursor-pointer bg-slate-700" : null}`}
                        style={{width: item.timeData.end - item.timeData.start + "%"}}
                    />
                    { item.video && (
                        <Tooltip
                            anchorSelect={"#video-tooltip-" + item.video.id + index}
                            place="top"
                            style={{width: "content-fit"}}
                        >
                            {
                                item.video.title.length > 40 ?
                                    item.video.title.substring(0, 40) + "..." :
                                    item.video.title
                            }
                        </Tooltip>
                    )}
                </Fragment>
            ))}
        </div>
    );
};
