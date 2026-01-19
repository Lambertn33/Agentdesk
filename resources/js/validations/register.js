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

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}