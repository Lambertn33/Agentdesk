import React from 'react';
import { useForm } from '@inertiajs/react';
import { Nav, Footer } from '../Components';

const Index = ({ title, auth }) => {
  const { data, setData, post, processing, errors } = useForm({
    query: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/query', {
      preserveScroll: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
      <Nav user={auth?.user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1b1b18] dark:text-[#EDEDEC] mb-4">
            Find Skilled Professionals
          </h1>
          <p className="text-xl sm:text-2xl text-[#706f6c] dark:text-[#A1A09A] mb-6 max-w-3xl mx-auto">
            Search our database of skilled agents and professionals. Find the right person with the expertise you need.
          </p>
          <p className="text-lg text-[#706f6c] dark:text-[#A1A09A] max-w-2xl mx-auto">
            Describe what you're looking for in plain English, and we'll help you find the perfect match.
          </p>
        </div>

        {/* Main Query Section */}
        <div className="bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A] shadow-sm p-6 sm:p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
              Search for Skilled Professionals
            </h2>
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
              Tell us what skills, expertise, or qualifications you're looking for. We'll find matching professionals you can reach out to.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="query"
                className="block text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC] mb-2"
              >
                What are you looking for?
              </label>
              <textarea
                id="query"
                name="query"
                rows={10}
                value={data.query}
                onChange={(e) => setData('query', e.target.value)}
                className="w-full px-4 py-3 text-sm border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-sm bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] focus:outline-none focus:ring-2 focus:ring-[#f53003] dark:focus:ring-[#FF4433] focus:border-transparent resize-none"
                placeholder="Describe the skills, expertise, or qualifications you need...&#10;&#10;Examples:&#10;• Find developers skilled in React and TypeScript&#10;• Show me managers with 5+ years of experience&#10;• I need agents available in the US timezone&#10;• Find professionals with marketing and SEO skills"
              />
              {errors.query && (
                <p className="mt-2 text-sm text-[#f53003] dark:text-[#FF4433]">
                  {errors.query}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                Powered by PrismPHP
              </p>
              <button
                type="submit"
                disabled={processing || !data.query.trim()}
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Searching...' : 'Search Professionals'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A]">
            <div className="w-10 h-10 bg-[#f53003] dark:bg-[#FF4433] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
              Natural Language Search
            </h3>
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
              Describe what you need in plain English. No need to learn complex query syntax - just tell us what you're looking for.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A]">
            <div className="w-10 h-10 bg-[#f53003] dark:bg-[#FF4433] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
              Find the Right People
            </h3>
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
              Search by skills, experience, location, availability, or any combination. Find professionals who match your exact requirements.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A]">
            <div className="w-10 h-10 bg-[#f53003] dark:bg-[#FF4433] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-2">
              Connect & Reach Out
            </h3>
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
              Once you find the right professionals, view their profiles and contact information to start a conversation.
            </p>
          </div>
        </div>

        {/* Example Queries Section */}
        <div className="mt-8 p-6 bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A]">
          <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-4">
            Example searches to get you started:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FDFDFC] dark:bg-[#0a0a0a] rounded border border-[#e3e3e0] dark:border-[#3E3E3A]">
              <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] mb-2">By Skills:</p>
              <p className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                "Find developers skilled in React and TypeScript"
              </p>
            </div>
            <div className="p-4 bg-[#FDFDFC] dark:bg-[#0a0a0a] rounded border border-[#e3e3e0] dark:border-[#3E3E3A]">
              <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] mb-2">By Experience:</p>
              <p className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                "Show me managers with 5+ years of experience"
              </p>
            </div>
            <div className="p-4 bg-[#FDFDFC] dark:bg-[#0a0a0a] rounded border border-[#e3e3e0] dark:border-[#3E3E3A]">
              <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] mb-2">By Availability:</p>
              <p className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                "I need agents available in the US timezone"
              </p>
            </div>
            <div className="p-4 bg-[#FDFDFC] dark:bg-[#0a0a0a] rounded border border-[#e3e3e0] dark:border-[#3E3E3A]">
              <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] mb-2">By Multiple Criteria:</p>
              <p className="text-sm font-medium text-[#1b1b18] dark:text-[#EDEDEC]">
                "Find professionals with marketing and SEO skills"
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
