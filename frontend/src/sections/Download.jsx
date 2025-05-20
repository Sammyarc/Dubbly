import React from 'react'

const Download = () => {
    return (
        <section className="p-6 rounded-lg text-center">
            <button className="bg-primary hover:bg-indigo-500 font-inter text-white font-semibold py-3 px-6 rounded-md mb-4">
                Download Dubbed Video
            </button>
            <p className="text-xs leading-[2] text-gray-500">
                Powered by <a href="https://www.assemblyai.com/" className="underline text-primary">AssemblyAI</a>, <a href="#" className="underline text-primary">Google Translate</a>, and <a href="#" className="underline text-primary">ElevenLabs</a>
                <br /> Built by <a href="#" className="underline text-primary">Owughikem Nkemakolam</a>
            </p>
            <p className="text-[10px] text-gray-400 mt-2">
                This is a demo tool. Uploaded files are not stored
            </p>
        </section>
    )
}

export default Download