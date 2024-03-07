import { compareAsc, differenceInMilliseconds } from "date-fns";

const calculatePercentageDistance = (endDate, middleDate, startDate) => {    
    // Calculate the difference in milliseconds between the start date and the middle date
    const startToMiddleDiff = differenceInMilliseconds(middleDate, startDate);
    
    // Calculate the difference in milliseconds between the start date and the end date
    const startToEndDiff = differenceInMilliseconds(endDate, startDate);

    // Calculate the percentage distance between the start date and the middle date
    const percentageDistance = (startToMiddleDiff / startToEndDiff) * 100;

    return percentageDistance;
};

// returns either, start to end completey fall within the times to check
// or 
const checkTimeRange = ({ startTime, endTime, startTimeToCheck, endTimeToCheck }) => {
    // if the start time is after the end time of the block
    // or if the end time is before our blocks start time
    if (
        compareAsc(startTimeToCheck, endTime) > 0 ||
        compareAsc(startTime, endTimeToCheck) > 0
    ) {
        return false;
    }
    
    // check if the end time to check is after the end time, and start time to check is before start
    if (
        compareAsc(endTimeToCheck, endTime) === 1 &&
        compareAsc(startTime, startTimeToCheck) === 1
    ) {
        return {
            start: 0,
            end: 100
        };
    }

    // check if the end time is within the time period we're checking
    // and starts earlier than the time period
    if (
        compareAsc(endTime, endTimeToCheck) === 1 &&
        compareAsc(startTime, startTimeToCheck) === 1
    ) {
        // work out how far through the time period, the end time is
        return {
            start: 0,
            end: calculatePercentageDistance(endTime, endTimeToCheck, startTime)
        };
    }

    // check if the end time is after, but the start time is during
    if (
        compareAsc(endTimeToCheck, endTime) === 1 &&
        compareAsc(startTimeToCheck, startTime) === 1
    ) {
        return {
            start: calculatePercentageDistance(endTime, startTimeToCheck, startTime),
            end: 100
        }
    }

    // otherwise the start and end time are within the time block we're considering
    if (
        compareAsc(endTime, endTimeToCheck) === 1 &&
        compareAsc(startTimeToCheck, startTime) === 1
    ) {
        return {
            start: calculatePercentageDistance(endTime, startTimeToCheck, startTime),
            end: calculatePercentageDistance(endTime, endTimeToCheck, startTime)
        }
    }
};

// return array of time chunks and video associated with it
export const getTimeRangesForTimeline = (timelineTimes, videos) => {
    return timelineTimes.map((_, index) => {
        // for each vid does it overlap with our current time block
        for (let i = 0; i < videos.length; i++) {
            let vid = videos[i];
            let timeData = checkTimeRange({
                startTime: timelineTimes[index + 1],
                endTime: timelineTimes[index],
                startTimeToCheck: vid.start,
                endTimeToCheck: vid.end
            });
            if (timeData) {
                return vid;
            }
        }

        return null;
    });
};
