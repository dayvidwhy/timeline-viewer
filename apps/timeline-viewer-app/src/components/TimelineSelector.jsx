import PropTypes from "prop-types";

export const TimelineSelector = ({ setUsername, fetchData, isPending }) => {
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
            <button
                className="
                    h-1/2
                    w-full
                    bg-slate-100 
                    hover:bg-slate-300 
                    text-slate-600
                    text-xs 
                    p-1"
                onClick={fetchData}>
                { isPending ? "Loading" : "Load" }
            </button>
        </div>
    );
};

TimelineSelector.propTypes = {
    setUsername: PropTypes.func,
    fetchData: PropTypes.func,
    isPending: PropTypes.bool
};
