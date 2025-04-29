import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-around items-center bg-gray-800 text-white py-3 m-2 rounded-lg'>
                <div className="font-bold text-3xl flex items-center gap-1">
                    <svg width="31" height="31" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="white" d="M12 2C9.79 2 8 3.79 8 6v4H7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-1V6c0-2.21-1.79-4-4-4zm-2 8V6c0-1.1.9-2 2-2s2 .9 2 2v4h-4z" />
                    </svg>

                    Secura</div>
                <span className='text-lg font-thin text-gray-300 hidden sm:inline-block'>Where your passwords feel at home.</span>
            </nav>
        </div>
    )
}

export default Navbar
