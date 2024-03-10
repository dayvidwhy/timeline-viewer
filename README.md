# Timeline Viewer
Fetch past VOD's from Twitch to display a timeline.

## Installation
```bash
git clone https://github.com/dayvidwhy/timeline-viewer.git
cd timeline-viewer
npm install
npm start
```

## Setup
This project requires a Twitch application key from your [console](https://dev.twitch.tv/console). 

Provide these in a `.env` file with `./apps/timeline-viewer-server/.env` as follows:
```bash
TWITCH_CLIENT_SECRET=....
TWITCH_CLIENT_ID=...
```

## Notes
Project leverages [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) for monorepo management.

Example of installing package into the timeline-viewer-app
```bash
npm install axios -w ./apps/timeline-viewer-server
```

Example of installing a package in this repo into another.
```bash
npm install @timeline-viewer/api-requests -w ./apps/timeline-viewer-server
```