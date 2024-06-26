import express from "express";
import cors from "cors";
import { getVideosForUser } from "@timeline-viewer/api";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/api/videos/:user", async (req, res) => {
    if (!req.params.user) {
        res.status(404).send({
            error: "No user provided."
        });
    }
    try {
        const videoData = await getVideosForUser(req.params.user);
        res.status(200).send(videoData);
    } catch (e) {
        res.status(500).send({
            error: "An error occurred while fetching the data."
        });
    }
});
  
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
