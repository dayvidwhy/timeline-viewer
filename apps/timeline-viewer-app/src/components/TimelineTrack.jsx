import { useState } from "react";

import { TimelineItem } from "./TimelineItem.jsx";
import { TimelineSelector } from "./TimelineSelector.jsx";
import { useVideoRequest } from "../hooks/useVideoRequest.js";

export const TimelineTrack = () => {
    const [username, setUsername] = useState("");
    const { data, fetchData } = useVideoRequest(username);

    return (
        <>
            <TimelineSelector
                setUsername={setUsername}
                fetchData={fetchData} />
            {data.map((video) => {
                return (
                    <TimelineItem
                        key={video.id}
                        video={video}
                    />
                );
            })}
        </>
    )
};
