import React from 'react'
import { FiGitMerge } from "react-icons/fi";

const Merge = () => {
    return (
        <div>
            <button className="w-[250px] border border-gray-400 text-textPrimary font-inter mx-6 py-3 rounded-lg flex items-center justify-center gap-2 mb-4">
                <span role="img" aria-label="merge"><FiGitMerge className='text-primary' size={24}/></span> Merge Audio with Video
            </button>
        </div>
    )
}

export default Merge