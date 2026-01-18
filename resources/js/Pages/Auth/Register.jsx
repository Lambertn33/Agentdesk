import React from 'react';
import { Link } from '@inertiajs/react';
import { Layout, Input } from '../../Components';

const Login = () => {
    return (
        <Layout>
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                        Create an Account
                    </h1>
                    <p className="text-lg text-[#706f6c] dark:text-[#A1A09A]">
                        Create an account to get started with AgentDesk.
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] shadow-sm p-6 sm:p-8">
                    <form>
                        <div className="space-y-6">
                            {/* Name Field */}
                            <Input label="Name" name="name" type="text" autoComplete="name" required placeholder="Enter your name" />
                            {/* Email Field */}
                            <Input label="Email Address" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />

                            {/* Password Field */}
                            <Input label="Password" name="password" type="password" autoComplete="current-password" required placeholder="Enter your password" />

                            {/* Confirm Password Field */}
                            <Input label="Confirm Password" name="password_confirmation" type="password" autoComplete="confirm-password" required placeholder="Confirm your password" />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-[#f53003] dark:text-[#FF4433] hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
