import { getTimeRangesForTimeline } from "./timeCompare";

const videos = [
    {
        start: "2024-03-07T17:01:46.000Z",
        end: "2024-03-07T22:10:46.000Z",
        url: "url",
        title: "Title",
        id: "1",
    },
    {
        start: "2024-03-05T17:04:10.000Z",
        end: "2024-03-05T22:42:14.000Z",
        url: "url",
        title: "Title",
        id: "12",
    },
    {
        start: "2024-03-05T00:41:00.000Z",
        end: "2024-03-05T02:02:10.000Z",
        url: "url",
        title: "Title",
        id: "123",
    },
    {
        start: "2024-03-04T17:47:29.000Z",
        end: "2024-03-04T21:12:59.000Z",
        url: "url",
        title: "Title",
        id: "1234",
    },
    {
        start: "2024-03-03T16:15:32.000Z",
        end: "2024-03-03T21:28:56.000Z",
        url: "url",
        title: "Title",
        id: "12345",
    },
];
test("Should return blocks with overlap and null for the rest", () => {
    const timelineTimes = [
        "2024-03-07T22:00:00.000Z",
        "2024-03-07T21:00:00.000Z",
        "2024-03-07T20:00:00.000Z",
        "2024-03-07T19:00:00.000Z",
        "2024-03-07T18:00:00.000Z",
        "2024-03-07T17:00:00.000Z",
        "2024-03-07T16:00:00.000Z",
        "2024-03-07T15:00:00.000Z",
        "2024-03-07T14:00:00.000Z",
        "2024-03-07T13:00:00.000Z",
        "2024-03-07T12:00:00.000Z",
        "2024-03-07T11:00:00.000Z",
        "2024-03-07T10:00:00.000Z",
        "2024-03-07T09:00:00.000Z",
        "2024-03-07T08:00:00.000Z",
        "2024-03-07T07:00:00.000Z",
        "2024-03-07T06:00:00.000Z",
        "2024-03-07T05:00:00.000Z",
        "2024-03-07T04:00:00.000Z",
        "2024-03-07T03:00:00.000Z",
        "2024-03-07T02:00:00.000Z",
        "2024-03-07T01:00:00.000Z",
        "2024-03-07T00:00:00.000Z",
        "2024-03-06T23:00:00.000Z",
    ];

    const expected = [
        {
            timeData: { start: 0, end: 100 },
            video: {
                start: "2024-03-07T17:01:46.000Z",
                end: "2024-03-07T22:10:46.000Z",
                url: "url",
                title: "Title",
                id: "1",
            },
        },
        {
            timeData: { start: 0, end: 100 },
            video: {
                start: "2024-03-07T17:01:46.000Z",
                end: "2024-03-07T22:10:46.000Z",
                url: "url",
                title: "Title",
                id: "1",
            },
        },
        {
            timeData: { start: 0, end: 100 },
            video: {
                start: "2024-03-07T17:01:46.000Z",
                end: "2024-03-07T22:10:46.000Z",
                url: "url",
                title: "Title",
                id: "1",
            },
        },
        {
            timeData: { start: 0, end: 100 },
            video: {
                start: "2024-03-07T17:01:46.000Z",
                end: "2024-03-07T22:10:46.000Z",
                url: "url",
                title: "Title",
                id: "1",
            },
        },
        {
            timeData: { start: 2.944444444444444, end: 100 },
            video: {
                start: "2024-03-07T17:01:46.000Z",
                end: "2024-03-07T22:10:46.000Z",
                url: "url",
                title: "Title",
                id: "1",
            },
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];

    const result = getTimeRangesForTimeline(timelineTimes, videos);

    expect(result).toEqual(expected);
});

test("Should return an array with null values when no videos are available", () => {
    const timelineTimes = [
        "2024-03-07T22:00:00.000Z",
        "2024-03-07T21:00:00.000Z",
    ];
    const videos = [];
    const expected = [null, null];
    const result = getTimeRangesForTimeline(timelineTimes, videos);
    expect(result).toEqual(expected);
});

test("Should return an empty array when no timeline times are provided", () => {
    const timelineTimes = [];
    const videos = [
        {
            start: "2024-03-07T17:01:46.000Z",
            end: "2024-03-07T22:10:46.000Z",
            url: "url",
            title: "Title",
            id: "1",
        },
    ];
    const expected = [];
    const result = getTimeRangesForTimeline(timelineTimes, videos);
    expect(result).toEqual(expected);
});
