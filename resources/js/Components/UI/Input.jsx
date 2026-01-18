import React from 'react'
import PropTypes from 'prop-types';

const Input = ({ label, name, type, autoComplete, required, placeholder }) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2"
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                className="w-full px-4 py-3 text-sm border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:border-transparent"
                placeholder={placeholder}
            />
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoComplete: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
}

export default Input