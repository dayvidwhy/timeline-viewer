import PropTypes from "prop-types";

export const Button = ({ text, onClick, className }) => (
    <button
        className={`
            bg-slate-100 
            hover:bg-slate-300 
            text-slate-600 
            text-xs 
            p-1
            ${className} 
        `}
        onClick={onClick}>
        {text}
    </button>
);

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
};
