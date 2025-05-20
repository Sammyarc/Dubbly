import axios from "axios";
import fs from "fs";
import path from "path";

export const generateVoice = async (req, res) => {
  const { text, voice = "Bella" } = req.body;

  try {
    const response = await axios({
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      data: {
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.4, similarity_boost: 0.7 },
      },
      responseType: "stream",
    });

    const outputPath = `dubbed/audio-${Date.now()}.mp3`;
    const writer = fs.createWriteStream(outputPath);

    response.data.pipe(writer);

    writer.on("finish", () => {
      res.status(200).json({ audioPath: outputPath });
    });

    writer.on("error", (err) => {
      throw err;
    });
  } catch (error) {
    console.error("Voice Generation Error:", error.message);
    res.status(500).json({ error: "Voice generation failed" });
  }
};
