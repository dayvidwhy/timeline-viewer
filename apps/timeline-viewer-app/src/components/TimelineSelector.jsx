import PropTypes from "prop-types";

export const TimelineSelector = ({ setUsername, fetchData }) => {
    return (
        <>
            <input 
                type="text" 
                onChange={(event) => setUsername(event.target.value)} 
            />
            <button
                onClick={fetchData}>
                Fetch Videos
            </button>
        </>
    );
};

TimelineSelector.propTypes = {
    setUsername: PropTypes.func,
    fetchData: PropTypes.func
};
