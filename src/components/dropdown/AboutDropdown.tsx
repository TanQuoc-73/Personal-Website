'use client';

import React from 'react';
import Link from 'next/link';

interface AboutDropdownProps {
  onClose: () => void;
}

export function AboutDropdown({ onClose }: AboutDropdownProps) {
  return (
    <div
      className="
        absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg
        z-50 p-3 flex flex-col gap-2
        dark:bg-gray-800 dark:border-gray-700
      "
    >
      <Link
        href="/about"
        onClick={onClose}
        className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        About Me
      </Link>
      <Link
        href="/portfolio"
        onClick={onClose}
        className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        My Portfolio
      </Link>
      <Link
        href="/team"
        onClick={onClose}
        className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        Team
      </Link>
      {/* Bạn có thể thêm nhiều item khác */}
    </div>
  );
}
