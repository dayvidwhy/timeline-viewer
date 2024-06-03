import { calculatePercentageDistance, checkIfVideoInTimeblock } from "./timeCompare";
import { ISODateString } from "@timeline-viewer/types";

test("calculatePercentageDistance returns correct percentage distance", () => {
    const start = "2021-01-01T00:00:00Z" as ISODateString;
    const middle = "2021-01-01T12:00:00Z" as ISODateString;
    const end = "2021-01-02T00:00:00Z" as ISODateString;

    const percentageDistance = calculatePercentageDistance(end, middle, start);
    expect(percentageDistance).toBe(50);
});

test("calculatePercentageDistance returns 0 for start date", () => {
    const startAndMiddleSameDate = "2021-01-01T00:00:00Z" as ISODateString;
    const start = startAndMiddleSameDate;
    const middle = startAndMiddleSameDate;

    const end = "2021-01-02T00:00:00Z" as ISODateString;

    const percentageDistance = calculatePercentageDistance(end, middle, start);
    expect(percentageDistance).toBe(0);
});

test("calculatePercentageDistance returns 100 for end date", () => {
    const start = "2021-01-01T00:00:00Z" as ISODateString;

    const middleAndEndSameDate = "2021-01-02T00:00:00Z" as ISODateString;
    const middle = middleAndEndSameDate;
    const end = middleAndEndSameDate;

    const percentageDistance = calculatePercentageDistance(end, middle, start);
    expect(percentageDistance).toBe(100);
});

test("checkIfVideoInTimeblock returns null if start time is after end time", () => {
    const timeData = checkIfVideoInTimeblock({
        startTime: "2021-01-01T00:00:00Z" as ISODateString,
        endTime: "2021-01-02T00:00:00Z" as ISODateString,
        startTimeToCheck: "2021-01-03T00:00:00Z" as ISODateString,
        endTimeToCheck: "2021-01-04T00:00:00Z" as ISODateString
    });

    expect(timeData).toBeNull();
});

test("checkIfVideoInTimeblock returns null if end time is before start time", () => {
    const timeData = checkIfVideoInTimeblock({
        startTime: "2021-01-03T00:00:00Z" as ISODateString,
        endTime: "2021-01-04T00:00:00Z" as ISODateString,
        startTimeToCheck: "2021-01-01T00:00:00Z" as ISODateString,
        endTimeToCheck: "2021-01-02T00:00:00Z" as ISODateString
    });

    expect(timeData).toBeNull();
});

test("checkIfVideoInTimeblock returns not null if video is within time block", () => {
    const timeData = checkIfVideoInTimeblock({
        startTime: "2021-01-01T00:00:00Z" as ISODateString,
        endTime: "2021-01-02T00:00:00Z" as ISODateString,
        startTimeToCheck: "2021-01-01T05:00:00Z" as ISODateString,
        endTimeToCheck: "2021-01-01T06:00:00Z" as ISODateString 
    });

    expect(timeData).toBeTruthy();
});
