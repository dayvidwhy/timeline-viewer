import express from "express";
import { getVideosForUser } from "@timeline-viewer/api-requests";

const app = express();
const port = 3000;

app.get("/videos/:user", async (req, res) => {
    if (!req.params.user) {
        res.status(404).send("Not found.");
    }
    try {
        const videoData = await getVideosForUser(req.params.user);
        res.status(200).send(videoData);
    } catch (e) {
        res.status(500).send("Internal issue.");
    }
});
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
