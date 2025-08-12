'use client';

import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { AuthDropdown } from '@/components/AuthDropdown';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AboutDropdown } from '@/components/dropdown/AboutDropdown';

function HeaderContent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const authRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Thêm state cho hiệu ứng ẩn/hiện
  const [opacity, setOpacity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (authRef.current && !authRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lắng nghe sự kiện scroll để ẩn/hiện Header dần dần
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setOpacity(prev => Math.max(prev - 0.1, 0)); 
      }
      else {
        setOpacity(prev => Math.min(prev + 0.1, 1)); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className="fixed top-0 w-full shadow-md border-b z-50 transition-opacity duration-300"
        style={{
          backgroundImage: "linear-gradient(to right, white, black)",
          opacity: opacity
        }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-center px-20 h-8 text-[13px]">
          {/* Left Top */}
          <div className="flex items-center gap-3">
            <Link 
              href="/links" 
              className={`${isActive('/links') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Hello
            </Link>
            <Link 
              href="/about" 
              className={`${isActive('/about') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              About
            </Link>
            <div className="bg-black h-[13px] w-[1px]" />
            <Link 
              href="/contact" 
              className={`${isActive('/contact') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Contact
            </Link>
          </div>

          {/* Right Top */}
          <div>
            {user && (
              <span className="ml-2 bg-gray-200/60 py-[1px] px-2 rounded-2xl smax-w-[120px] truncate">
                {user.email}
              </span>
            )}
            <Link 
              href="/contact" 
              className={`ml-2 ${isActive('/contact') ? 'text-blue-400 font-medium' : 'text-white hover:text-blue-300'}`}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center px-20 h-16 relative">
          {/* LOGO */}
          <Link href="/">
            <Image
              src="/LogoWeb.png"
              alt="Logo"
              width={200}
              height={100}
              className="h-20 w-auto mb-6"
            />
          </Link>

          {/* Nav Button*/}
          <div className="flex items-center gap-4 relative">
            {/* About */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`px-3 py-1 rounded cursor-pointer focus:outline-none transition-all duration-300 ${
                  isActive('/about') 
                    ? 'text-black bg-white/90 font-medium shadow-sm' 
                    : 'text-gray-200 hover:text-white hover:bg-white/20'
                }`}
              >
                About
              </button>
              {aboutDropdownOpen && <AboutDropdown onClose={() => setAboutDropdownOpen(false)} />}
            </div>

            <Link 
              href="/project" 
              className={`px-3 py-1 rounded transition-all duration-300 ${
                isActive('/project')
                  ? 'text-black bg-white/90 font-medium shadow-sm'
                  : 'text-gray-200 hover:text-white hover:bg-white/20'
              }`}
            >
              Project
            </Link>
            <Link 
              href="/service" 
              className={`px-3 py-1 rounded transition-all duration-300 ${
                isActive('/service')
                  ? 'text-black bg-white/90 font-medium shadow-sm'
                  : 'text-gray-200 hover:text-white hover:bg-white/20'
              }`}
            >
              Service
            </Link>
            <Link 
              href="/contact" 
              className={`px-3 py-1 rounded transition-all duration-300 ${
                isActive('/contact')
                  ? 'text-black bg-white/90 font-medium shadow-sm'
                  : 'text-gray-200 hover:text-white hover:bg-white/20'
              }`}
            >
              Contact
            </Link>

            {/* Account */}
            <div className="ml-10 relative" ref={authRef}>
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser />
              </Button>
              {dropdownOpen && <AuthDropdown onClose={() => setDropdownOpen(false)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Header() {
  return (
    <AuthProvider>
      <HeaderContent />
    </AuthProvider>
  );
}
