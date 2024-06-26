import React from "react";

export const Footer = () => {
    return (
        <div className="
            flex
            justify-center
            bg-slate-300
            border-slate-400
            border-t-2
            p-2
        ">
            <p>
                Find{" "}
                <a className="underline hover:text-cyan-600" href="https://github.com/dayvidwhy/timeline-viewer">
                    source 
                </a> and{" "} 
                <a className="underline hover:text-cyan-600" href="https://github.com/dayvidwhy">
                    myself
                </a> on Github.
            </p>
        </div>
    );
};
