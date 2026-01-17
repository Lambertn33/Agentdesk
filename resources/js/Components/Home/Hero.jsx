import React from 'react';
import PropTypes from 'prop-types';


const Hero = ({ title, subtitle, description }) => {
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-4">
                {title}
            </h1>
            <p className="text-xl sm:text-2xl text-[#706f6c] dark:text-[#A1A09A] mb-6 max-w-3xl mx-auto">
                {subtitle}
            </p>
            {description && (
                <p className="text-lg text-[#706f6c] dark:text-[#A1A09A] max-w-2xl mx-auto">
                    {description}
                </p>
            )}
        </div>
    );
};

Hero.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string,
};

Hero.defaultProps = {
    description: null,
};

export default Hero;
