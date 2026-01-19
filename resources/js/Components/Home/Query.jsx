import React from 'react'
import PropTypes from 'prop-types';
import { Textarea } from '../index';

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
                <Textarea
                    id="query"
                    name="query"
                    value=""
                    onChange={() => { }}
                    required={true}
                    placeholder={placeholder}
                    hasErrors={false}
                    error=""
                    label={label}
                />
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