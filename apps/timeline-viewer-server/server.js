import express from "express";
import cors from "cors";
import { getVideosForUser } from "@timeline-viewer/api-requests";

const app = express();
const port = 3000;

app.use(cors());

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
    console.log(`API listening on port ${port}`);
});
