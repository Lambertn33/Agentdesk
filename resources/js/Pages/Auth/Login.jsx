import React from 'react';
import { Link } from '@inertiajs/react';
import { Nav, Footer } from '../../Components';

const Login = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a] pb-12">
            <Nav />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-lg text-[#706f6c] dark:text-[#A1A09A]">
                            Sign in to your AgentDesk account
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] shadow-sm p-6 sm:p-8">
                        <form>
                            <div className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="w-full px-4 py-3 text-sm border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:border-transparent"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="w-full px-4 py-3 text-sm border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:border-transparent"
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Remember Me */}
                                {/* <div className="flex items-center">
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        className="h-4 w-4 text-[#f53003] dark:text-[#FF4433] border-[#e3e3e0] dark:border-[#3E3E3A] rounded focus:ring-[#f53003] dark:focus:ring-[#FF4433]"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="ml-2 block text-sm text-[#706f6c] dark:text-[#A1A09A]"
                                    >
                                        Remember me
                                    </label>
                                </div> */}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>

                        {/* Register Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                Don't have an account?{' '}
                                <Link
                                    href="/register"
                                    className="font-medium text-[#f53003] dark:text-[#FF4433] hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Login;
