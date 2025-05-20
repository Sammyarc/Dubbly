import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from 'ffmpeg-static';
import {
  fileTypeFromFile
} from 'file-type';

dotenv.config();
ffmpeg.setFfmpegPath(ffmpegPath);

const ASSEMBLY_AI_API_KEY = process.env.ASSEMBLY_AI_API_KEY;

const SUPPORTED_VIDEO_FORMATS = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo'
];

const convertToAudio = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .noVideo()
      .audioCodec('libmp3lame')
      .format('mp3')
      .on('error', (err) => reject(new Error(`FFmpeg error: ${err.message}`)))
      .on('end', () => resolve(outputPath))
      .save(outputPath);
  });
};

export const transcribeVideo = async (req, res) => {
  const {
    target_language
  } = req.body;
  const file = req.file;
  if (!file) return res.status(400).json({
    error: "No file uploaded"
  });

  try {
    // Validate file type
    const fileInfo = await fileTypeFromFile(file.path);
    if (!fileInfo || !SUPPORTED_VIDEO_FORMATS.includes(fileInfo.mime)) {
      throw new Error(`Unsupported video format. Supported formats: ${SUPPORTED_VIDEO_FORMATS.join(', ')}`);
    }

    // Convert video to audio
    const audioPath = `${file.path}.mp3`;
    await convertToAudio(file.path, audioPath);

    // Upload audio to AssemblyAI
    const form = new FormData();
    form.append("file", fs.createReadStream(audioPath), {
      filename: `${file.originalname}.mp3`,
      contentType: 'audio/mpeg'
    });

    const uploadRes = await axios.post("https://api.assemblyai.com/v2/upload", form, {
      headers: {
        Authorization: ASSEMBLY_AI_API_KEY,
        ...form.getHeaders(),
      },
    });

    if (!uploadRes.data?.upload_url) {
      throw new Error("Failed to upload file to AssemblyAI");
    }

    // Start transcription
    const transcriptRes = await axios.post(
      "https://api.assemblyai.com/v2/transcript", {

        audio_url: uploadRes.data.upload_url,
        speaker_labels: true, // Enable speaker diarization
        language_detection: true,
        word_boost: ["custom"], // Optional: Improves accuracy for specific terms
        speaker_labels: true,
        format_text: true,
        punctuate: true
      }, {
        headers: {
          authorization: ASSEMBLY_AI_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    // Cleanup ONLY the converted audio file
    if (fs.existsSync(audioPath)) {
      fs.unlink(audioPath, (err) => {
        if (err) console.error(`Failed to delete audio file ${audioPath}:`, err);
      });
    }

    return res.json({
      message: "Transcription started",
      transcript_id: transcriptRes.data.id,
    });

  } catch (error) {
    if (fs.existsSync(`${file.path}.mp3`)) {
      fs.unlinkSync(`${file.path}.mp3`);
    }

    console.error("Transcription Error:", error.response?.data || error.message);
    res.status(500).json({
      error: error.message || "Transcription failed",
      details: error.response?.data
    });
  }
};