import React from "react";

import { Button } from "./Button.jsx";

type TimelineSelectorProps = {
    setUsername: (username: string) => void;
    fetchData: () => void;
    isPending: boolean;
};

export const TimelineSelector = ({
    setUsername,
    fetchData,
    isPending
}: TimelineSelectorProps) => {
    return (
        <div className="block text-gray-900 border-solid border-slate-700 h-full">
            <label className="h-1/2 block">
                <input
                    className="
                        h-full
                        text-center	
                        p-1
                        m-0
                        border 
                        border-gray-300 
                        text-gray-900 
                        focus:ring-slate-500 
                        focus:border-slate-500 
                        block 
                        w-full 
                        text-xs"
                    type="text"
                    onChange={(event) => setUsername(event.target.value)} 
                />
            </label>
            <Button
                text={ isPending ? "Loading" : "Load" }
                className="w-full p-1 h-1/2"
                onClick={fetchData}
                disabled={isPending} />
        </div>
    );
};
