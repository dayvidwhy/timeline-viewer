import { padVideoBlocks } from "./padVideoBlocks";
import { ISODateString, VideoDetails, VideoInformation, VideoForBlock } from "@timeline-viewer/types";

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

test("padVideoBlocks adds extra padding between videos", () => {
    const videos: VideoDetails[] = [
        {
            videoStartTime: "2021-01-01T00:00:00Z" as ISODateString,
            videoEndTime: "2021-01-01T06:00:00Z" as ISODateString,
            ...exampleVideo
        },
        {
            videoStartTime: "2021-01-01T12:00:00Z" as ISODateString,
            videoEndTime: "2021-01-02T12:00:00Z" as ISODateString,
            ...exampleVideo
        }
    ];

    // Block for 2021-01-01
    // Video from 00:00 to 06:00
    // then from 12:00 to 24:00
    const videoBlocks: VideoForBlock[] = [
        {
            timeData: {
                start: 50,
                end: 100
            },
            video: videos[1]
        },
        {
            timeData: {
                start: 0,
                end: 25
            },
            video: videos[0]
        }
    ];

    const result = padVideoBlocks(videoBlocks);

    expect(result).toEqual([
        {
            timeData: {
                start: 50,
                end: 100
            },
            video: videos[1]
        },
        {
            timeData: {
                start: 25,
                end: 50
            }
        },
        {
            timeData: {
                start: 0,
                end: 25
            },
            video: videos[0]
        },
    ]);
});
