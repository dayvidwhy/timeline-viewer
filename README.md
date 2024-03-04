# Timeline Viewer
Fetch past VOD's from Twitch to display a timeline.

## Installation
```bash
git clone https://github.com/dayvidwhy/timeline-viewer.git
cd timeline-viewer
npm install
npm start
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