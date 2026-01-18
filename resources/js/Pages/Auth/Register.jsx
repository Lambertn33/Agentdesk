import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Layout, Input, RegisterSkills, RegisterInterests, RegisterForm } from '../../Components';

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleNext = () => {
        setStep(step + 1);
    }

    const handlePrevious = () => {
        setStep(step - 1);
    }

    const displayStep = () => {
        switch (step) {
            case 1:
                return <RegisterForm formData={formData} handleChange={handleChange} handleNext={handleNext} />;
            case 2:
                return <RegisterSkills skillCategories={skillCategories} handlePrevious={handlePrevious} handleNext={handleNext} selectedSkills={selectedSkills} />;
            case 3:
                return <RegisterInterests interests={interests} handlePrevious={handlePrevious} handleNext={handleNext} selectedInterests={selectedInterests} />;
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
