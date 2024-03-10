import { useState } from "react";
import { TimelineTrack } from "./TimelineTrack.jsx";
import { format, subHours, subDays, set } from "date-fns";

import { Button } from "./Button.jsx";

export const Timeline = () => {
    const [trackCount, setTrackCount] = useState(2);

    const [timePeriod, setTimePeriod] = useState("day");

    const [timelineTimes, setTimelineTimes] = useState(
        Array.from({ length: 25 }, (_, index) => (
            set(subHours(new Date(), index - 1), {
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            })
        ))
    );

    return (
        <>
            <Button
                text="Daily"
                className="rounded w-20 h-1/2 mr-1"
                onClick={() => {
                    setTimePeriod("day");
                    setTimelineTimes(Array.from({ length: 25 }, (_, index) => (
                        set(subHours(new Date(), index - 1), {
                            minutes: 0,
                            seconds: 0,
                            milliseconds: 0
                        })
                    )))
                }} />
            <Button
                text="Weekly"
                className="rounded w-20 h-1/2 mr-1"
                onClick={() => {
                    setTimePeriod("week");
                    setTimelineTimes(Array.from({ length: 8 }, (_, index) => (
                        set(subDays(new Date(), index - 1), {
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                            milliseconds: 0
                        })
                    )))
                }} />
            <Button
                text="Monthly"
                className="rounded w-20 h-1/2 mr-1"
                onClick={() => {
                    setTimePeriod("month");
                    setTimelineTimes(Array.from({ length: 29 }, (_, index) => (
                        set(subDays(new Date(), index - 1), {
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                            milliseconds: 0
                        })
                    )))
                }} />
            <table className="border-collapse table-fixed w-full overflow-hidden">
                <thead>
                    <tr>
                        <th className="w-24 text-sm text-left">
                            Streamer
                        </th>
                        {Array.from({ length: timelineTimes.length - 1 }, (_, index) => (
                            <th key={index} className={`h-inherit text-xs text-left`}>
                                {
                                    timePeriod === "day" ?
                                        format(timelineTimes[index], "haaa") :
                                        (timePeriod === "week" || timePeriod === "month") ?
                                            format(timelineTimes[index], "EEEEEE") : null
                                }
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
                <Button 
                    text="Add Track" 
                    onClick={() => setTrackCount(trackCount + 1)} 
                    className="p-4 text-lg w-fit"/>
            </div>
        </>
    );
};

