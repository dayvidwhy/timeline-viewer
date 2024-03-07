import { useState } from "react";
import axios from "axios";

export const useVideoRequest = (username) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
  
    const fetchData = async () => {
        if (username === "") {
            setData([]);
            return;
        }
        setIsPending(true);
        const response = await axios({
            "method": "get",
            "url": `http://localhost:3000/videos/${username}`
        });
        if (response.status === 200) {
            setData(response.data.map((item) => {
                item.start = new Date(item.start);
                item.end = new Date(item.end);
                return item;
            }));
        } else {
            // something went wrong, blank the data
            // TODO: Add handling
            setData([]);
        }
        setIsPending(false);
    };
  
    return { data, isPending, fetchData };
};
