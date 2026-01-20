import React from 'react'

const Results = ({ status, errorMsg, processing, hasSearched, results }) => {
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
        </>
    )
}

export default Results