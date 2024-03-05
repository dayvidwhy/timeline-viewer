import PropTypes from "prop-types";

export const TimelineSelector = ({ setUsername, fetchData }) => {
    return (
        <div className="block text-gray-900 border-solid border-slate-700">
            <label className="">
                <input
                    className="
                        border 
                        border-gray-300 
                        text-gray-900 
                        focus:ring-slate-500 
                        focus:border-slate-500 
                        block 
                        w-full 
                        p-2.5"
                    type="text" 
                    onChange={(event) => setUsername(event.target.value)} 
                />
            </label>
            <div className="">
                <button
                    className="
                        w-full
                        bg-slate-500 
                        hover:bg-slate-700 
                        text-slate-100
                        rounded
                        p-1"
                    onClick={fetchData}>
                    Load
                </button>
            </div>
        </div>
    );
};

TimelineSelector.propTypes = {
    setUsername: PropTypes.func,
    fetchData: PropTypes.func
};
