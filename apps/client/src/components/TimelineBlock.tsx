import React, { Fragment } from "react";
import { Tooltip } from "react-tooltip";
import { VideoForBlock, PaddedBlockSegments } from "@timeline-viewer/types";
import { padVideoBlocks } from "../utils/padVideoBlocks";

type TimelineBlockProps = {
    videosForBlock: VideoForBlock[];
};

export const TimelineBlock = ({ videosForBlock }: TimelineBlockProps) => {    
    const blockItems: PaddedBlockSegments[] = padVideoBlocks(videosForBlock);

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
