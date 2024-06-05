import { compareAsc, differenceInMilliseconds, isEqual } from "date-fns";
import { ISODateString } from "@timeline-viewer/types";

// Calculate the percentage distance between the start date and the middle date
export const calculatePercentageDistance = (
    endDate: ISODateString,
    middleDate: ISODateString,
    startDate: ISODateString
): number => {    
    if (isEqual(startDate, middleDate)) {
        return 0;
    }

    if (isEqual(endDate, middleDate)) {
        return 100;
    }

    // Calculate the differences
    const startToMiddleDiff = differenceInMilliseconds(middleDate, startDate);
    const startToEndDiff = differenceInMilliseconds(endDate, startDate);

    return (startToMiddleDiff / startToEndDiff) * 100;
};

// Check if the video is in the time block
export const checkIfVideoInTimeblock = ({ 
    startTime,
    endTime,
    startTimeToCheck,
    endTimeToCheck
} : {
    startTime: ISODateString;
    endTime: ISODateString;
    startTimeToCheck: ISODateString;
    endTimeToCheck: ISODateString;
}): {
    start: number;
    end: number;
} | null => {
    // or our blocks start time is after the end time
    // if the start time is after the end blocks end time
    // then it doesn't fall in the block
    if (
        compareAsc(startTimeToCheck, endTime) >= 0 ||
        compareAsc(startTime, endTimeToCheck) >= 0
    ) {
        return null;
    }

    // check if the blocks end time is after the end time
    // and start is after the blocks start time
    // then it takes up the whole block
    if (
        compareAsc(endTimeToCheck, endTime) >= 0 &&
        compareAsc(startTime, startTimeToCheck) >= 0
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
        compareAsc(startTime, startTimeToCheck) >= 0
    ) {
        // work out how far through the time period, the end time is
        return {
            start: 0,
            end: calculatePercentageDistance(
                endTime,
                endTimeToCheck,
                startTime
            )
        };
    }

    // check if the end time is after, but the start time is during
    if (
        compareAsc(endTimeToCheck, endTime) >= 0 &&
        compareAsc(startTimeToCheck, startTime) === 1
    ) {
        return {
            start: calculatePercentageDistance(
                endTime,
                startTimeToCheck,
                startTime
            ),
            end: 100
        };
    }

    // otherwise the start and end time are within the time block we're considering
    if (
        compareAsc(endTime, endTimeToCheck) === 1 &&
        compareAsc(startTimeToCheck, startTime) === 1
    ) {
        return {
            start: calculatePercentageDistance(
                endTime,
                startTimeToCheck,
                startTime
            ),
            end: calculatePercentageDistance(
                endTime,
                endTimeToCheck,
                startTime
            )
        };
    }

    // Should be unreachable given a above conditions.
    return null;
};

