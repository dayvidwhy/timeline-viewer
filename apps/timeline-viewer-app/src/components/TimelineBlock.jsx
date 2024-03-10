import PropTypes from "prop-types";

export const TimelineBlock = ({ videosForBlock }) => {
    const blockItems = [];
    let currentEnd = 100;

    videosForBlock.forEach((video) => {
        if (video.timeData.end !== currentEnd) {
            // add an empty block
            blockItems.push({
                timeData: {
                    end: currentEnd,
                    start: video.timeData.end
                }
            });
        }
        
        // add a video block
        blockItems.push(video);
        currentEnd = video.timeData.start;
    });

    return (
        <div className="h-full flex">
            {blockItems.map((item, index) => (
                <div 
                    key={index}
                    onClick={() => {item.video && window.open(item.video.url,"_blank");}} 
                    className={`h-full ${item.video ? "cursor-pointer bg-slate-700" : null}`}
                    style={{width: item.timeData.end - item.timeData.start + "%"}}
                />
            ))}
        </div>
    );
};

TimelineBlock.propTypes = {
    videosForBlock: PropTypes.array
};
