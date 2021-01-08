const ffmpeg = require("fluent-ffmpeg");
const command = ffmpeg();
ffmpeg("/Users/luoweiling/Downloads/workResourse/test.mp4").screenshots({
  timestamps: [1],
  filename: "test.png",
  folder: "/Users/luoweiling/Downloads",
});
