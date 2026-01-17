import React from 'react';
import { Nav, Footer, HomeHero, HomeQuery, HomeInfoCard, HomeExampleQueryCard } from '../Components';
import { FaSearch, FaUser, FaClock } from "react-icons/fa"

const cardsInfo = [
  {
    icon: <FaSearch className="w-5 h-5 text-white" />,
    title: "Natural Language Search",
    description: "Describe what you need in plain English. No need to learn complex query syntax - just tell us what you're looking for."
  },
  {
    icon: <FaUser className="w-5 h-5 text-white" />,
    title: "Find the Right People",
    description: "Search by skills, experience, location, availability, or any combination. Find professionals who match your exact requirements."
  },
  {
    icon: <FaClock className="w-5 h-5 text-white" />,
    title: "Connect & Reach Out",
    description: "Once you find the right professionals, view their profiles and contact information to start a conversation."
  }
];

const exampleQueries = [
  {
    title: "By Skills:",
    description: "Find developers skilled in React and TypeScript"
  },
  {
    title: "By Experience:",
    description: "Show me managers with 5+ years of experience"
  },
  {
    title: "By Availability:",
    description: "I need agents available in the US timezone"
  },
  {
    title: "By Multiple Criteria:",
    description: "Find professionals with marketing and SEO skills"
  }
];

const Index = ({ title, auth }) => {
  return (
    <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
      <Nav user={auth?.user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HomeHero
          title="Find Skilled Professionals"
          subtitle="Search our database of skilled agents and professionals. Find the right person with the expertise you need."
          description="Describe what you're looking for in plain English, and we'll help you find the perfect match."
        />

        {/* Main Query Section */}
        <HomeQuery
          title="Search for Skilled Professionals"
          subtitle="Tell us what skills, expertise, or qualifications you're looking for. We'll find matching professionals you can reach out to."
          label="What are you looking for?"
          placeholder="Describe the skills, expertise, or qualifications you need...&#10;&#10;Examples:&#10;• Find developers skilled in React and TypeScript&#10;• Show me managers with 5+ years of experience&#10;• I need agents available in the US timezone&#10;• Find professionals with marketing and SEO skills"
          buttonText="Search Professionals"
        />

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardsInfo.map((card, index) => (
            <HomeInfoCard key={index} {...card} />
          ))}
        </div>

        {/* Example Queries Section */}
        <div className="mt-8 p-6 bg-white dark:bg-[#161615] rounded-lg border border-[#e3e3e0] dark:border-[#3E3E3A]">
          <h3 className="text-lg font-semibold text-[#1b1b18] dark:text-[#EDEDEC] mb-4">
            Example searches to get you started:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exampleQueries.map((query, index) => (
              <HomeExampleQueryCard key={index} {...query} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
