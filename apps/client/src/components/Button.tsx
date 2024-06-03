import React from "react";

type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
};

export const Button = ({ text, onClick, className, disabled }: ButtonProps) => (
    <button
        className={`
            bg-slate-100 
            hover:bg-slate-300 
            text-slate-600 
            text-xs 
            p-1
            ${className} 
        `}
        disabled={disabled}
        onClick={onClick}>
        {text}
    </button>
);
