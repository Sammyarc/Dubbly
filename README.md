# Dubbly – AI Voice-Over Translator for Videos
A one-page web app that allows users to upload a video, transcribe it, translate the audio into another language, and replace the original audio with an AI-generated voice in the selected language.

---

## ✨ Features

- Upload short `.mp4` or `.mov` videos
- Automatic transcription (using OpenAI Whisper)
- Translate transcript into 20+ languages
- Generate AI voiceovers (ElevenLabs or AWS Polly)
- Merge new audio with original video
- Preview and download final dubbed video
- 100% client-friendly, no login, no database

---

## 🧱 Tech Stack

| Layer       | Tech Used               |
|-------------|--------------------------|
| Frontend    | React + Vite + Tailwind  |
| Backend     | Node.js + Express        |
| Transcribe  | OpenAI Whisper (local or API) |
| Translate   | Google Translate API     |
| TTS         | ElevenLabs / AWS Polly   |
| Video Merge | FFmpeg                   |

---

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Dubbly.git
cd Dubbly
