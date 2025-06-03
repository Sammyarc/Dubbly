# Dubbly – AI Voice-Over Translator for Videos
A one-page web app that allows users to upload a video, transcribe it, translate the audio into another language, and replace the original audio with an AI-generated voice in the selected language.

---

## ✨ Features

- Upload short `.mp4` or `.mov` videos
- Automatic transcription (using AssemblyAI)
- Translate transcript into 20+ languages
- Generate AI voiceovers (ElevenLabs)
- Merge new audio with original video
- Preview and download final dubbed video
- 100% client-friendly, no login, no database

---

## 🧱 Tech Stack

| Layer       | Tech Used               |
|-------------|--------------------------|
| Frontend    | React + Vite + Tailwind  |
| Backend     | Node.js + Express        |
| Transcribe  | AssemblyAI               |
| Translate   | Google Translate API     |
| TTS         | ElevenLabs               |
| Video Merge | FFmpeg                   |

---

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Dubbly.git
cd Dubbly
```

### 2. Install dependencies

```bash
npm install
or
yarn install
```
