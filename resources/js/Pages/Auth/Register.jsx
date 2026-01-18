import React, { useState } from 'react';
import { Layout, RegisterSkills, RegisterInterests, RegisterForm } from '../../Components';

const Register = ({ skillCategories, interests }) => {
    const [step, setStep] = useState(1);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleUserFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleNext = () => {
        setStep(step + 1);
    }

    const handlePrevious = () => {
        setStep(step - 1);
    }

    // ADD/REMOVE SKILLS
    const handleAddSkill = (skillId) => {
        setSelectedSkills([...selectedSkills, skillId]);
    }

    const handleRemoveSkill = (skillId) => {
        setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    }

    // ADD/REMOVE INTERESTS
    const handleAddInterest = (interestId) => {
        setSelectedInterests([...selectedInterests, interestId]);
    }

    const handleRemoveInterest = (interestId) => {
        setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    }


    const displayStep = () => {
        switch (step) {
            case 1:
                return <RegisterForm formData={formData} handleChange={handleUserFormChange} handleNext={handleNext} />;
            case 2:
                return <RegisterSkills skillCategories={skillCategories} handlePrevious={handlePrevious} handleNext={handleNext} selectedSkills={selectedSkills} handleAddSkill={handleAddSkill} handleRemoveSkill={handleRemoveSkill} />;
            case 3:
                return <RegisterInterests interests={interests} handlePrevious={handlePrevious} handleNext={handleNext} selectedInterests={selectedInterests} handleAddInterest={handleAddInterest} handleRemoveInterest={handleRemoveInterest} />;
            default:
                return null;
        }
    }

    return (
        <Layout>
            {
                displayStep()
            }
        </Layout>
    );
};

export default Register;
