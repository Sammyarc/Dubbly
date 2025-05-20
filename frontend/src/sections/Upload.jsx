import React, { useRef, useState } from 'react';
import { RiVideoUploadLine } from "react-icons/ri";
import { LuCloudUpload } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { CgTranscript } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from "axios";

const API_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5000/api"
        : "";

axios.defaults.withCredentials = true;

const MAX_SIZE_MB = 25;
const ALLOWED_TYPES = ['video/mp4', 'video/quicktime']; // quicktime = .mov

// Static list of common languages
const LANGUAGES = [
    { language: 'en', name: 'English' },
    { language: 'es', name: 'Spanish' },
    { language: 'fr', name: 'French' },
    { language: 'de', name: 'German' },
    { language: 'it', name: 'Italian' },
    { language: 'pt', name: 'Portuguese' },
    { language: 'ru', name: 'Russian' },
    { language: 'ja', name: 'Japanese' },
    { language: 'ko', name: 'Korean' },
    { language: 'zh', name: 'Chinese' },
    { language: 'ar', name: 'Arabic' },
    { language: 'hi', name: 'Hindi' },
    { language: 'pl', name: 'Polish' },
    { language: 'nl', name: 'Dutch' },
    { language: 'tr', name: 'Turkish' },
    { language: 'sv', name: 'Swedish' },
    { language: 'fi', name: 'Finnish' },
    { language: 'no', name: 'Norwegian' },
    { language: 'da', name: 'Danish' },
    { language: 'el', name: 'Greek' },
];

