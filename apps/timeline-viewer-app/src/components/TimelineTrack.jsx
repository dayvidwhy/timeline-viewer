import { useState } from "react";
import PropTypes from "prop-types";
import { checkTimeRange } from "../utils/timeCompare.js";

import { TimelineItem } from "./TimelineItem.jsx";
import { TimelineSelector } from "./TimelineSelector.jsx";
import { useVideoRequest } from "../hooks/useVideoRequest.js";

export const TimelineTrack = ({ timelineTimes }) => {
    const [username, setUsername] = useState("");
    const { data, fetchData } = useVideoRequest(username);

    return (
        <tr className="h-24">
            <th className="border border-slate-300">
                <TimelineSelector
                    setUsername={setUsername}
                    fetchData={fetchData} />
            </th>
            {timelineTimes.map((timelineTime, index) => {
                let content;
                // for each vid does it overlap with our current time block
                for (let i = 0; i < data.length; i++) {
                    let vid = data[i];
                    let timeData = checkTimeRange({
                        startTime: timelineTimes[index + 1],
                        endTime: timelineTimes[index],
                        startTimeToCheck: vid.start,
                        endTimeToCheck: vid.end
                    });
                    if (timeData) {
                        content = (
                            <TimelineItem
                                video={vid}
                            />
                        );
                        break;
                    }
                }

                return (
                    <td className="border border-slate-300 bg-slate-100"
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