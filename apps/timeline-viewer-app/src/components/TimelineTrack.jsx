import { useState } from "react";
import PropTypes from "prop-types";
import { checkTimeslotsPerVideo } from "../utils/timeCompare.js";

import { TimelineItem } from "./TimelineItem.jsx";
import { TimelineSelector } from "./TimelineSelector.jsx";
import { useVideoRequest } from "../hooks/useVideoRequest.js";

export const TimelineTrack = ({ timelineTimes }) => {
    const [username, setUsername] = useState("");
    const { data, fetchData, isPending } = useVideoRequest(username);

    const timeslotData = checkTimeslotsPerVideo(timelineTimes, data);

    return (
        <tr className="h-16">
            <th className="border border-slate-300 h-inherit border-r-4">
                <TimelineSelector
                    setUsername={setUsername}
                    fetchData={fetchData}
                    isPending={isPending} />
            </th>
            {timelineTimes.map((timelineTime, index) => {
                let content = null;

                if (timeslotData.videoStorage[timelineTime].videos.length > 0) {
                    content = (<TimelineItem
                        timeLineData={timeslotData.videoStorage[timelineTime]}
                    />);
                }

                return (
                    <td className="border border-slate-300 bg-slate-100 h-inherit p-0"
                        key={index}>
                        {content}
                    </td>
                );
            })}
        </tr>
    )
};

TimelineTrack.propTypes = {
    timelineTimes: PropTypes.array
}