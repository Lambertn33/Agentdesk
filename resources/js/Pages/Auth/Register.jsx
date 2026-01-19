import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Layout, RegisterSkills, RegisterInterests, RegisterForm, RegisterAddressForm, RegisterSkillsExperience } from '../../Components';
import { isUserFormValid, isSkillFormValid, isInterestFormValid, isAddressFormValid, isSkillsExperienceFormValid, isValidEmail } from '../../validations';

const Register = ({ skillCategories, interests }) => {
    const [step, setStep] = useState(1);
    const [emailVerified, setEmailVerified] = useState(false);
    const [emailVerifying, setEmailVerifying] = useState(false);
    const [emailError, setEmailError] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        bio: '',
        address: '',
        city: '',
        timezone: '',
        skills: [],
        skillsExperience: [],
        interests: [],
    });

    const handleUserFormChange = (e) => {
        setData(e.target.name, e.target.value);
        // Reset email verification status when email changes
        if (e.target.name === 'email') {
            setEmailVerified(false);
            setEmailError('');
        }
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    // ADD/REMOVE SKILLS
    const handleAddSkill = (skillId) => {
        setData('skills', [...data.skills, skillId]);
    };

    const handleRemoveSkill = (skillId) => {
        setData('skills', data.skills.filter(id => id !== skillId));
        if (data.skillsExperience && Array.isArray(data.skillsExperience)) {
            setData('skillsExperience', data.skillsExperience.filter(item =>
                item.skillId !== skillId &&
                item.skillId !== String(skillId) &&
                item.skillId !== Number(skillId)
            ));
        }
    };

    // ADD/REMOVE INTERESTS
    const handleAddInterest = (interestId) => {
        setData('interests', [...data.interests, interestId]);
    };

    const handleRemoveInterest = (interestId) => {
        setData('interests', data.interests.filter(id => id !== interestId));
    };

    // HANDLE SKILLS EXPERIENCE
    const handleExperienceChange = (skillId, years) => {
        const currentExperience = data.skillsExperience || [];
        const existingIndex = currentExperience.findIndex(item =>
            item.skillId === skillId || item.skillId === String(skillId) || item.skillId === Number(skillId)
        );

        if (existingIndex >= 0) {
            const updated = [...currentExperience];
            updated[existingIndex] = {
                skillId: skillId,
                years_of_experience: parseFloat(years)
            };
            setData('skillsExperience', updated);
        } else {
            setData('skillsExperience', [
                ...currentExperience,
                {
                    skillId: skillId,
                    years_of_experience: parseFloat(years)
                }
            ]);
        }
    };

    const allowToViewAddress = () => {
        return isUserFormValid(data) && emailVerified;
    };

    // ALLOW/DISALLOW NEXT BUTTON
    const allowToViewSkills = () => {
        return isAddressFormValid(data);
    };

    const allowToViewSkillsExperience = () => {
        return isSkillFormValid(data.skills);
    };

    const allowToViewInterests = () => {
        return isSkillsExperienceFormValid(data.skills, data.skillsExperience);
    };

    const allowToSubmit = () => {
        return isUserFormValid(data) && isAddressFormValid(data) && isSkillFormValid(data.skills) && isSkillsExperienceFormValid(data.skills, data.skillsExperience) && isInterestFormValid(data.interests);
    };

    const handleVerifyEmail = async () => {
        if (!isValidEmail(data.email)) {
            setEmailVerified(false);
            setEmailError('Invalid email address');
            return;
        }

        setEmailVerifying(true);
        try {
            const response = await axios.post('/verify-email', {
                email: data.email
            });

            if (response.data.exists) {
                setEmailVerified(false);
                setEmailError('This email is already registered. Please use a different email.');
            } else {
                setEmailVerified(true);
                setEmailError('');
            }
        } catch (error) {
            setEmailVerified(false);
        } finally {
            setEmailVerifying(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/register', {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success (e.g., redirect)
            },
        });
    };

    const displayStep = () => {
        switch (step) {
            case 1:
                return (
                    <RegisterForm
                        formData={data}
                        handleChange={handleUserFormChange}
                        handleNext={handleNext}
                        allowToViewAddress={allowToViewAddress}
                        errors={{ ...errors, email: emailError || errors?.email }}
                        handleVerifyEmail={handleVerifyEmail}
                        emailVerifying={emailVerifying}
                    />
                );
            case 2:
                return (
                    <RegisterAddressForm
                        formData={data}
                        handleChange={handleUserFormChange}
                        handleNext={handleNext}
                        errors={errors}
                        handlePrevious={handlePrevious}
                        allowToViewSkills={allowToViewSkills}
                    />
                );
            case 3:
                return (
                    <RegisterSkills
                        skillCategories={skillCategories}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        selectedSkills={data.skills}
                        handleAddSkill={handleAddSkill}
                        handleRemoveSkill={handleRemoveSkill}
                        allowToViewSkillsExperience={allowToViewSkillsExperience}

                    />
                );
            case 4:
                return (
                    <RegisterSkillsExperience
                        skillCategories={skillCategories}
                        selectedSkills={data.skills}
                        skillsExperience={data.skillsExperience}
                        handleExperienceChange={handleExperienceChange}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        allowToViewInterests={allowToViewInterests}
                        errors={errors}
                    />
                );
            case 5:
                return (
                    <RegisterInterests
                        interests={interests}
                        handlePrevious={handlePrevious}
                        selectedInterests={data.interests}
                        handleAddInterest={handleAddInterest}
                        handleRemoveInterest={handleRemoveInterest}
                        handleSubmit={handleSubmit}
                        allowToSubmit={allowToSubmit}
                        processing={processing}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Layout>
            {displayStep()}
        </Layout>
    );
};

export default Register;
