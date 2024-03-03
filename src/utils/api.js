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
            token = response.data.access_token;
            tokenExpiry = (new Date()).getTime() + response.data.expires_in;
        } else {
            throw new Error(response.data);
        }
    }
    return;    
};

const getUserInformationForUsername = async (username) => {
    const response = await axios({
        "url": `https://api.twitch.tv/helix/users?login=${username}`,
        "method": "get",
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    });

    if (response.status === 200) {
        return response.data;
    }
    throw new Error(respose.data);
};

const getVideosForUsername = async (userId) => {
    const response = await axios({
        "url": `https://api.twitch.tv/helix/videos?user_id=${userId}`,
        "method": "get",
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID
        }
    });

    if (response.status === 200) {
        return response.data.data;
    }
    throw new Error(respose.data);
};

const getVideoDetails = (videos) => {
    return videos.map((video) => {
        const startTime = new Date(video.created_at);
        const endTime = new Date(startTime.getTime() + parseTimeString(video.duration));

        return {
            start: startTime,
            end: endTime,
            url: video.url,
            title: video.title
        }
    })
};

// fetch videos for a given username
export const getVideosForUser = async (username) => {
    try {
        await checkLogin();
    } catch (e) {
        console.log("Logging in failed: " + e);
        return;
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
    console.log(getVideoDetails(videos));
    return getVideoDetails(videos);
};
