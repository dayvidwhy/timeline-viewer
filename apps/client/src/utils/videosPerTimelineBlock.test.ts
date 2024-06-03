import { findVideosPerTimelineBlock } from "./videosPerTimelineBlock";
import { ISODateString, VideoDetails, VideoInformation } from "@timeline-viewer/types";

const exampleVideo: VideoInformation = {
    id: "1",
    stream_id: "1",
    user_id: "1",
    user_login: "1",
    user_name: "1",
    title: "1",
    description: "1",
    created_at: "1",
    published_at: "1",
    url: "1",
    thumbnail_url: "1",
    viewable: "1",
    view_count: 1,
    language: "1",
    type: "1",
    duration: "1",
    muted_segments: "1"
};

test("videosPerTimelineBlock returns empty object if no videos", () => {
    const timelineTimes = [
        "2021-01-02T00:00:00Z" as ISODateString,
        "2021-01-01T00:00:00Z" as ISODateString
    ];
    const videos: VideoDetails[] = [];

    const timeslotData = findVideosPerTimelineBlock(timelineTimes, videos);

    expect(timeslotData).toEqual({
        videoStorage: {
            "2021-01-02T00:00:00Z": [],
            "2021-01-01T00:00:00Z": []
        },
        timelineTrackEnd: timelineTimes[0],
        timelineTrackStart: timelineTimes[timelineTimes.length - 1]
    });
});

test("videosPerTimelineBlock returns empty arrays if no videos in time block", () => {
    const timelineTimes = [
        "2021-01-02T00:00:00Z" as ISODateString,
        "2021-01-01T00:00:00Z" as ISODateString
    ];

    // video starts after timeline ends
    const videos: VideoDetails[] = [
        {
            videoStartTime: "2021-01-03T00:00:00Z" as ISODateString,
            videoEndTime: "2021-01-04T00:00:00Z" as ISODateString,
            ...exampleVideo
        }
    ];

    const timeslotData = findVideosPerTimelineBlock(timelineTimes, videos);

    expect(timeslotData).toEqual({
        videoStorage: {
            "2021-01-02T00:00:00Z": [],
            "2021-01-01T00:00:00Z": []
        },
        timelineTrackEnd: timelineTimes[0],
        timelineTrackStart: timelineTimes[timelineTimes.length - 1]
    });
});

test("videosPerTimelineBlock returns video in time block", () => {
    const timelineTimes = [
        "2021-01-02T00:00:00Z" as ISODateString,
        "2021-01-01T00:00:00Z" as ISODateString
    ];

    // video starts after timeline ends
    const videos: VideoDetails[] = [
        {
            videoStartTime: "2021-01-01T12:00:00Z" as ISODateString,
            videoEndTime: "2021-01-01T18:00:00Z" as ISODateString,
            ...exampleVideo
        }
    ];

    const timeslotData = findVideosPerTimelineBlock(timelineTimes, videos);

    expect(timeslotData).toEqual({
        videoStorage: {
            "2021-01-02T00:00:00Z": [
                {
                    timeData: {
                        start: 50,
                        end: 75
                    },
                    video: videos[0]
                }
            ],
            "2021-01-01T00:00:00Z": [],
        },
        timelineTrackEnd: timelineTimes[0],
        timelineTrackStart: timelineTimes[timelineTimes.length - 1]
    });
});
