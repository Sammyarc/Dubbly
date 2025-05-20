import React from 'react'
import Logo from "../assets/Logo/dubbly-logo.png"

const Navbar = () => {
    return (
        <nav className='flex justify-center items-center p-2'>
            <div className='w-20 h-20'>
                <img src={Logo} alt='Dubbly Logo' className='w-full h-full object-cover' />
            </div>
        </nav>
    )
}

export default Navbar