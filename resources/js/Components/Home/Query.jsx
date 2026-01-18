import React from 'react'
import PropTypes from 'prop-types';

const Query = ({ title, subtitle, label, placeholder, buttonText }) => {
    return (
        <div className="bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] shadow-sm p-6 sm:p-8 mb-8">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
                    {title}
                </h2>
                <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                    {subtitle}
                </p>
            </div>
            <form>
                <div className="mb-4">
                    <label
                        htmlFor="query"
                        className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2"
                    >
                        {label}
                    </label>
                    <textarea
                        id="query"
                        name="query"
                        rows={10}
                        className="w-full px-4 py-3 text-sm border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:border-transparent resize-none"
                        placeholder={placeholder}
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors"
                >
                    {buttonText}
                </button>
            </form>
        </div>
    )
}

Query.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
};

Query.defaultProps = {
    description: null,
};

export default Query