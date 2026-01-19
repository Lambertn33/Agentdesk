import React from 'react';
import { Input, Textarea } from '../index';
import { Link } from '@inertiajs/react';

const RegisterAddressForm = ({ handleNext, formData, handleChange, allowToViewSkills, errors, handlePrevious }) => {
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
                    {/* Address Field */}
                    <Input
                        id="address"
                        label="Address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        autoComplete="address"
                        required
                        placeholder="Enter your address"
                        hasErrors={!!errors?.address}
                        error={errors?.address}
                    />
                    {/* City Field */}
                    <Input
                        id="city"
                        label="City"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Enter your city"
                        hasErrors={!!errors?.city}
                        error={errors?.city}
                    />

                    {/* Timezone Field */}
                    <Input
                        id="timezone"
                        label="Timezone"
                        name="timezone"
                        type="text"
                        value={formData.timezone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your timezone"
                        hasErrors={!!errors?.timezone}
                        error={errors?.timezone}
                    />

                    <Textarea
                        id="bio"
                        label="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        required
                        placeholder="Enter your bio"
                        hasErrors={!!errors?.bio}
                        error={errors?.bio}
                    />

                    {/* Submit Button */}
                    <div className="flex justify-between">
                        <button
                            onClick={handlePrevious}
                            className="inline-flex items-center px-6 py-3 text-base font-medium text-[#1b1b18] dark:text-[#EDEDEC] border border-[#e3e3e0] dark:border-[#3E3E3A] hover:border-[#f53003] dark:hover:border-[#FF4433] rounded-sm transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!allowToViewSkills()}
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
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

export default RegisterAddressForm;
