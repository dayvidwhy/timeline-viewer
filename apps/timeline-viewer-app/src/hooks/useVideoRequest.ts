import { useState } from "react";
import axios from "axios";
import { VideoDetails } from "@timeline-viewer/types";

export const useVideoRequest = (username: string) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
  
    const fetchData = async () => {
        if (username === "") {
            setData([]);
            return;
        }
        setIsPending(true);
        try {
            const response = await axios({
                "method": "get",
                "url": `/api/videos/${username}`
            });
            if (response.status === 200) {
                setData(response.data.map((item: VideoDetails) => {
                    item.start = new Date(item.start);
                    item.end = new Date(item.end);
                    return item;
                }));
                setError(null);
            } else {
                setData([]);
                setError(response.data);
            }
        } catch (e) {
            setData([]);
        }
        setIsPending(false);
    };
  
    return { data, isPending, fetchData, error };
};
