import PropTypes from "prop-types";
import { Video } from "./Video";

export const TimelineItem = ({ video }) => {
    return (
        <Video
            url={video.url}
            title={video.title}
        />
    );
};

TimelineItem.propTypes = {
    video: PropTypes.object
};
