import { useState } from "react";
import PropTypes from "prop-types";
import { findVideosPerTimelineBlock } from "../utils/timeCompare.js";

import { TimelineBlock } from "./TimelineBlock.jsx";
import { TimelineSelector } from "./TimelineSelector.jsx";
import { useVideoRequest } from "../hooks/useVideoRequest.js";

export const TimelineTrack = ({ timelineTimes }) => {
    const [username, setUsername] = useState("");
    const { data, fetchData, isPending } = useVideoRequest(username);

    const timeslotData = findVideosPerTimelineBlock(timelineTimes, data);

    return (
        <tr className="h-16">
            <th className="border border-slate-300 h-inherit border-r-4">
                <TimelineSelector
                    setUsername={setUsername}
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
                            timeLineData={timeslotData.videoStorage[timelineTime]}
                        />
                    </td>
                );
            })}
        </tr>
    )
};

TimelineTrack.propTypes = {
    timelineTimes: PropTypes.array
}