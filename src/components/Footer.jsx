import React from 'react'

const Footer = () => {
    return (
        // <div className='sm:absolute bottom-0 w-full'>
        <div className='w-full mt-auto'>
            <footer className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 text-gray-300 py-2 px-6 m-2 rounded-lg text-sm">
                <div className="mb-2 sm:mb-0">
                    © {new Date().getFullYear()} All rights reserved | Created by <a className='hover:underline' target='_blank' href="https://www.linkedin.com/in/rehan-mohammad-6717a4345/">Rehan</a>
                </div>
                <div className="flex gap-4">
                    <span className="hover:underline cursor-pointer">Privacy Policy</span>
                    <span className="hover:underline cursor-pointer">Terms of Service</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer
