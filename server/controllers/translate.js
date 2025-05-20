import axios from "axios";

export const translateText = async (req, res) => {
    const {
        text,
        target_language
    } = req.body;
    if (!text || !target_language) {
        return res.status(400).json({
            error: 'Missing required fields'
        });
    }

    try {
        const response = await axios.post(
            "https://libretranslate.com/translate", {
                q: text,
                source: "auto",
                target: target_language,
                format: "text"
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 8000
            }
        );


        res.status(200).json({
            translation: response.data.text
        });
    } catch (error) {
        console.error('Translation error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Translation failed',
            details: error.response?.data || error.message
        });
    }
};