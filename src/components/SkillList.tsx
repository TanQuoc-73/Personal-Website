// src/components/SkillList.tsx
'use client';

import { useSkills } from '@/hooks/useSkills';

export default function SkillList() {
  const { skills, isLoading, error } = useSkills();

  if (isLoading) return <p>Loading skills...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-200/60 rounded-2xl  " >
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
        >
          {skill.icon_url && (
            <img
              src={skill.icon_url}
              alt={skill.name}
              className="w-12 h-12 mb-3"
            />
          )}
          <h3 className="text-lg font-semibold">{skill.name}</h3>
          <p className="text-gray-500 text-sm capitalize">{skill.category}</p>
          <div className="mt-2 w-full rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 h-2 rounded-full"
              style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
