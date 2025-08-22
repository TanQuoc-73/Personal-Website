// src/components/SkillList.tsx
'use client';

import Image from 'next/image';
import { useSkills } from '@/hooks/useSkills';
import { useState, useEffect } from 'react';

interface SkillListProps {
  adminView?: boolean;
}

export default function SkillList({ adminView = false }: SkillListProps) {
  const { skills, isLoading, error } = useSkills();
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);

  useEffect(() => {
    if (skills && skills.length > 0) {
      skills.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSkills(prev => [...prev, index]);
        }, index * 100);
      });
    }
  }, [skills]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-gray-900 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <span className="ml-4 text-lg text-white font-medium">Loading skills...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center px-6 py-4 bg-red-50 border border-red-200 rounded-2xl">
          <svg className="w-6 h-6 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
          <span className="text-red-700 font-medium">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <div
          key={skill.id}
          className={`group relative overflow-hidden transition-all duration-700 ease-out ${
            visibleSkills.includes(index) 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          {/* Background card */}
          <div className="relative p-6 rounded-3xl bg-black/50 border border-gray-500/60 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:border-red-500/50">
            {/* Animated background gradient - đổi sang tone đỏ/tối */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-red-900 to-black/80 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Red accent line */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon container */}
              <div className="relative mb-4 p-3 w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 group-hover:from-red-800 group-hover:to-red-900 transition-all duration-500">
                {/* Icon background glow */}
                <div className="absolute inset-0 rounded-2xl bg-red-600/30 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                
                {skill.icon_url && (
                  <div className="relative w-14 h-14">
                    <Image
                      src={skill.icon_url}
                      alt={skill.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      sizes="56px"
                    />
                  </div>
                )}
              </div>

              {/* Skill name */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                {skill.name}
              </h3>
              
              {/* Category */}
              <p className="text-sm text-gray-300 mb-4 capitalize font-medium px-3 py-1 bg-gray-800/40 rounded-full group-hover:bg-red-800 group-hover:text-white transition-all duration-300">
                {skill.category}
              </p>

              {/* Proficiency bar */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400">Proficiency</span>
                  <span className="text-xs font-bold text-gray-200">{skill.proficiency_level}/5</span>
                </div>
                
                {/* Progress bar container */}
                <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  {/* Background track */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"></div>
                  
                  {/* Progress fill */}
                  <div
                    className="relative h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full transition-all duration-1000 ease-out shadow-sm"
                    style={{ 
                      width: visibleSkills.includes(index) ? `${(skill.proficiency_level / 5) * 100}%` : '0%',
                      transitionDelay: `${(index * 50) + 200}ms`
                    }}
                  >
                    {/* Progress shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>
                  
                  {/* Skill level indicators */}
                  <div className="absolute inset-0 flex justify-between items-center px-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-0.5 h-1 rounded-full transition-all duration-300 ${
                          level <= skill.proficiency_level 
                            ? 'bg-gray-200/80' 
                            : 'bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hover shadow effect */}
          <div className="absolute inset-0 rounded-3xl bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
        </div>
      ))}
    </div>
  );
}
