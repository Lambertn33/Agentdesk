import React, { useState } from 'react';

const RegisterSkills = ({ skillCategories, handlePrevious, handleNext }) => {
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleSkillChange = (skillId) => {
        console.log(skillId);
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                    Skills
                </h1>
                <p className="text-lg text-[#706f6c] dark:text-[#A1A09A]">
                    Select the skills you are proficient in.
                </p>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] shadow-sm p-6 sm:p-8 mb-8">
                <div className="space-y-8">
                    {skillCategories.map((category) => (
                        <div key={category.id}>
                            <h2 className="text-xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-4">
                                {category.name}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {category.skills.map((skill) => (
                                    <label
                                        key={skill.id}
                                        className="flex items-center p-3  rounded-sm hover:border-[#f53003] dark:hover:border-[#FF4433] cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedSkills.includes(skill.id)}
                                            onChange={() => handleSkillChange(skill.id)}
                                            className="h-4 w-4 text-[#f53003] dark:text-[#FF4433] border-[#e3e3e0] dark:border-[#3E3E3A] rounded focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:ring-2"
                                        />
                                        <span className="ml-3 text-sm text-[#1b1b18] dark:text-[#EDEDEC]">
                                            {skill.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={handlePrevious}
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-[#1b1b18] dark:text-[#EDEDEC] border border-[#e3e3e0] dark:border-[#3E3E3A] hover:border-[#f53003] dark:hover:border-[#FF4433] rounded-sm transition-colors"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RegisterSkills;
