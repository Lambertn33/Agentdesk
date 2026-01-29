import React from 'react'
import { Layout } from '../Components';
const Profile = ({auth, interests, skills, availability}) => {
    console.log(availability)
  return (
    <Layout auth={auth}>
      <div className="max-w-4xl mx-auto p-6 space-y-8 text-white">

        {/* Interests */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Interests</h2>

          {interests.length === 0 ? (
            <p className="text-sm opacity-70">No interests listed.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest.id}
                  className="px-3 py-1 rounded-full bg-white/10 text-sm"
                >
                  {interest.name}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Skills</h2>

          {skills.length === 0 ? (
            <p className="text-sm opacity-70">No skills listed.</p>
          ) : (
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-md bg-white/10 px-4 py-2"
                >
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-xs opacity-70">
                      {skill.pivot?.years_of_experience ?? 0} years experience
                    </div>
                  </div>

                  <span className="text-xs px-2 py-1 rounded bg-white/20">
                    {skill.pivot?.level}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Availability</h2>

          {!availability ? (
            <p className="text-sm opacity-70">No availability set.</p>
          ) : (
            <div className="rounded-md bg-white/10 px-4 py-3 text-sm">
              <div>
                <strong>Day:</strong> {availability.day_of_week}
              </div>
              <div>
                <strong>Time:</strong> {availability.time_block}
              </div>
              <div>
                <strong>Mode:</strong> {availability.mode}
              </div>
            </div>
          )}
        </section>

      </div>
    </Layout>
  )
}

export default Profile