import axios from "axios";
import querystring from "node:querystring";
import { parseTimeString } from "./utils/parseTimeString.js";

let token;
let tokenExpiry;

const login = async () => {
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
        return response.data;
    }
    throw new Error(response.data);
};

const getUserInformation = async (username) => {
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

const getVideosForUser = async (userId) => {
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

(async () => {
    try {
        const loginResponse = await login();
        token = loginResponse.access_token;
        tokenExpiry = (new Date()).getTime() + loginResponse.expires_in;

    } catch (e) {
        console.log("Logging in failed: " + e);
        return;
    }

    let user;
    try {
        user = await getUserInformation(process.argv[2]);
    } catch (e) {
        console.log("Fetching user data failed: " + e);
        return;
    }

    let videos;
    try {
        videos = await getVideosForUser(user.data[0].id);
    } catch (e) {
        console.log("Fetching videos failed: " +  + e);
        return;
    }

    console.log(getVideoDetails(videos));
})();