const Upload = () => {
    const fileInputRef = useRef(null);
    const [status, setStatus] = useState("");
    const [transcript, setTranscript] = useState({
        text: '',
        utterances: [],
        words: []
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    // const [selectedLanguage, setSelectedLanguage] = useState('');
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);



    // const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const formatTime = (ms) => {
        const date = new Date(ms);
        return date.toISOString().substr(11, 8).replace(/^00:/, ''); // Returns "MM:SS" or "HH:MM:SS"
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const validateFile = (file) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return "Only .mp4 and .mov files are allowed.";
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            return "File size must be less than or equal to 25 MB.";
        }
        return null;
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validationError = validateFile(selectedFile);
            if (validationError) {
                setError(validationError);
                setFile(null);
            } else {
                setError('');
                setFile(selectedFile);
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            const validationError = validateFile(droppedFile);
            if (validationError) {
                setError(validationError);
                setFile(null);
            } else {
                setError('');
                setFile(droppedFile);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeFile = () => {
        setFile(null);
        setError('');
        fileInputRef.current.value = null;
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true)
        setStatus("Uploading video...");

        const formData = new FormData();
        formData.append("video", file);
        // formData.append('target_language', selectedLanguage);

        try {
            const uploadRes = await axios.post(`${API_URL}/upload`, formData);
            const transcriptId = uploadRes.data.transcript_id;

            setStatus("Transcription started. Waiting for result...");

            // Poll every 3s until done or error
            const pollTranscript = async () => {
                const interval = setInterval(async () => {
                    try {
                        const statusRes = await axios.get(`${API_URL}/transcript/${transcriptId}`);
                        const data = statusRes.data;
                        console.log("Transcript data:", data);

                        if (data.status === "completed") {
                            clearInterval(interval);
                            setIsUploading(false);
                            setStatus("Transcription completed.");

                            // Store both raw text and structured utterances
                            setTranscript({
                                text: data.text,
                                utterances: data.utterances || [], // Handle case if utterances aren't available
                                words: data.words || []
                            });

                            console.log("Utterances:", data.utterances);

                        } else if (data.status === "error") {
                            clearInterval(interval);
                            setIsUploading(false);
                            setStatus("Transcription failed.");
                        } else {
                            setStatus(`Transcribing... (${data.status})`);
                        }
                        // eslint-disable-next-line no-unused-vars
                    } catch (err) {
                        clearInterval(interval);
                        setIsUploading(false);
                        setStatus("Error checking status.");
                    }
                }, 3000);
            };

            pollTranscript();

        } catch (err) {
            console.error(err);
            setIsUploading(false)
            setStatus("Upload failed.");
        }
    };


    return (
        <section className="p-6 rounded-lg mt-6">
            <h2 className="text-lg font-bold mb-4 flex items-center font-inter gap-2">
                <RiVideoUploadLine className='text-primary' size={24} />
                Upload Video
            </h2>

            <div
                className="border-2 flex flex-col justify-center items-center border-dashed border-gray-300 p-6 rounded-xl text-center text-base text-gray-500 cursor-pointer"
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className="text-4xl mb-2"><LuCloudUpload /></div>
                <span className='font-inter leading-[1.5]'>
                    Drag and drop a file here, or click to browse
                    <br /> .mp4 or .mov, up to 5 minutes, 25 MB max
                </span>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp4,.mov"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            

            {file && (
                <div>
                    <div className="mt-4 flex items-center justify-between bg-green-50 border border-green-300 text-green-700 px-4 py-2 rounded-md">
                        <span className="text-sm font-medium font-inter truncate">{file.name}</span>
                        <button
                            className="ml-4 text-red-500 hover:text-red-700"
                            onClick={removeFile}
                            title="Remove file"
                        >
                            <MdClose size={20} />
                        </button>
                    </div>
                    <button
                        onClick={handleUpload}
                        disabled={isUploading || status.includes("completed")}
                        className={`mt-4 font-inter px-4 py-2 rounded-md font-medium transition duration-300 flex items-center justify-center gap-2
                                ${isUploading || status.includes("completed")
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-primary text-white hover:bg-opacity-90'}
                             `}
                    >
                        {isUploading ? (
                            <>
                                <AiOutlineLoading3Quarters className="animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            'Upload'
                        )}
                    </button>


                    <p
                        className={`text-sm font-inter mt-3 
                        ${status.includes("completed") ? "text-green-600" : ""}
                        ${status.toLowerCase().includes("failed") || status.toLowerCase().includes("error") ? "text-red-600" : ""}
                        ${status.includes("Transcribing") || status.includes("started") ? "text-blue-600" : ""}
                        `}
                    >
                        {status}
                    </p>

                </div>
            )}
            {error && (
                <p className="text-red-500 mt-2 text-sm font-medium">
                    {error}
                </p>
            )}

            <div className="mt-6 relative">
                <h2 className="text-lg font-bold mb-4 flex font-inter items-center gap-2">
                    <CgTranscript className='text-primary' size={24} />
                    Transcript
                </h2>

                {/* <p className="text-base font-inter mb-2"> Choose a language you want the video to be trancribed to</p> */}

                {/* <div className="relative w-52 mb-4">
                    <button
                        onClick={toggleDropdown}
                        className="w-full border border-gray-300 p-2 font-inter rounded-md text-sm outline-primary flex justify-between items-center"
                    >
                        {LANGUAGES.find(lang => lang.language === selectedLanguage)?.name || "Select language"}
                        <IoChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {dropdownOpen && (
                        <ul className="absolute z-10 w-full border border-gray-200 bg-white rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                            {LANGUAGES.map(({ language, name }) => (
                                <li
                                    key={language}
                                    onClick={() => {
                                        setSelectedLanguage(language);
                                        setDropdownOpen(false);
                                    }}
                                    className={`px-3 py-2 text-sm font-inter hover:bg-gray-100 cursor-pointer ${selectedLanguage === language ? 'bg-gray-100 font-semibold' : ''
                                        }`}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div> */}

                {transcript.utterances?.length > 0 && (
                    <div>
                        <h3 className='font-inter text-base'>Transcript with Speakers</h3>
                        {transcript.utterances.map((utterance, index) => (
                            <div key={index}>
                                <div className="flex gap-1">
                                    <span className='font-inter text-sm'>Speaker {utterance.speaker}:</span>
                                    <span className='font-inter text-sm'>
                                        {formatTime(utterance.start)} - {formatTime(utterance.end)}
                                    </span>
                                </div>
                                <p className='font-inter text-sm'>{utterance.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Upload;
