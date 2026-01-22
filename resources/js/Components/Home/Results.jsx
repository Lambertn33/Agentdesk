import React from 'react'

const Results = ({ status, errorMsg, processing, hasSearched, results, handleSelectUser }) => {
    const selectUser = (user) => handleSelectUser(user);

    return (
        <>
            {/* Error */}
            {errorMsg && (
                <div className="mb-4 rounded-lg border border-red-400 bg-red-50 p-4 text-red-700">
                    {errorMsg}
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
                                <div className='flex justify-between'>
                                    <div>
                                        <div className="text-lg font-semibold">{u.names}</div>
                                        <div className="text-sm opacity-90">{u.email}</div>

                                        {u.profile?.timezone ? (
                                            <div className="mt-2 text-sm opacity-90">
                                                Timezone: {u.profile.timezone}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => selectUser(u)}
                                            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#1b1b18] dark:bg-[#3E3E3A] hover:bg-[#f53003] dark:hover:bg-[#FF4433] rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Know More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Results