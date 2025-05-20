import ffmpeg from "fluent-ffmpeg";
import path from "path";

export const mergeAudioWithVideo = async (req, res) => {
  const { videoPath, audioPath } = req.body;

  try {
    const outputFilename = `dubbed/final-${Date.now()}.mp4`;

    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions("-map 0:v:0", "-map 1:a:0", "-c:v copy", "-shortest")
      .save(outputFilename)
      .on("end", () => {
        res.status(200).json({ mergedVideo: `/${outputFilename}` });
      })
      .on("error", (err) => {
        console.error("Merge Error:", err.message);
        res.status(500).json({ error: "Failed to merge video and audio" });
      });
  } catch (error) {
    console.error("Unexpected Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
