import React from 'react'
import PropTypes from 'prop-types';

const ExampleQueryCard = ({ title, description }) => {
    return (
        <div className="p-4 bg-[#FDFDFC] dark:bg-[#0a0a0a] rounded border border-[#e3e3e0] dark:border-[#3E3E3A]">
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] mb-2">{title}</p>
            <p className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                {description}
            </p>
        </div>
    )
}

ExampleQueryCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ExampleQueryCard