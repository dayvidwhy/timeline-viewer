import axios from "axios";
import querystring from "node:querystring";
import { parseTimeString } from "./parseTimeString.js";

let token;
let tokenExpiry;

// fetch a token from twitch if we don't have one
// or if the one we have has expired
const checkLogin = async () => {
    // check if we're logged in already
    if (!token || Date.now() >= tokenExpiry) {
        const response = await axios({
            "method": "post",
            "url": "https://id.twitch.tv/oauth2/token",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": querystring.stringify({
                "client_id": process.env.TWITCH_CLIENT_ID,
                "client_secret": process.env.TWITCH_CLIENT_SECRET,
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

const getUserInformationForUsername = async (username) => {
    const response = await axios({
        "url": "https://api.twitch.tv/helix/users",
        "method": "get",
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
        "params": {
            "login": username
        }
    });

    if (response.status === 200) {
        return response.data;
    }
    throw new Error(response.data);
};

const getVideosForUsername = async (userId) => {
    const response = await axios({
        "url": "https://api.twitch.tv/helix/videos",
        "method": "get",
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID,
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

const getVideoDetails = (videos) => {
    return videos.map((video) => {
        const startTime = new Date(video.created_at);
        const endTime = new Date(startTime.getTime() + parseTimeString(video.duration));

        return {
            start: startTime,
            end: endTime,
            ...video
        };
    });
};

// fetch videos for a given username
export const getVideosForUser = async (username) => {
    try {
        await checkLogin();
    } catch (e) {
        throw new Error("Logging in failed: " + e);
    }

    let user;
    try {
        user = await getUserInformationForUsername(username);
    } catch (e) {
        throw new Error("Fetching user data failed: " + e);
    }

    let videos;
    try {
        videos = await getVideosForUsername(user.data[0].id);
    } catch (e) {
        throw new Error("Fetching videos failed: " +  + e);
    }
    return getVideoDetails(videos);
};
