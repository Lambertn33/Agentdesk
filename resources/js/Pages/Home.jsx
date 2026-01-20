import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Layout, HomeHero, HomeQuery } from '../Components';
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

        <div className="w-3/5">
          {/* Error */}
          {errorMsg && (
            <div className="mb-4 rounded-lg border border-red-400 bg-red-50 p-4 text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Status */}
          {status && !errorMsg && (
            <div className="mb-4 rounded-lg border border-slate-200 bg-white p-3 text-slate-700">
              Status: {status}
            </div>
          )}

          {/* Results */}
          <div className="rounded-xl bg-white/10 p-4 text-white">
            {results.length === 0 ? (
              <p className="text-center opacity-80">
                {processing
                  ? 'Searching…'
                  : hasSearched
                    ? 'No matching professionals found. Try different skills or keywords.'
                    : 'Search results will appear here.'}
              </p>
            ) : (
              <div className="space-y-3">
                {results.map((u) => (
                  <div
                    key={u.id ?? `${u.email}-${u.names}`}
                    className="rounded-lg bg-white/10 p-4"
                  >
                    <div className="text-lg font-semibold">{u.names}</div>
                    <div className="text-sm opacity-90">{u.email}</div>

                    {u.profile?.timezone ? (
                      <div className="mt-2 text-sm opacity-90">
                        Timezone: {u.profile.timezone}
                      </div>
                    ) : null}

                    {Array.isArray(u.profile?.skills) && u.profile.skills.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {u.profile.skills.map((s) => (
                          <span
                            key={s.id ?? s.name}
                            className="rounded-full bg-white/15 px-3 py-1 text-xs"
                          >
                            {s.name}
                            {s.pivot?.level ? ` • ${s.pivot.level}` : ''}
                            {typeof s.pivot?.years_of_experience === 'number'
                              ? ` • ${s.pivot.years_of_experience}y`
                              : ''}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 text-xs opacity-80">No skills listed.</div>
                    )}

                    {Array.isArray(u.profile?.interests) && u.profile.interests.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {u.profile.interests.map((i) => (
                          <span
                            key={i.id ?? i.name}
                            className="rounded-full bg-white/15 px-3 py-1 text-xs"
                          >
                            {i.name}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
