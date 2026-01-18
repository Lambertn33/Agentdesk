import React from 'react';
import { Layout, HomeHero, HomeQuery } from '../Components';

const Index = ({ title, auth }) => {
  return (
    <Layout auth={auth}>
      <HomeHero
        title="Find Skilled Professionals"
        subtitle="Search our database of skilled agents and professionals. Find the right person with the expertise you need."
        description="Describe what you're looking for in plain English, and we'll help you find the perfect match."
      />

      {/* Main Query Section */}
      <div className='flex justify-between'>
        <div className='w-2/5'>
          <HomeQuery
            title="Search for Skilled Professionals"
            subtitle="Tell us what skills, expertise, or qualifications you're looking for. We'll find matching professionals you can reach out to."
            label="What are you looking for?"
            placeholder="Describe the skills, expertise, or qualifications you need...&#10;&#10;Examples:&#10;• Find developers skilled in React and TypeScript&#10;• Show me managers with 5+ years of experience&#10;• I need agents available in the US timezone&#10;• Find professionals with marketing and SEO skills"
            buttonText="Search Professionals"
          />
        </div>
        <div className='w-3/5 text-center'>
          <p className="text-white">
            Search results will appear here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
