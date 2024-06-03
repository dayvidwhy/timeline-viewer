import React, {useRef } from "react";

import { Button } from "./Button.jsx";

type TimelineSelectorProps = {
    fetchData: (username: string) => void;
    isPending: boolean;
};

export const TimelineSelector = ({
    fetchData,
    isPending
}: TimelineSelectorProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="block text-gray-900 border-solid border-slate-700 h-full">
            <label className="h-1/2 block">
                <input
                    ref={inputRef}
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
                />
            </label>
            <Button
                text={ isPending ? "Loading" : "Load" }
                className="w-full p-1 h-1/2"
                onClick={() => {
                    const username = inputRef.current?.value;
                    if (!username) return;
                    fetchData(username);
                }}
                disabled={isPending} />
        </div>
    );
};
