import PropTypes from "prop-types";

export const TimelineItem = ({ video }) => {
    return (
        <div className="">
            <a href={video.url} className="text-nowrap">
                {video.title.length > 10 ? video.title.substring(0, 10) + "..." : video.title}
            </a>
        </div>
    );
};

TimelineItem.propTypes = {
    video: PropTypes.object
};
