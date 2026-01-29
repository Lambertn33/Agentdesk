import React from 'react'

const Meta = ({ searchMeta }) => {
    if (!searchMeta || typeof searchMeta !== "object") return null;

    const skills = searchMeta?.skills?.values ?? [];
    const skillsMode = searchMeta?.skills?.mode ?? "SINGLE";
  
    const interests = searchMeta?.interests?.values ?? [];
    const interestsMode = searchMeta?.interests?.mode ?? "SINGLE";
  
    const timezones = searchMeta?.timezone?.values ?? [];
    const timezoneMode = searchMeta?.timezone?.mode ?? "SINGLE";
  
    const formatLine = (label, values, mode) => {
      if (!values.length) return null;
  
      const joined =
        mode === "AND"
          ? values.join(" AND ")
          : mode === "OR"
          ? values.join(" OR ")
          : values.join(", ");
  
      return (
        <div className="text-sm text-white/80">
          <span className="font-semibold text-white/90">{label}:</span>{" "}
          <span>{joined}</span>
        </div>
      );
    };
  
    const hasAny = skills.length || interests.length || timezones.length;
    if (!hasAny) return null;
  
    return (
      <div className="mb-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">
          Search summary
        </div>
  
        <div className="space-y-1">
          {formatLine("Searched skills", skills, skillsMode)}
          {formatLine("Searched interests", interests, interestsMode)}
          {formatLine("Searched timezone", timezones, timezoneMode)}
        </div>
      </div>
    );
  };


export default Meta