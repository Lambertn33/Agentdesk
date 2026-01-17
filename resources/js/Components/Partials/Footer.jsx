import React from 'react'

const Footer = () => {
    return (
        <footer className="mt-16 bg-white dark:bg-[#161615] border-t border-[#e3e3e0] dark:border-[#3E3E3A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-sm text-[#706f6c] dark:text-[#A1A09A]">
                    <p>&copy; {new Date().getFullYear()} AgentDesk. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer