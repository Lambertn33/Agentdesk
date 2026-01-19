import React from 'react';

const Textarea = ({ id, label, name, value, onChange, required, placeholder, hasErrors, error }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2"
            >
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                value={value || ''}
                onChange={onChange}
                required={required}
                rows={10}
                className="w-full px-4 py-3 text-sm border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:border-transparent resize-none"
                placeholder={placeholder}
            />
            {hasErrors && (
                <p className="text-sm text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Textarea;