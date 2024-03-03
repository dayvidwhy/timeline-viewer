export const parseTimeString = (timeString) => {
    const regex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
    const match = timeString.match(regex);
    if (!match || match[0] !== timeString) {
        throw new Error('Invalid time string format');
    }

    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;

    const millisecondsToAdd = (hours * 3600 + minutes * 60 + seconds) * 1000;
    return millisecondsToAdd;
};
