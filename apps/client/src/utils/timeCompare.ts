import { compareAsc, differenceInMilliseconds, isEqual } from "date-fns";
import { ISODateString } from "@timeline-viewer/types";

// Calculate the percentage distance between the start date and the middle date
export const calculatePercentageDistance = (
    endDate: Date,
    middleDate: Date,
    startDate: Date
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
    // convert the strings to dates
    const startTimeToCheckDate = new Date(startTimeToCheck);
    const endTimeToCheckDate = new Date(endTimeToCheck);
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);

    // if the start time is after the end time of the block
    // or if the end time is before our blocks start time
    if (
        compareAsc(startTimeToCheckDate, endTime) > 0 ||
        compareAsc(startTime, endTimeToCheck) > 0
    ) {
        return null;
    }
    
    // check if the end time to check is after the end time, and start time to check is before start
    if (
        compareAsc(endTimeToCheck, endTime) === 1 &&
        compareAsc(startTime, startTimeToCheckDate) === 1
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
        compareAsc(startTime, startTimeToCheckDate) === 1
    ) {
        // work out how far through the time period, the end time is
        return {
            start: 0,
            end: calculatePercentageDistance(
                endTimeDate,
                endTimeToCheckDate,
                startTimeDate
            )
        };
    }

    // check if the end time is after, but the start time is during
    if (
        compareAsc(endTimeToCheck, endTime) === 1 &&
        compareAsc(startTimeToCheckDate, startTime) === 1
    ) {
        return {
            start: calculatePercentageDistance(
                endTimeDate,
                startTimeToCheckDate,
                startTimeDate
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
                endTimeDate,
                startTimeToCheckDate,
                startTimeDate
            ),
            end: calculatePercentageDistance(
                endTimeDate,
                endTimeToCheckDate,
                startTimeDate
            )
        };
    }

    return null;
};

