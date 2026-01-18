import React, { useState } from 'react';
import { Checkbox } from '../index';

const RegisterInterests = ({ interests, handlePrevious, selectedInterests }) => {
    const handleInterestChange = (interestId) => {
        console.log(interestId);
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                    Interests
                </h1>
                <p className="text-lg text-[#706f6c] dark:text-[#A1A09A]">
                    Almost here😉... Just one more step. Select the interests you are interested in.
                </p>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] shadow-sm p-6 sm:p-8 mb-8">
                <div className="space-y-8 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                        <Checkbox id={interest.id} checked={selectedInterests.includes(interest.id)} onChange={() => handleInterestChange(interest.id)} label={interest.name} />
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={handlePrevious}
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-[#1b1b18] dark:text-[#EDEDEC] border border-[#e3e3e0] dark:border-[#3E3E3A] hover:border-[#f53003] dark:hover:border-[#FF4433] rounded-sm transition-colors"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default RegisterInterests;
