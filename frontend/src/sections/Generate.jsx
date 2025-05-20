import React from 'react'
import { MdKeyboardVoice } from "react-icons/md";

const Generate = () => {
    return (
        <div>
            <button className="w-[250px] border border-gray-400 text-textPrimary font-inter mx-6 py-3 rounded-lg flex items-center justify-center gap-2 mb-4">
                <span role="img" aria-label="voice"><MdKeyboardVoice className='text-primary' size={24}/></span> Generate AI Voice Over
            </button>
        </div>
    )
}

export default Generate