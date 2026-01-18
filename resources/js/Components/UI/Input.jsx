import React from 'react'
import PropTypes from 'prop-types';

const Input = ({ id, label, name, type, autoComplete, required, placeholder, hasErrors, error }) => {
    const borderClass = hasErrors
        ? 'border-red-500 dark:border-red-500'
        : 'border-[#e3e3e0] dark:border-[#3E3E3A]';

    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2"
            >
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required={required}
                className={`w-full px-4 py-3 text-sm border ${borderClass} rounded-sm bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:border-transparent`}
                placeholder={placeholder}
            />
            {hasErrors && (
                <p className="text-sm text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    autoComplete: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    hasErrors: PropTypes.bool,
    error: PropTypes.string,
}

Input.defaultProps = {
    autoComplete: undefined,
    required: false,
    placeholder: '',
    hasErrors: false,
    error: '',
}

export default Input