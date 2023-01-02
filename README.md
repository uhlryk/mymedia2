# mymedia2

Side project written in electron, react, node.js, typescript

## short description

Local host app that list selected directories for specific file type (current version support only video files). 
Creates a list of those files. Creates thumbnails for each file, gather file metadata (video duration, resolution), 
allows adding descriptions, ratings, and hierarchy tags.
Video playing is delegated from app to native video player. 
Each listed directory became a 'project' with its own directory database.

## prerequisites

- install ffmpeg
```
https://ffmpeg.org/download.html
```

- install ffprobe
```
https://ffmpeg.org/ffprobe.html
```

- install node.js v16+

## development
- npm install
- npm run start

