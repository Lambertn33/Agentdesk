import React from 'react';
import { Link, Form } from '@inertiajs/react';
import { Layout, Input } from '../../Components';

const Login = () => {
    return (
        <Layout>
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
                    <Form action="/login" method="post">
                        {({
                            errors,
                            hasErrors,
                            processing,
                            submit
                        }) => (
                            <div className="space-y-6">
                                {/* Email Field */}
                                <Input
                                    htmlFor="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required={false}
                                    placeholder="you@example.com"
                                    hasErrors={errors.email}
                                    error={errors.email}
                                />

                                {/* Password Field */}
                                <Input
                                    htmlFor="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required={false}
                                    placeholder="Enter your password"
                                    hasErrors={errors.password}
                                    error={errors.password}
                                />

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors"
                                >
                                    {processing ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                        )}
                    </Form>

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
        </Layout>
    );
};

export default Login;
