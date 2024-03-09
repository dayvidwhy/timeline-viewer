import { useState } from "react";
import { TimelineTrack } from "./TimelineTrack.jsx";
import { format, subHours, set } from "date-fns";

export const Timeline = () => {
    const [trackCount, setTrackCount] = useState(2);

    const hoursBackToShow = 24;

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
            <table className="border-collapse table-fixed w-full overflow-hidden">
                <thead>
                    <tr>
                        <th className="w-24 text-sm text-left">
                            Streamer
                        </th>
                        {Array.from({ length: hoursBackToShow }, (_, index) => (
                            <th key={index} className="h-inherit text-xs text-left">
                                {format(subHours(new Date(), index), "haaa")}
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
            <div className="flex justify-center p-5">
                <button
                    className="
                        p-4
                        rounded
                        bg-slate-200 
                        hover:bg-slate-300 
                        text-slate-900
                    "
                    onClick={() => {setTrackCount(trackCount + 1)}}>
                    Add Track
                </button>
            </div>
        </>
    );
};

