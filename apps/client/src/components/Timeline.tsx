import React, { useState, useMemo } from "react";
import { TimelineTrack } from "./TimelineTrack.jsx";
import { format, subHours, subDays, set } from "date-fns";

import { Button } from "./Button.jsx";

export const Timeline = () => {
    const [trackCount, setTrackCount] = useState(2);

    const [timePeriod, setTimePeriod] = useState<"day" | "week" | "month">("day");

    const timelineTimes: Date[] = useMemo(() => {
        const now = new Date();
        if (timePeriod === "day") {
            return Array.from({ length: 25 }, (_, index) => (
                set(subHours(now, index - 1), {
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                })
            ));
        } else if (timePeriod === "week") {
            return Array.from({ length: 8 }, (_, index) => (
                set(subDays(now, index - 1), {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                })
            ));
        } else if (timePeriod === "month") {
            return Array.from({ length: 29 }, (_, index) => (
                set(subDays(now, index - 1), {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0
                })
            ));
        }
        return [];
    }, [timePeriod]);

    const formattedTimes = useMemo(() => {
        if (!timelineTimes) return [];
        return timelineTimes.map((time) => {
            if (timePeriod === "day") {
                return format(time, "haaa");
            } else if (timePeriod === "week" || timePeriod === "month") {
                return format(time, "EEEEEE");
            }
        });
    }, [timelineTimes, timePeriod]);

    return (
        <>
            <Button
                text="Daily"
                className="rounded w-20 h-1/2 mr-1"
                onClick={() => setTimePeriod("day")} />
            <Button
                text="Weekly"
                className="rounded w-20 h-1/2 mr-1"
                onClick={() => setTimePeriod("week")} />
            <Button
                text="Monthly"
                className="rounded w-20 h-1/2 mr-1"
                onClick={() => setTimePeriod("month")} />
            <table className="border-collapse table-fixed w-full overflow-hidden">
                <thead>
                    <tr>
                        <th className="w-24 text-sm text-left">
                            Streamer
                        </th>
                        {formattedTimes.map((formattedTime, index) => {
                            if (index === formattedTimes.length - 1) {
                                return null;
                            }
                            return (
                                <th key={index} className={"h-inherit text-xs text-left"}>
                                    {formattedTime}
                                </th>
                            );
                        })}
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
                    className="p-2 text-lg w-24 mr-1"/>
                <Button 
                    text="Remove Track" 
                    onClick={() => trackCount > 0 ? setTrackCount(trackCount - 1) : null} 
                    className="p-2 text-lg w-24 ml-1"/>
            </div>
        </>
    );
};
