import React from "react";
import { findVideosPerTimelineBlock } from "../utils/videosPerTimelineBlock";

import { TimelineBlock } from "./TimelineBlock.jsx";
import { TimelineSelector } from "./TimelineSelector.jsx";
import { useVideoRequest } from "../hooks/useVideoRequest.js";
import { ISODateString } from "@timeline-viewer/types";

type TimelineTrackProps = {
    timelineTimes: ISODateString[];
};

export const TimelineTrack = ({ timelineTimes }: TimelineTrackProps) => {
    const { data, fetchData, isPending } = useVideoRequest();
    const timeslotData = findVideosPerTimelineBlock(timelineTimes, data);

    return (
        <tr className="h-16">
            <th className="border border-slate-300 h-inherit border-r-4">
                <TimelineSelector
                    fetchData={fetchData}
                    isPending={isPending} />
            </th>
            {timelineTimes.map((timelineTime, index) => {
                if (index === timelineTimes.length - 1) {
                    return null;
                }

                return (
                    <td className="border border-slate-300 bg-slate-100 h-inherit p-0"
                        key={index}>
                        <TimelineBlock
                            videosForBlock={timeslotData.videoStorage[timelineTime.toString()]}
                        />
                    </td>
                );
            })}
        </tr>
    );
};
