import axios from "axios";
import { UserInformation, VideoInformation, VideoDetails, ISODateString } from "@timeline-viewer/types";
import querystring from "node:querystring";
import { parseTimeString } from "./parseTimeString";

let token: string;
let tokenExpiry: number;
const TWITCH_BASE_URL = "https://api.twitch.tv/helix";
const TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2";
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    throw new Error("Twitch client ID and secret must be provided.");
}

// fetch a token from twitch if we don't have one
// or if the one we have has expired
const checkLogin = async () => {
    // check if we're logged in already
    if (!token || Date.now() >= tokenExpiry) {
        const response = await axios({
            "method": "post",
            "url": `${TWITCH_AUTH_URL}/token`,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": querystring.stringify({
                "client_id": TWITCH_CLIENT_ID,
                "client_secret": TWITCH_CLIENT_SECRET,
                "grant_type": "client_credentials"
            })
        });

        if (response.status === 200) {
            // validate what we got back is as expected
            if (response.data?.access_token && response.data?.expires_in) {
                token = response.data.access_token;
                tokenExpiry = (new Date()).getTime() + response.data.expires_in;
            } else {
                throw new Error("Response not as expected");
            }
        } else {
            throw new Error(response.data);
        }
    }
    return;
};

// fetch user information for a given username
const getUserInformationForUsername = async (username: string): Promise<UserInformation> => {
    const response = await axios({
        "url": `${TWITCH_BASE_URL}/users`,
        "method": "get",
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Client-Id": TWITCH_CLIENT_ID,
        },
        "params": {
            "login": username
        }
    });

    if (response.status === 200) {
        if (!response.data.data || response.data.data.length === 0) {
            throw new Error("No user found");
        }
        return response.data.data[0];
    }
    throw new Error(response.data);
};

// fetch videos for a given user id
const getVideosForUsername = async (userId: string): Promise<VideoInformation[]> => {
    const response = await axios({
        "url": `${TWITCH_BASE_URL}/videos`,
        "method": "get",
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Client-Id": TWITCH_CLIENT_ID,
        },
        "params": {
            "user_id": userId,
            "type": "archive"
        }
    });

    if (response.status === 200 && response.data?.data) {
        return response.data.data;
    }
    throw new Error(response.data);
};

// convert video information to video details
const getVideoDetails = (videos: VideoInformation[]): VideoDetails[] => {
    return videos.map((video) => {
        // TODO: Handle parsing throwing
        const startTime = new Date(video.created_at);
        const endTime = new Date(startTime.getTime() + parseTimeString(video.duration));

        return {
            // explicity send the dates as ISO strings over wire
            videoStartTime: startTime.toISOString() as ISODateString,
            videoEndTime: endTime.toISOString() as ISODateString,
            ...video
        };
    });
};

// fetch videos for a given username
export const getVideosForUser = async (username: string): Promise<VideoDetails[]> => {
    try {
        await checkLogin();
    } catch (e) {
        throw new Error("Logging in failed: " + e);
    }

    let user: UserInformation;
    try {
        user = await getUserInformationForUsername(username);
    } catch (e) {
        throw new Error("Fetching user data failed: " + e);
    }

    let videos: VideoInformation[];
    try {
        videos = await getVideosForUsername(user.id);
    } catch (e) {
        throw new Error("Fetching videos failed: " + e);
    }
    return getVideoDetails(videos);
};
