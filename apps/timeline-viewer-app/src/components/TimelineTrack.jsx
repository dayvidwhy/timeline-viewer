import { useState } from "react";

import { TimelineItem } from "./TimelineItem.jsx";
import { TimelineSelector } from "./TimelineSelector.jsx";
import { useVideoRequest } from "../hooks/useVideoRequest.js";

export const TimelineTrack = () => {
    const [username, setUsername] = useState("");
    const { data, fetchData } = useVideoRequest(username);

    return (
        <tr className="h-24">
            <th className="border border-slate-300">
                <TimelineSelector
                    setUsername={setUsername}
                    fetchData={fetchData} />
            </th>
            {data.map((video) => {
                return (
                    <td className="border border-slate-300 bg-slate-100"
                        key={video.id}>
                        <TimelineItem
                            video={video}
                        />
                    </td>
                );
            })}
        </tr>
    )
};
