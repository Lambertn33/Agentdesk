import React from 'react'
import PropTypes from 'prop-types';

const Checkbox = ({ id, checked, onChange, label }) => {
    return (
        <label
            key={id}
            className="flex items-center p-3  rounded-sm hover:border-[#f53003] dark:hover:border-[#FF4433] cursor-pointer transition-colors"
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 text-[#f53003] dark:text-[#FF4433] border-[#e3e3e0] dark:border-[#3E3E3A] rounded focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:ring-2"
            />
            <span className="ml-3 text-sm text-[#1b1b18] dark:text-[#EDEDEC]">
                {label}
            </span>
        </label>
    )
}

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

export default Checkbox