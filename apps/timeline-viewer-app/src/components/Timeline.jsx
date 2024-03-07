import { useState } from "react";
import { TimelineTrack } from "./TimelineTrack.jsx";
import { format, subHours, set } from "date-fns";

export const Timeline = () => {
    const [trackCount, setTrackCount] = useState(1);

    const hoursBackToShow = 48;

    const [timelineTimes] = useState(
        Array.from({ length: hoursBackToShow }, (_, index) => (
            set(subHours(new Date(), index), {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            })
        ))
    );

    return (
        <>
            <table className="border-collapse border border-slate-40 table-fixed w-full overflow-hidden">
                <thead>
                    <tr>
                        <th className="w-24">
                            Selector
                        </th>
                        {Array.from({ length: hoursBackToShow }, (_, index) => (
                            <th key={index}>
                                {format(subHours(new Date(), index), "h aaa")}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: trackCount }, (_, index) => (
                        <TimelineTrack 
                            key={index}
                            timelineTimes={timelineTimes}
                        />
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => {setTrackCount(trackCount + 1)}}>
                Add Track
            </button>
        </>
    );
};

