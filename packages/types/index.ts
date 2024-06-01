export type UserInformation = {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
};

export type VideoInformation = {
    id: string,
    stream_id: string,
    user_id: string,
    user_login: string,
    user_name: string,
    title: string,
    description: string,
    created_at: string,
    published_at: string,
    url: string,
    thumbnail_url: string,
    viewable: string,
    view_count: number,
    language: string,
    type: string,
    duration: string,
    muted_segments: string | null,
};

// Video information extdnded with start and end dates
export type VideoDetails = {
    start: Date;
    end: Date;
} & VideoInformation;

// Video storage with start and end percentages for each block
export type VideoStorage = {
    [key: string]: {
        timeData: {
            start: number;
            end: number;
        };
        video: VideoDetails;
    }[];
};

export type VideoForBlock = {
    timeData: {
        start: number;
        end: number;
    };
    video?: {
        id: string;
        url: string;
        title: string;
    };
};