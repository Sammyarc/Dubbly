import express from "express";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import { transcribeVideo } from "../controllers/transcribe.js";
import { translateText } from "../controllers/translate.js";
import { generateVoice } from "../controllers/generateVoice.js";
import { mergeAudioWithVideo } from "../controllers/mergeAudio.js";
import { transcriptionPoll } from "../controllers/transcriptionPoll.js";

const router = express.Router();


// Ensure 'uploads' folder exists
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("video"), transcribeVideo);
router.post("/translate", translateText);
router.post("/voice", generateVoice);
router.post("/merge", mergeAudioWithVideo);
router.get("/transcript/:id", transcriptionPoll);

export default router;
