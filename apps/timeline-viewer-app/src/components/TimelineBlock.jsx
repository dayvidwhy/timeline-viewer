import PropTypes from "prop-types";

export const TimelineBlock = ({ timeLineData }) => {
    const blockItems = [];
    let currentEnd = 100;

    timeLineData.forEach((video) => {
        if (video.timeData.end !== currentEnd) {
            // add an empty block
            blockItems.push({
                timeData: {
                    end: currentEnd,
                    start: video.timeData.end
                }
            });
            currentEnd = video.timeData.start;
        }

        // add a video block
        blockItems.push(video);
    });
    
    return (
        <div className="h-full flex">
            {blockItems.map((block, index) => {
                const contentWidth = block.timeData.end - block.timeData.start + "%";
                if (block.video) {
                    // we're rendering a video
                    return (
                        <div 
                            key={index}
                            onClick={() => {window.open(block.video.url,"_blank")}} 
                            className="bg-slate-700 h-full cursor-pointer" 
                            style={{width: contentWidth}}
                        >
                        </div>
                    )
                } else {
                    return (
                        <div
                            key={index}
                            className="h-full" 
                            style={{width: contentWidth}}>
                        </div>
                    )
                }
            })}
        </div>
    );
};

TimelineBlock.propTypes = {
    timeLineData: PropTypes.array
};
