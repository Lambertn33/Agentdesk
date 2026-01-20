import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Layout, HomeHero, HomeQuery, HomeSearchResults } from '../Components';
import { useCallback } from 'react';

const Index = ({ auth }) => {
  const [hasSearched, setHasSearched] = useState(false);
  const { flash } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    prompt: '',
  });

  const onPromptChange = useCallback((e) => {
    setData('prompt', e.target.value);
  }, [setData]);

  function submit(e) {
    e.preventDefault();

    post('/search-user', {
      preserveScroll: true,
      onSuccess: () => {
        setHasSearched(true);
        reset("prompt");
      },
    });
  }

  const results = flash?.results || [];
  const status = flash?.status;
  const errorMsg = flash?.error;

  return (
    <Layout auth={auth}>
      <HomeHero
        title="Find Skilled Professionals"
        subtitle="Search our database of skilled agents and professionals. Find the right person with the expertise you need."
        description="Describe what you're looking for in plain English, and we'll help you find the perfect match."
      />

      <div className="flex justify-between gap-6">
        <div className="w-2/5">
          <HomeQuery
            title="Search for Skilled Professionals"
            subtitle="Tell us what skills, expertise, or qualifications you're looking for. We'll find matching professionals you can reach out to."
            label="What are you looking for?"
            placeholder={`Describe the skills, expertise, or qualifications you need...

              Examples:
              • Find developers skilled in React and TypeScript
              • Show me managers with 5+ years of experience
              • I need agents available in the US timezone
              • Find professionals with marketing and SEO skills`}
            buttonText={processing ? 'Searching...' : 'Search Professionals'}
            onSubmit={submit}
            value={data.prompt}
            onChange={onPromptChange}
            disabled={processing}
            error={errors.prompt}
          />
        </div>

        <div className='w-3/5 max-h-full overflow-y-auto'>
          <HomeSearchResults
            hasSearched={hasSearched}
            status={status}
            errorMsg={errorMsg}
            results={results}
            processing={processing}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
