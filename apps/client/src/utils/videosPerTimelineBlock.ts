import { VideoDetails, VideoStorage, ISODateString } from "@timeline-viewer/types";
import { checkIfVideoInTimeblock } from "./timeCompare";
import { compareAsc } from "date-fns";

type TimeSlotData = {
    videoStorage: VideoStorage;
    timelineTrackEnd: ISODateString;
    timelineTrackStart: ISODateString;
};

export const findVideosPerTimelineBlock = (
    timelineTimes: ISODateString[],
    videos: VideoDetails[]
): {
    videoStorage: VideoStorage;
    timelineTrackEnd: ISODateString;
    timelineTrackStart: ISODateString;
} => {
    const timeslotData: TimeSlotData = {
        videoStorage: {},
        timelineTrackEnd: timelineTimes[0],
        timelineTrackStart: timelineTimes[timelineTimes.length - 1]
    };

    for (let i = 0; i < timelineTimes.length; i++) {
        timeslotData.videoStorage[timelineTimes[i].toString()] = [];
    }

    videos.forEach((video) => {
        // if the video starts after our track ends, or ends before it begins, skip it
        if (
            compareAsc(video.videoStartTime, timeslotData.timelineTrackEnd) > 0 ||
            compareAsc(timeslotData.timelineTrackStart, video.videoEndTime) > 0
        ) {
            return;
        }

        // the video falls along the track somewhere
        timelineTimes.forEach((_, index) => {
            if (index === timelineTimes.length - 1) { 
                return;
            }

            // for each time block does the video overlap with our current time block
            const timeData = checkIfVideoInTimeblock({
                startTime: timelineTimes[index + 1],
                endTime: timelineTimes[index],
                startTimeToCheck: video.videoStartTime,
                endTimeToCheck: video.videoEndTime
            });

            if (timeData) {
                timeslotData.videoStorage[timelineTimes[index].toString()].push({
                    timeData,
                    video
                });
            }
        });
    });
    console.log(timeslotData);
    return timeslotData;
};
