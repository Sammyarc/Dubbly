import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const ASSEMBLY_AI_API_KEY = process.env.ASSEMBLY_AI_API_KEY;

export const transcriptionPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.assemblyai.com/v2/transcript/${id}`, {
      headers: {
        Authorization: ASSEMBLY_AI_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transcription status" });
  }
};