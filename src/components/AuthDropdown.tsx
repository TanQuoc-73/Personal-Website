'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaGoogle, FaSignOutAlt } from 'react-icons/fa';

interface AuthDropdownProps {
  onClose: () => void;
}

export function AuthDropdown({ onClose }: AuthDropdownProps) {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <div
      className="
        absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl
        z-50 p-5 flex flex-col gap-4
        dark:bg-gray-800 dark:border-gray-700
        "
      style={{ minWidth: '16rem' }}
    >
      {user ? (
        <>
          <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg truncate">
            Hello, <span className="font-medium">{user.email}</span>
          </p>

          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="
              flex items-center justify-center gap-2 px-4 py-2 text-white bg-black rounded-md
              hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1
              transition-colors duration-200
            "
          >
            <FaSignOutAlt size={18} />
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg text-center">
            Sign In to Your Account
          </p>
          <button
            onClick={() => {
              signInWithGoogle();
              onClose();
            }}
            className="
              flex items-center justify-center gap-3 px-4 py-2 bg-blue-600 rounded-md text-white
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              transition-colors duration-200
              font-semibold
            "
          >
            <FaGoogle size={20} />
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}
