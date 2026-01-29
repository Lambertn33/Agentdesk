import React, { useState, useCallback } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Layout, HomeHero, HomeQuery, HomeSearchResults, HomeUserChat, HomeSearchMeta } from '../Components';

const Index = ({ auth }) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { flash } = usePage().props;

  const onOpen = useCallback((u) => {
    setSelectedUser(u);
    setIsModalOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

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
  const searchMeta = flash?.searchMeta || null;
  const status = flash?.status;
  const errorMsg = flash?.error;

  console.log(searchMeta, 'bbbbrrrr');

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
            subtitle="Tell us what skills, interests, or timezone you're looking for. We'll find matching professionals you can reach out to."
            label="What are you looking for?"
            placeholder={`Describe the skills, interests, or timezone you need...

Examples:
  • Find users in GMT+1 skilled in React or PHP and interested in Startup ideas
  • I need agents available in the GMT -4 timezone
  • Find professionals available between GMT +2 and GMT +6 timezone`}
            buttonText={processing ? 'Searching...' : 'Search Professionals'}
            onSubmit={submit}
            value={data.prompt}
            onChange={onPromptChange}
            disabled={processing}
            error={errors.prompt}
          />
        </div>

        <div className='w-3/5 max-h-full overflow-y-auto'>
          <HomeSearchMeta searchMeta={searchMeta} />
          <HomeSearchResults
            hasSearched={hasSearched}
            status={status}
            errorMsg={errorMsg}
            results={results}
            processing={processing}
            handleSelectUser={onOpen}
          />
        </div>
      </div>

      <HomeUserChat
        user={selectedUser}
        onClose={onClose}
        open={isModalOpen}
      />
    </Layout>
  );
};

export default Index;
