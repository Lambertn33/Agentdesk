export const isUserFormValid = (formData) => {
    return (
        formData.name &&
        formData.email &&
        isValidEmail(formData.email) &&
        formData.password &&
        formData.password_confirmation &&
        formData.password === formData.password_confirmation &&
        formData.password.length >= 8
    );
}

export const isAddressFormValid = (formData) => {
    return (
        formData.address &&
        formData.city &&
        formData.timezone
    );
}

export const isSkillFormValid = (selectedSkills) => {
    return selectedSkills.length > 0;
}

export const isInterestFormValid = (selectedInterests) => {
    return selectedInterests.length > 0;
}

export const isSkillsExperienceFormValid = (selectedSkills, skillsExperience) => {
    if (!selectedSkills || selectedSkills.length === 0) {
        return false;
    }

    if (!Array.isArray(skillsExperience)) {
        return false;
    }

    // Check if all selected skills have experience values
    return selectedSkills.every(skillId => {
        // Find experience entry for this skillId (handle string/number conversion)
        const experienceEntry = skillsExperience.find(item =>
            item.skillId === skillId ||
            item.skillId === String(skillId) ||
            item.skillId === Number(skillId)
        );

        // Check if experience entry exists
        if (!experienceEntry || !experienceEntry.years_of_experience) {
            return false;
        }

        // Convert to string, trim whitespace
        const experienceStr = String(experienceEntry.years_of_experience).trim();

        // Check if not empty
        if (experienceStr === '') {
            return false;
        }

        // Parse and validate as a number >= 0
        const parsed = parseFloat(experienceStr);
        return !isNaN(parsed) && isFinite(parsed) && parsed >= 0;
    });
}

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}