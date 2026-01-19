import React from 'react';
import { Input } from '../index';
import { Link } from '@inertiajs/react';

const RegisterForm = ({ handleNext, formData, handleChange, allowToViewAddress, errors, handleVerifyEmail, emailVerifying }) => {
    return (
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
                <div className="space-y-6">
                    {/* Name Field */}
                    <Input
                        id="name"
                        label="Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        placeholder="Enter your name"
                        hasErrors={!!errors?.name}
                        error={errors?.name}
                    />
                    {/* Email Field */}
                    <div>
                        <Input
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleVerifyEmail}
                            autoComplete="email"
                            required
                            placeholder="you@example.com"
                            hasErrors={!!errors?.email}
                            error={errors?.email}
                        />
                        {emailVerifying && (
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] mt-1">
                                Verifying email...
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <Input
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                        placeholder="Enter your password"
                        hasErrors={!!errors?.password}
                        error={errors?.password}
                    />

                    {/* Confirm Password Field */}
                    <Input
                        id="password_confirmation"
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                        placeholder="Confirm your password"
                        hasErrors={!!errors?.password_confirmation}
                        error={errors?.password_confirmation}
                    />

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={!allowToViewAddress()}
                        className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>

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
    );
};

export default RegisterForm;
