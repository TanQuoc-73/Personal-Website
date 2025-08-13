// src/components/SkillList.tsx
'use client';

import { useSkills } from '@/hooks/useSkills';

export default function SkillList() {
  const { skills, isLoading, error } = useSkills();

  if (isLoading) return <p>Loading skills...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/20 bg-black/30 backdrop-blur-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30"
        >
          {skill.icon_url && (
            <img
              src={skill.icon_url}
              alt={skill.name}
              className="w-16 h-16 object-contain"
            />
          )}
          <h3 className="text-lg font-semibold text-white mt-3">{skill.name}</h3>
          <p className="text-gray-400 text-sm capitalize mb-3">{skill.category}</p>
          <div className="w-full bg-white/10 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full"
              style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
