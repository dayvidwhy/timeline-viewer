import { useState } from "react";
import { TimelineTrack } from "./TimelineTrack.jsx";

export const Timeline = () => {
    const [trackCount, setTrackCount] = useState(1);

    return (
        <>
            <table className="border-collapse border border-slate-40 table-fixed w-full overflow-hidden">
                <thead>
                    <tr>
                        <th className="w-24">
                            Selector
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: trackCount }, (_, index) => (
                        <TimelineTrack key={index} />
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

