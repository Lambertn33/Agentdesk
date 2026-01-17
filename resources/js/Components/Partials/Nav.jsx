import React from 'react';
import { Link } from '@inertiajs/react';

const Nav = ({ user }) => {
    return (
        <nav className="bg-white dark:bg-[#0a0a0a] border-b border-[#e3e3e0] dark:border-[#3E3E3A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                AgentDesk
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                    {user.names}
                                </span>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] hover:text-[#f53003] dark:hover:text-[#FF4433] transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
