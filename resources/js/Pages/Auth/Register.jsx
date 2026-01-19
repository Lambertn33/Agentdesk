import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Layout, RegisterSkills, RegisterInterests, RegisterForm, RegisterAddressForm } from '../../Components';
import { isUserFormValid, isSkillFormValid, isInterestFormValid, isAddressFormValid } from '../../validations';

const Register = ({ skillCategories, interests }) => {
    const [step, setStep] = useState(1);

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
        interests: [],
    });

    const handleUserFormChange = (e) => {
        setData(e.target.name, e.target.value);
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
    };

    // ADD/REMOVE INTERESTS
    const handleAddInterest = (interestId) => {
        setData('interests', [...data.interests, interestId]);
    };

    const handleRemoveInterest = (interestId) => {
        setData('interests', data.interests.filter(id => id !== interestId));
    };

    const allowToViewAddress = () => {
        return isUserFormValid(data);
    };

    // ALLOW/DISALLOW NEXT BUTTON
    const allowToViewSkills = () => {
        return isAddressFormValid(data);
    };

    const allowToViewInterests = () => {
        return isSkillFormValid(data.skills);
    };

    const allowToSubmit = () => {
        return isUserFormValid(data) && isSkillFormValid(data.skills) && isInterestFormValid(data.interests);
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
                        errors={errors}
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
                        allowToViewInterests={allowToViewInterests}
                    />
                );
            case 4:
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
