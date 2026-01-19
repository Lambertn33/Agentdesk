import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '../index'

const RegisterSkillsExperience = ({
    skillCategories,
    selectedSkills,
    skillsExperience,
    handleExperienceChange,
    handlePrevious,
    handleNext,
    allowToViewInterests,
    errors
}) => {
    const getSelectedSkillsWithDetails = () => {
        const skillsMap = {};
        skillCategories.forEach(category => {
            category.skills.forEach(skill => {
                if (selectedSkills.includes(skill.id)) {
                    skillsMap[skill.id] = {
                        id: skill.id,
                        name: skill.name,
                        category: category.name
                    };
                }
            });
        });
        return Object.values(skillsMap);
    };

    const selectedSkillsDetails = getSelectedSkillsWithDetails();

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                    Years of Experience
                </h1>
                <p className="text-lg text-[#706f6c] dark:text-[#A1A09A]">
                    Tell us how many years of experience you have with each skill.
                </p>
            </div>

            {/* Skills Experience Form */}
            <div className="bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] shadow-sm p-6 sm:p-8 mb-8">
                <div className="space-y-6">
                    {selectedSkillsDetails.map((skill) => {
                        // Find experience entry for this skill
                        const experienceEntry = skillsExperience.find(item =>
                            item.skillId === skill.id ||
                            item.skillId === String(skill.id) ||
                            item.skillId === Number(skill.id)
                        );
                        const experienceValue = experienceEntry?.years_of_experience || '';
                        const skillError = errors?.[`skillsExperience.${skill.id}`];
                        const hasError = !!skillError;

                        return (
                            <div key={skill.id} className="border-b border-[#e3e3e0] dark:border-[#3E3E3A] pb-6 last:border-b-0 last:pb-0">
                                <div className="mb-2">
                                    <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        {skill.name}
                                    </h3>
                                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                        {skill.category}
                                    </p>
                                </div>
                                <Input
                                    id={`experience-${skill.id}`}
                                    name={`skillsExperience.${skill.id}`}
                                    label="Years of Experience"
                                    type="number"
                                    min="0"
                                    max="50"
                                    step="0.5"
                                    placeholder="e.g., 3.5"
                                    value={experienceValue}
                                    onChange={(e) => handleExperienceChange(skill.id, e.target.value)}
                                    hasErrors={hasError}
                                    error={skillError}
                                    required
                                />
                            </div>
                        );
                    })}
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
                    disabled={!allowToViewInterests()}
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

RegisterSkillsExperience.propTypes = {
    skillCategories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            skills: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    name: PropTypes.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    selectedSkills: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    skillsExperience: PropTypes.arrayOf(
        PropTypes.shape({
            skillId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            years_of_experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    handleExperienceChange: PropTypes.func.isRequired,
    handlePrevious: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    allowToViewInterests: PropTypes.func.isRequired,
    errors: PropTypes.object,
}

RegisterSkillsExperience.defaultProps = {
    errors: {},
}

export default RegisterSkillsExperience