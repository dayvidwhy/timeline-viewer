import PropTypes from "prop-types";

export const TimelineItem = ({ timeLineData }) => {
    let classes = "h-full flex ";
    if (timeLineData.timeData.start === 0) {
        classes += "flex-row-reverse"
    }

    const contentWidth = timeLineData.timeData.end - timeLineData.timeData.start + "%";

    return (
        <div className={classes}>
            <div 
                onClick={() => {window.open(timeLineData.video.url,'_blank')}} 
                className="bg-slate-700 h-full cursor-pointer" 
                style={{width: contentWidth}}
            >
            </div>
        </div>
    );
};

TimelineItem.propTypes = {
    timeLineData: PropTypes.object
};
