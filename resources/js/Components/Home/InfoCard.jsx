import React from 'react'
import PropTypes from 'prop-types';

const CardInfo = ({ icon, title, description }) => {
    return (
        <div className="p-6 bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A]">
            <div className="w-10 h-10 bg-[#f53003] dark:bg-[#FF4433] rounded-lg flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                {title}
            </h3>
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                {description}
            </p>
        </div>
    )
}

CardInfo.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

CardInfo.defaultProps = {
    description: null,
};

export default CardInfo