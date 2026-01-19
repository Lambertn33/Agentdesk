import React from 'react'
import PropTypes from 'prop-types';

const Select = ({ id, label, name, value, onChange, required, options, placeholder, hasErrors, error }) => {
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
            <select
                id={id}
                name={name}
                value={value || ''}
                onChange={onChange}
                required={required}
                className={`w-full px-4 py-3 text-sm border ${borderClass} rounded-sm bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:border-transparent appearance-none cursor-pointer`}
            >
                {placeholder && (
                    <option value="" disabled>{placeholder}</option>
                )}
                {options.map((option) => {
                    // Handle both string options and object options {value, label}
                    const optionValue = typeof option === 'object' ? option.value : option;
                    const optionLabel = typeof option === 'object' ? option.label : option;
                    return (
                        <option key={optionValue} value={optionValue}>
                            {optionLabel}
                        </option>
                    );
                })}
            </select>
            {hasErrors && (
                <p className="text-sm text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}

Select.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    hasErrors: PropTypes.bool,
    error: PropTypes.string,
}

Select.defaultProps = {
    value: '',
    required: false,
    options: [],
    placeholder: '',
    hasErrors: false,
    error: '',
}

export default Select