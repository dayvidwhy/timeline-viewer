import PropTypes from 'prop-types';

export const Video = ({ url, title }) => {
    return (
        <div>
            <p>
                {url}
            </p>
            <p>
                {title}
            </p>
        </div>
    );
};

Video.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string
};
