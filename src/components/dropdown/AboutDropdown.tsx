'use client';

import React from 'react';
import Link from 'next/link';

interface AboutDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutDropdown({ isOpen, onClose }: AboutDropdownProps) {
  return (
    <div
      className={`
        absolute top-full left-0 mt-2 w-56 
        bg-black/60 backdrop-blur-md border border-red-600 rounded-xl shadow-lg
        z-50 p-3 flex flex-col gap-2
        transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
      `}
    >
      <Link
        href="/about"
        onClick={onClose}
        className="px-3 py-2 rounded-lg hover:bg-red-600/20 text-white transition"
      >
        About Me
      </Link>
      <Link
        href="/portfolio"
        onClick={onClose}
        className="px-3 py-2 rounded-lg hover:bg-red-600/20 text-white transition"
      >
        My Portfolio
      </Link>
      <Link
        href="/team"
        onClick={onClose}
        className="px-3 py-2 rounded-lg hover:bg-red-600/20 text-white transition"
      >
        Team
      </Link>
    </div>
  );
}
