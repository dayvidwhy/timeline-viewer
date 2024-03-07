import { useState } from "react";
import PropTypes from "prop-types";
import { getTimeRangesForTimeline } from "../utils/timeCompare.js";

import { TimelineItem } from "./TimelineItem.jsx";
import { TimelineSelector } from "./TimelineSelector.jsx";
import { useVideoRequest } from "../hooks/useVideoRequest.js";

export const TimelineTrack = ({ timelineTimes }) => {
    const [username, setUsername] = useState("");
    const { data, fetchData } = useVideoRequest(username);

    const videoTimelineData = getTimeRangesForTimeline(timelineTimes, data);
    return (
        <tr className="h-24">
            <th className="border border-slate-300">
                <TimelineSelector
                    setUsername={setUsername}
                    fetchData={fetchData} />
            </th>
            {videoTimelineData.map((timelineDataItem, index) => {
                let content = null;

                if (timelineDataItem) {
                    content = (<TimelineItem
                        timeLineData={timelineDataItem}
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